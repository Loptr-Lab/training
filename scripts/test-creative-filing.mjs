import assert from "node:assert/strict";
import {
  create,
  initial,
  validate,
  clone,
  uuid,
  find,
  hash,
} from "../docs/ai-literacy/filing/model.mjs";
import {
  exportArchive,
  readArchive,
  planImport,
  zip,
  unzip,
} from "../docs/ai-literacy/filing/archive.mjs";
import { Draft } from "../docs/ai-literacy/filing/store.mjs";
import { zipSync } from "../docs/ai-literacy/filing/vendor/fflate.mjs";
const text = new TextEncoder();
const content = {
  type: "practice/structured-v1",
  taskPrompt: "Synthetic task",
  inputFacts: ["Fictional facts"],
  fictionalDeliverable: "Fictional response",
  criteria: [
    {
      id: "c1",
      text: "Exact total",
      weight: 4,
      origin: "explicit",
      reason: "Task",
    },
    {
      id: "c2",
      text: "Defined mistake",
      weight: -6,
      origin: "explicit",
      reason: "Penalty",
    },
  ],
  gradingResults: [
    { criterionId: "c1", outcome: "PASS", evidence: "Synthetic 4", points: 4 },
    {
      criterionId: "c2",
      outcome: "PASS",
      evidence: "Synthetic -6",
      points: -6,
    },
  ],
  revisionNotes: [],
  status: "draft",
};
const a = create(
    { id: "rubric-writing", title: "Rubric writing", version: "1" },
    content,
  ),
  state = initial();
state.artifacts.push(a);
a.labels = state.labels.slice(0, 2).map((l) => l.id);
validate(state);
let passed = 0;
async function test(id, name, run) {
  await run();
  passed++;
  console.log("PASS " + id + " " + name);
}
await test("RT-01", "draft identity and commit-only status", async () => {
  let complete;
  const store = {
    save: async (record) => {
      await new Promise((r) => (complete = r));
      return { ...state, artifacts: [record] };
    },
  };
  const events = [],
    d = new Draft(store, a, 0, (s) => events.push(s));
  d.edit(a);
  const saving = d.flush();
  await Promise.resolve();
  assert.equal(events.at(-1), "Saving");
  complete();
  await saving;
  assert.equal(events.at(-1), "Saved on this device");
});
await test("RT-02", "signed points survive archive round trip", async () => {
  const restored = await readArchive(
    (await exportArchive(state, a.id)).data,
    "one.zip",
  );
  assert.deepEqual(restored.artifacts[0].content, content);
  assert.equal(
    restored.artifacts[0].content.gradingResults.reduce(
      (n, r) => n + r.points,
      0,
    ),
    -2,
  );
});
await test("RT-03", "rename preserves identity/content", () => {
  const b = clone(a);
  b.name = "Renamed";
  assert.equal(b.id, a.id);
  assert.deepEqual(b.content, a.content);
});
await test("RT-04", "two stable labels and rename", () => {
  const s = clone(state);
  s.labels[0].word = "Review later";
  assert.equal(find(s, "review later").length, 1);
  assert.equal(s.artifacts.length, 1);
});
await test("RT-05", "NFC, tokens and label intersection", () => {
  const s = clone(state);
  s.artifacts[0].name = "CAFÉ synthetic";
  assert.equal(find(s, "cafe\u0301 review", s.labels[0].id).length, 1);
  assert.equal(find(s, "CAFÉ", s.labels[3].id).length, 0);
});
await test(
  "RT-06",
  "single ZIP manifest hashes and referenced labels",
  async () => {
    const archive = await exportArchive(state, a.id);
    const files = unzip(archive.data);
    assert.equal(files.size, 3);
    const source = await readArchive(archive.data, "single.zip");
    assert.equal(source.labels.length, 2);
    assert.match(archive.name, /^pixie-.*\.zip$/);
    const compressed = zipSync(Object.fromEntries(files), { level: 6 });
    assert.deepEqual(
      (await readArchive(compressed, "deflate.zip")).artifacts[0].content,
      content,
    );
  },
);
await test(
  "RT-07",
  "same UUID skip and restore into empty library",
  async () => {
    const src = await readArchive(
      (await exportArchive(state, a.id)).data,
      "one.zip",
    );
    assert.equal(planImport(src, state).summary.skipped, 1);
    assert.equal(planImport(src, initial()).summary.added, 1);
  },
);
await test("RT-08", "deep structured content remains identical", async () => {
  const src = await readArchive((await exportArchive(state)).data, "all.zip");
  const plan = planImport(src, initial());
  assert.deepEqual(plan.next.artifacts[0].content, a.content);
  assert.deepEqual(plan.next.artifacts[0].labels, a.labels);
});
await test("RT-09", "all archive retains unused custom labels", async () => {
  const s = clone(state);
  s.labels.push({ id: uuid(), word: "Unused custom" });
  const src = await readArchive((await exportArchive(s)).data, "all.zip");
  assert.equal(src.labels.at(-1).word, "Unused custom");
});
await test(
  "RT-10",
  "legacy exact CRLF/BOM and duplicate source skip",
  async () => {
    const input = text.encode("\ufeff# Draft\r\nSynthetic incomplete\r\n");
    const src = await readArchive(input, "original.md");
    assert.deepEqual(text.encode(src.artifacts[0].content.text), input);
    const p = planImport(src, initial());
    assert.equal(
      planImport(await readArchive(input, "renamed.md"), p.next).summary
        .skipped,
      1,
    );
    const again = await readArchive(
      (await exportArchive(p.next)).data,
      "legacy.zip",
    );
    assert.equal(again.artifacts[0].content.status, "draft");
    assert.deepEqual(text.encode(again.artifacts[0].content.text), input);
  },
);
await test("RT-11", "core has no network/account API", async () => {
  const fs = await import("node:fs/promises");
  for (const f of ["model", "store", "archive"])
    assert.doesNotMatch(
      await fs.readFile(
        new URL("../docs/ai-literacy/filing/" + f + ".mjs", import.meta.url),
        "utf8",
      ),
      /fetch\(|XMLHttpRequest|sendBeacon|WebSocket/,
    );
});
await test("RT-12", "semantic keyboard/reading controls contract", async () => {
  const fs = await import("node:fs/promises"),
    html = await fs.readFile(
      new URL("../docs/ai-literacy/library.html", import.meta.url),
      "utf8",
    );
  assert.match(html, /<dialog/);
  assert.match(html, /training-display.js/);
  assert.match(html, /aria-live="polite"/);
});
await test(
  "NEG-01",
  "failed save retains draft and durable version",
  async () => {
    const d = new Draft(
      {
        save: async () => {
          throw new DOMException("Quota", "QuotaExceededError");
        },
      },
      a,
      1,
    );
    d.edit({ ...a, name: "Working" });
    assert.equal(await d.flush(), false);
    assert.equal(d.record.name, "Working");
    assert.equal(d.durable.name, a.name);
  },
);
await test(
  "NEG-02",
  "uncommitted draft is explicitly identified in archive",
  async () => {
    const data = (
      await exportArchive(state, a.id, "includes-uncommitted-draft")
    ).data;
    const src = await readArchive(data, "draft.zip");
    assert.equal(src.persistence, "includes-uncommitted-draft");
  },
);
await test(
  "NEG-03",
  "changed UUID conflicts, default skip, explicit separate copy",
  async () => {
    const src = await readArchive((await exportArchive(state)).data, "all.zip");
    const changed = clone(state);
    changed.artifacts[0].content.taskPrompt = "Locally edited";
    assert.equal(planImport(src, changed).issues[0].type, "artifact");
    assert.equal(
      planImport(src, changed, { ["artifact:" + a.id]: "skip" }).next.artifacts
        .length,
      1,
    );
    const p = planImport(src, changed, { ["artifact:" + a.id]: "copy" });
    assert.equal(p.next.artifacts.length, 2);
    assert.notEqual(p.next.artifacts[1].id, a.id);
    assert.equal(
      planImport(src, p.next, { ["artifact:" + a.id]: "copy" }).next.artifacts
        .length,
      2,
    );
  },
);
await test(
  "NEG-04",
  "truncated, hash, duplicate path and schema rejected",
  async () => {
    const data = (await exportArchive(state)).data;
    await assert.rejects(readArchive(data.slice(0, -1), "x.zip"));
    const files = unzip(data);
    const altered = [...files].map(([p, b]) => [
      p,
      p === "labels.json" ? text.encode("{}") : b,
    ]);
    await assert.rejects(readArchive(zip(altered), "x.zip"));
    await assert.rejects(
      readArchive(zip([...files, ...[...files].slice(0, 1)]), "x.zip"),
    );
    const m = JSON.parse(new TextDecoder().decode(files.get("manifest.json")));
    m.schemaVersion = 9;
    files.set("manifest.json", text.encode(JSON.stringify(m)));
    await assert.rejects(readArchive(zip([...files]), "future.zip"));
  },
);
await test("NEG-05", "same names are separate identities", () => {
  const s = clone(state),
    b = clone(a);
  b.id = uuid();
  s.artifacts.push(b);
  validate(s);
  assert.equal(find(s, a.name).length, 2);
});
await test(
  "NEG-06",
  "missing label requires explicit repair and conflicting word requires mapping",
  async () => {
    const src = await readArchive((await exportArchive(state)).data, "all.zip");
    src.labels = src.labels.filter((l) => l.id !== a.labels[0]);
    assert.equal(planImport(src, initial()).issues[0].type, "missing-label");
    assert.doesNotThrow(() =>
      planImport(src, initial(), { ["label:" + a.labels[0]]: "omit" }),
    );
    const full = await readArchive(
      (await exportArchive(state)).data,
      "all.zip",
    );
    full.labels[0].word = "Different";
    assert.equal(planImport(full, initial()).issues[0].type, "label");
    assert.equal(
      planImport(full, initial(), { ["label:" + a.labels[0]]: "existing" })
        .issues.length,
      0,
    );
    const copied = planImport(full, initial(), {
      ["label:" + a.labels[0]]: "copy",
    });
    const retried = planImport(full, copied.next, {
      ["label:" + a.labels[0]]: "copy",
    });
    assert.equal(retried.next.artifacts.length, copied.next.artifacts.length);
    assert.equal(retried.next.labels.length, copied.next.labels.length);
    const unused = { ...full, artifacts: [] };
    const labelsOnly = planImport(unused, initial(), {
      ["label:" + a.labels[0]]: "copy",
    });
    assert.equal(
      planImport(unused, labelsOnly.next, { ["label:" + a.labels[0]]: "copy" })
        .next.labels.length,
      labelsOnly.next.labels.length,
    );
  },
);
await test(
  "NEG-07",
  "staging never mutates existing library, retry idempotent",
  async () => {
    const before = JSON.stringify(state),
      src = await readArchive((await exportArchive(state)).data, "all.zip");
    planImport(src, state);
    assert.equal(JSON.stringify(state), before);
    const p = planImport(src, initial());
    assert.equal(planImport(src, p.next).summary.added, 0);
  },
);
await test("NEG-08", "reset recovery from archive", async () => {
  const backup = (await exportArchive(state)).data;
  const empty = initial();
  assert.equal(empty.artifacts.length, 0);
  assert.deepEqual(
    planImport(await readArchive(backup, "backup.zip"), empty).next.artifacts[0]
      .content,
    a.content,
  );
});
await test("NEG-09", "save conflict retains working copy", async () => {
  const d = new Draft(
    {
      save: async () => {
        throw new Error("Save conflict");
      },
    },
    a,
    1,
  );
  d.edit({ ...a, name: "Second tab" });
  assert.equal(await d.flush(), false);
  assert.equal(d.record.name, "Second tab");
});
await test(
  "NEG-10",
  "unsafe paths, invalid weight, nonfinite and binary Markdown rejected",
  async () => {
    await assert.rejects(
      readArchive(
        zip([
          ["../manifest.json", text.encode("{}")],
          ["labels.json", text.encode("{}")],
        ]),
        "unsafe.zip",
      ),
    );
    for (const weight of [0, Infinity, 11]) {
      const s = clone(state);
      s.artifacts[0].content.criteria[0].weight = weight;
      assert.throws(() => validate(s));
    }
    const bomb = zipSync(
      {
        "manifest.json": new Uint8Array(20 * 1024 * 1024 + 1),
        "labels.json": text.encode("{}"),
      },
      { level: 9 },
    );
    await assert.rejects(readArchive(bomb, "bomb.zip"));
    const invalid = clone(state);
    invalid.artifacts[0].content.gradingResults[0].points = 99;
    assert.throws(() => validate(invalid));
    await assert.rejects(readArchive(new Uint8Array([255]), "x.md"));
    await assert.rejects(readArchive(text.encode("a\0b"), "x.md"));
  },
);
await test(
  "NEG-11",
  "storage mode has no guaranteed-retention promise",
  async () => {
    const fs = await import("node:fs/promises"),
      html = await fs.readFile(
        new URL("../docs/ai-literacy/library.html", import.meta.url),
        "utf8",
      );
    assert.match(html, /Private Browsing/);
    assert.match(html, /cleared or evicted/);
    assert.match(html, /Home\s+Screen/);
  },
);
console.log(
  passed +
    " automated contract checks passed. Physical iPad/Files/VoiceOver acceptance NOT RUN.",
);
