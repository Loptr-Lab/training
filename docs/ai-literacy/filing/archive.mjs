import { Inflate } from "./vendor/fflate.mjs";
import {
  FORMAT,
  LIMIT,
  shape,
  id,
  timestamp,
  label,
  artifact,
  validate,
  clone,
  hash,
  jsonBytes,
  bytes,
  uuid,
  now,
  logical,
  create,
  fail,
  safeName,
} from "./model.mjs";
const decoder = new TextDecoder("utf-8", { fatal: true, ignoreBOM: true });
const decode = (b) => decoder.decode(b);
const parse = (b) => {
  const text = decode(b);
  if (text.charCodeAt(0) === 0xfeff) fail("JSON BOM is unsupported.");
  return JSON.parse(text);
};
export function crc32(data) {
  let crc = -1;
  for (const b of data) {
    crc ^= b;
    for (let i = 0; i < 8; i++) crc = (crc >>> 1) ^ (crc & 1 ? 0xedb88320 : 0);
  }
  return (crc ^ -1) >>> 0;
}
const u16 = (b, o, v) =>
  new DataView(b.buffer, b.byteOffset, b.byteLength).setUint16(o, v, true);
const u32 = (b, o, v) =>
  new DataView(b.buffer, b.byteOffset, b.byteLength).setUint32(o, v, true);
function join(parts) {
  const out = new Uint8Array(parts.reduce((n, p) => n + p.length, 0));
  let p = 0;
  parts.forEach((b) => {
    out.set(b, p);
    p += b.length;
  });
  return out;
}
/* STORE writer: predictable memory, no archive extraction or filesystem paths. */
export function zip(members) {
  let offset = 0;
  const local = [],
    central = [];
  for (const [name, data] of members) {
    const n = bytes(name),
      crc = crc32(data),
      h = new Uint8Array(30 + n.length),
      c = new Uint8Array(46 + n.length);
    u32(h, 0, 0x04034b50);
    u16(h, 4, 20);
    u16(h, 6, 0x800);
    u32(h, 14, crc);
    u32(h, 18, data.length);
    u32(h, 22, data.length);
    u16(h, 26, n.length);
    h.set(n, 30);
    u32(c, 0, 0x02014b50);
    u16(c, 4, 20);
    u16(c, 6, 20);
    u16(c, 8, 0x800);
    u32(c, 16, crc);
    u32(c, 20, data.length);
    u32(c, 24, data.length);
    u16(c, 28, n.length);
    u32(c, 42, offset);
    c.set(n, 46);
    local.push(h, data);
    central.push(c);
    offset += h.length + data.length;
  }
  const directory = join(central),
    end = new Uint8Array(22);
  u32(end, 0, 0x06054b50);
  u16(end, 8, members.length);
  u16(end, 10, members.length);
  u32(end, 12, directory.length);
  u32(end, 16, offset);
  const out = join([...local, directory, end]);
  if (out.length > LIMIT.bytes) fail("ZIP exceeds 20 MiB input limit.");
  return out;
}
export function unzip(input) {
  if (
    !(input instanceof Uint8Array) ||
    input.length > LIMIT.bytes ||
    input.length < 22
  )
    fail("ZIP size is invalid.");
  const view = new DataView(input.buffer, input.byteOffset, input.byteLength),
    r16 = (o) => view.getUint16(o, true),
    r32 = (o) => view.getUint32(o, true);
  let end = -1;
  for (let i = input.length - 22; i >= Math.max(0, input.length - 65557); i--)
    if (r32(i) === 0x06054b50 && i + 22 + r16(i + 20) === input.length) {
      end = i;
      break;
    }
  if (end < 0) fail("Incomplete ZIP directory.");
  const count = r16(end + 10),
    start = r32(end + 16),
    size = r32(end + 12);
  if (
    r16(end + 4) ||
    r16(end + 6) ||
    r16(end + 8) !== count ||
    count > 102 ||
    count < 2 ||
    start + size !== end
  )
    fail("Unsupported multivolume/ZIP64 directory.");
  let cursor = start,
    total = 0;
  const entries = [],
    seen = new Set();
  for (let i = 0; i < count; i++) {
    if (cursor + 46 > end || r32(cursor) !== 0x02014b50)
      fail("Corrupt ZIP directory.");
    const flags = r16(cursor + 8),
      method = r16(cursor + 10),
      crc = r32(cursor + 16),
      compressed = r32(cursor + 20),
      length = r32(cursor + 24),
      nl = r16(cursor + 28),
      extra = r16(cursor + 30),
      comment = r16(cursor + 32),
      external = r32(cursor + 38),
      offset = r32(cursor + 42);
    if (
      cursor + 46 + nl + extra + comment > end ||
      r16(cursor + 34) ||
      flags & ~0x808 ||
      ![0, 8].includes(method) ||
      ((external >>> 16) & 0xf000) === 0xa000
    )
      fail("Unsupported encrypted, symlink or ZIP method.");
    const name = decode(input.subarray(cursor + 46, cursor + 46 + nl));
    if (
      !/^(manifest\.json|labels\.json|artifacts\/[0-9a-f-]{36}\.json)$/.test(
        name,
      ) ||
      seen.has(name)
    )
      fail("Unsafe or duplicate ZIP path.");
    seen.add(name);
    if (
      length >
        (name.startsWith("artifacts/") ? LIMIT.artifactBytes : LIMIT.bytes) ||
      (total += length) > LIMIT.bytes
    )
      fail("Decompressed archive exceeds limit.");
    if (
      offset + 30 > start ||
      r32(offset) !== 0x04034b50 ||
      r16(offset + 6) !== flags ||
      r16(offset + 8) !== method
    )
      fail("Invalid local ZIP header.");
    const localNL = r16(offset + 26),
      localExtra = r16(offset + 28),
      dataStart = offset + 30 + localNL + localExtra,
      dataEnd = dataStart + compressed;
    if (
      dataEnd > start ||
      decode(input.subarray(offset + 30, offset + 30 + localNL)) !== name
    )
      fail("ZIP local path mismatch.");
    if (
      !(flags & 8) &&
      (r32(offset + 14) !== crc ||
        r32(offset + 18) !== compressed ||
        r32(offset + 22) !== length)
    )
      fail("ZIP local length mismatch.");
    let rangeEnd = dataEnd;
    if (flags & 8) {
      let p = dataEnd;
      if (p + 4 <= start && r32(p) === 0x08074b50) p += 4;
      if (
        p + 12 > start ||
        r32(p) !== crc ||
        r32(p + 4) !== compressed ||
        r32(p + 8) !== length
      )
        fail("Invalid ZIP data descriptor.");
      rangeEnd = p + 12;
    }
    entries.push({
      name,
      method,
      crc,
      length,
      dataStart,
      dataEnd,
      offset,
      rangeEnd,
    });
    cursor += 46 + nl + extra + comment;
  }
  if (cursor !== end) fail("Trailing ZIP directory data.");
  const ranges = [...entries].sort((a, b) => a.offset - b.offset);
  let boundary = 0;
  for (const e of ranges) {
    if (e.offset !== boundary) fail("Overlapping or unlisted ZIP data.");
    boundary = e.rangeEnd;
  }
  if (boundary !== start) fail("Unlisted ZIP data.");
  const result = new Map();
  for (const e of entries) {
    const source = input.subarray(e.dataStart, e.dataEnd);
    let output;
    if (e.method === 0) {
      if (source.length !== e.length) fail("Stored ZIP length mismatch.");
      output = source.slice();
    } else {
      let used = 0;
      const chunks = [];
      const inflate = new Inflate((chunk) => {
        used += chunk.length;
        if (used > e.length || used > LIMIT.bytes)
          fail("Decompression output exceeds declared bound.");
        chunks.push(chunk.slice());
      });
      for (let p = 0; p < source.length; p += 1024)
        inflate.push(source.subarray(p, p + 1024), p + 1024 >= source.length);
      output = join(chunks);
    }
    if (output.length !== e.length || crc32(output) !== e.crc)
      fail("ZIP integrity check failed.");
    result.set(e.name, output);
  }
  return result;
}
export async function exportArchive(
  state,
  selected = null,
  persistence = "committed",
) {
  validate(state);
  const artifacts = selected
    ? state.artifacts.filter((a) => a.id === selected)
    : state.artifacts;
  if (selected && artifacts.length !== 1) fail("Selected work is missing.");
  const labels = selected
    ? state.labels.filter((l) => artifacts[0].labels.includes(l.id))
    : state.labels;
  const members = [
    ["labels.json", jsonBytes({ schemaVersion: 1, labels })],
    ...artifacts.map((a) => ["artifacts/" + a.id + ".json", jsonBytes(a)]),
  ];
  const manifest = {
    format: FORMAT,
    schemaVersion: 1,
    exportedAt: now(),
    persistence,
    selection: selected ? "single" : "all",
    artifactIds: artifacts.map((a) => a.id),
    files: await Promise.all(
      members.map(async ([path, data]) => ({
        path,
        bytes: data.length,
        sha256: await hash(data),
      })),
    ),
  };
  const m = jsonBytes(manifest);
  if (members.reduce((n, [, b]) => n + b.length, m.length) > LIMIT.bytes)
    fail("Archive exceeds 20 MiB.");
  const stamp = manifest.exportedAt.replace(/[-:.]/g, "");
  return {
    data: zip([["manifest.json", m], ...members]),
    name: selected
      ? `pixie-${safeName(artifacts[0].name)}-${stamp}-${selected.slice(0, 8)}.zip`
      : `pixie-library-${stamp}-${uuid().slice(0, 8)}.zip`,
  };
}
export async function readArchive(input, filename) {
  if (input.length > LIMIT.bytes) fail("Input exceeds 20 MiB.");
  const sourceHash = await hash(input);
  if (/\.md$/i.test(filename)) {
    const text = decode(input);
    if (text.includes("\0")) fail("Binary Markdown is unsupported.");
    const a = create(
      { id: "legacy-markdown", title: "Imported Markdown", version: "1" },
      {
        type: "legacy/markdown-v0",
        status: "draft",
        text,
        originalFilename: filename,
      },
    );
    a.name = [...filename].slice(0, 160).join("").trim() || "Imported Markdown";
    a.provenance = {
      sourceFormat: "legacy/markdown-v0",
      sourceHash,
      importedAt: now(),
      sourceArtifactId: null,
    };
    artifact(a, []);
    return { artifacts: [a], labels: [], sourceHash, legacy: true };
  }
  if (!/\.zip$/i.test(filename))
    fail("Select a Creative Filing .zip or UTF-8 .md file.");
  const files = unzip(input);
  if (!files.has("manifest.json") || !files.has("labels.json"))
    fail("Required archive members missing.");
  const m = parse(files.get("manifest.json"));
  shape(m, [
    "format",
    "schemaVersion",
    "exportedAt",
    "persistence",
    "selection",
    "artifactIds",
    "files",
  ]);
  if (m.format !== FORMAT || m.schemaVersion !== 1)
    fail("Unsupported archive format/version.");
  timestamp(m.exportedAt);
  if (
    !["committed", "includes-uncommitted-draft"].includes(m.persistence) ||
    !["single", "all"].includes(m.selection) ||
    !Array.isArray(m.artifactIds) ||
    m.artifactIds.length > 100 ||
    new Set(m.artifactIds).size !== m.artifactIds.length ||
    (m.selection === "single" && m.artifactIds.length !== 1)
  )
    fail("Invalid archive selection.");
  m.artifactIds.forEach(id);
  if (
    !Array.isArray(m.files) ||
    m.files.length !== files.size - 1 ||
    new Set(m.files.map((f) => f.path)).size !== m.files.length
  )
    fail("Unlisted or repeated archive members.");
  const expected = [
    "labels.json",
    ...m.artifactIds.map((id) => "artifacts/" + id + ".json"),
  ];
  for (const f of m.files) {
    shape(f, ["path", "bytes", "sha256"]);
    const b = files.get(f.path);
    if (
      !expected.includes(f.path) ||
      !b ||
      f.bytes !== b.length ||
      !/^[a-f0-9]{64}$/.test(f.sha256) ||
      (await hash(b)) !== f.sha256
    )
      fail("Archive hash/length mismatch.");
  }
  if (expected.some((p) => !m.files.some((f) => f.path === p)))
    fail("Missing declared member.");
  const ls = parse(files.get("labels.json"));
  shape(ls, ["schemaVersion", "labels"]);
  if (
    ls.schemaVersion !== 1 ||
    !Array.isArray(ls.labels) ||
    ls.labels.length > 1000
  )
    fail("Unsupported labels schema.");
  ls.labels.forEach(label);
  if (new Set(ls.labels.map((l) => l.id)).size !== ls.labels.length)
    fail("Duplicate label IDs.");
  const artifacts = m.artifactIds.map((id) => {
    const a = parse(files.get("artifacts/" + id + ".json"));
    if (a.id !== id) fail("Artifact filename identity mismatch.");
    return artifact(a, ls.labels, { allowMissing: true });
  });
  return {
    artifacts,
    labels: ls.labels,
    sourceHash,
    legacy: false,
    persistence: m.persistence,
  };
}
export function planImport(source, state, choices = {}) {
  validate(state);
  const next = clone(state),
    mapping = new Map(),
    issues = [],
    summary = { added: 0, copied: 0, skipped: 0, drafts: 0 };
  const referenced = new Set(source.artifacts.flatMap((a) => a.labels));
  for (const lid of new Set([
    ...source.labels.map((l) => l.id),
    ...referenced,
  ])) {
    const incoming = source.labels.find((l) => l.id === lid),
      existing = state.labels.find((l) => l.id === lid),
      choice = choices["label:" + lid];
    if (!incoming) {
      if (choice === "omit") {
        mapping.set(lid, null);
        continue;
      }
      if (
        choice?.startsWith("map:") &&
        state.labels.some((l) => l.id === choice.slice(4))
      ) {
        mapping.set(lid, choice.slice(4));
        continue;
      }
      issues.push({ type: "missing-label", id: lid, word: lid });
      continue;
    }
    if (
      existing &&
      JSON.stringify([existing.word, existing.color]) !==
        JSON.stringify([incoming.word, incoming.color])
    ) {
      if (choice === "existing") mapping.set(lid, lid);
      else if (choice === "copy") {
        const n = { ...incoming, id: uuid() };
        next.labels.push(n);
        mapping.set(lid, n.id);
      } else
        issues.push({
          type: "label",
          id: lid,
          word: incoming.word,
          existing: existing.word,
        });
    } else {
      mapping.set(lid, lid);
      if (!existing) next.labels.push(clone(incoming));
    }
  }
  for (const original of source.artifacts) {
    const existing = state.artifacts.find((a) => a.id === original.id);
    if (
      source.legacy &&
      state.artifacts.some(
        (a) =>
          a.provenance?.sourceFormat === "legacy/markdown-v0" &&
          a.provenance.sourceHash === source.sourceHash,
      )
    ) {
      summary.skipped++;
      continue;
    }
    if (existing && logical(existing) === logical(original)) {
      summary.skipped++;
      continue;
    }
    const choice = choices["artifact:" + original.id];
    if (existing && choice !== "copy") {
      summary.skipped++;
      if (choice !== "skip")
        issues.push({ type: "artifact", id: original.id, name: original.name });
      continue;
    }
    const a = clone(original);
    a.labels = [
      ...new Set(a.labels.map((l) => mapping.get(l)).filter((l) => l !== null)),
    ];
    if (a.labels.includes(undefined)) continue;
    if (existing) {
      a.id = uuid();
      a.name = [...(a.name + " (restored copy)")].slice(0, 160).join("");
      a.revision = 1;
      summary.copied++;
    }
    a.provenance = {
      sourceFormat: source.legacy ? "legacy/markdown-v0" : FORMAT,
      sourceHash: source.sourceHash,
      importedAt: now(),
      sourceArtifactId: source.legacy ? null : original.id,
    };
    // A previous conflict copy of this exact source makes retries idempotent.
    if (
      state.artifacts.some(
        (v) =>
          v.provenance?.sourceHash === source.sourceHash &&
          v.provenance?.sourceArtifactId === original.id &&
          logical({ ...v, id: a.id, name: original.name }) ===
            logical({ ...a, name: original.name }),
      )
    ) {
      summary.skipped++;
      continue;
    }
    next.artifacts.push(a);
    summary.added++;
    if (a.content.status === "draft") summary.drafts++;
  }
  if (!issues.length) validate(next);
  return { next, issues, summary, revision: state.revision };
}
