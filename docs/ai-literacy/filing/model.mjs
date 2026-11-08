/* Creative Filing v1: local records only. Imported content is never HTML. */
export const FORMAT = "pixie.creative-filing";
export const LIMIT = {
  artifacts: 100,
  labels: 1000,
  artifactBytes: 2 * 1024 * 1024,
  bytes: 20 * 1024 * 1024,
};
export const uuid = () => crypto.randomUUID();
export const now = () => new Date().toISOString();
export const clone = (value) => structuredClone(value);
export const bytes = (value) => new TextEncoder().encode(value);
export const jsonBytes = (value) =>
  bytes(JSON.stringify(value, null, 2) + "\n");
export function fail(message) {
  throw new Error(message);
}
export function shape(o, required, optional = []) {
  if (
    !o ||
    typeof o !== "object" ||
    Array.isArray(o) ||
    required.some((k) => !Object.hasOwn(o, k)) ||
    Object.keys(o).some((k) => ![...required, ...optional].includes(k))
  )
    fail("Unsupported or incomplete record shape.");
}
export function string(v, max = 2 * 1024 * 1024, min = 0) {
  if (typeof v !== "string" || [...v].length < min || [...v].length > max)
    fail("Invalid text field.");
}
export function id(v) {
  if (
    typeof v !== "string" ||
    !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      v,
    )
  )
    fail("Invalid UUID.");
}
export function timestamp(v) {
  if (
    typeof v !== "string" ||
    !/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d\.\d{3}Z$/.test(v) ||
    !Number.isFinite(Date.parse(v)) ||
    new Date(v).toISOString() !== v
  )
    fail("Invalid UTC timestamp.");
}
const array = (v, max) => {
  if (!Array.isArray(v) || v.length > max)
    fail("Invalid array or record limit exceeded.");
};
const unique = (values) => {
  if (new Set(values).size !== values.length) fail("Duplicate identifiers.");
};
const strings = (v) => {
  array(v, 10000);
  v.forEach((x) => string(x));
};
const integer = (v, min, max) => {
  if (!Number.isSafeInteger(v) || v < min || v > max) fail("Invalid integer.");
};
export function label(v) {
  shape(v, ["id", "word"], ["color"]);
  id(v.id);
  string(v.word, 40, 1);
  if (v.word !== v.word.trim()) fail("Label must be trimmed.");
  if (v.color !== undefined && !/^#[0-9a-f]{6}$/i.test(v.color))
    fail("Invalid label color.");
  return v;
}
function criterion(c) {
  shape(c, ["id", "text", "weight", "origin", "reason"]);
  string(c.id, 160, 1);
  string(c.text);
  string(c.reason);
  integer(c.weight, -10, 10);
  if (c.weight === 0 || !["explicit", "implicit"].includes(c.origin))
    fail("Invalid criterion weight or origin.");
}
function snapshot(e) {
  shape(e, [
    "id",
    "seed",
    "prompt",
    "facts",
    "response",
    "criteria",
    "perPerson",
    "partyTotal",
    "score",
  ]);
  string(e.id, 160, 1);
  integer(e.seed, 0, 4294967295);
  string(e.prompt);
  strings(e.facts);
  strings(e.response);
  array(e.criteria, 3);
  if (e.criteria.length !== 3) fail("Incomplete scenario criteria.");
  e.criteria.forEach((c) => {
    shape(c, ["text", "weight", "origin", "pass", "evidence"]);
    string(c.text);
    string(c.evidence);
    integer(c.weight, -10, 10);
    if (
      !c.weight ||
      !["explicit", "implicit"].includes(c.origin) ||
      typeof c.pass !== "boolean"
    )
      fail("Invalid answer key.");
  });
  integer(e.perPerson, 0, 1e9);
  integer(e.partyTotal, 0, 2e9);
  integer(e.score, -30, 30);
  if (
    e.partyTotal !== 2 * e.perPerson ||
    e.score !== e.criteria.reduce((s, c) => s + (c.pass ? c.weight : 0), 0)
  )
    fail("Scenario totals do not match its answer key.");
}
function attempt(a) {
  shape(a, ["round", "exercise", "answers"], ["studyGuide", "nextPath"]);
  integer(a.round, 1, 2);
  snapshot(a.exercise);
  array(a.answers, 4);
  a.answers.forEach((h, i) => {
    shape(h, ["step", "answer", "correct"]);
    if (h.step !== i + 1 || typeof h.correct !== "boolean")
      fail("Invalid answer order.");
    string(h.answer, 80, 1);
    if (h.step < 4 && !["PASS", "FAIL"].includes(h.answer))
      fail("Invalid answer.");
    if (
      h.step === 4 &&
      (!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(h.answer) ||
        !Number.isFinite(Number(h.answer)))
    )
      fail("Invalid numeric answer.");
    const expected =
      h.step < 4
        ? a.exercise.criteria[h.step - 1].pass
          ? "PASS"
          : "FAIL"
        : a.exercise.score;
    if (
      h.correct !==
      (h.step < 4 ? h.answer === expected : Number(h.answer) === expected)
    )
      fail("Answer correctness disagrees with included key.");
  });
  if (a.studyGuide !== undefined) strings(a.studyGuide);
  if (a.nextPath !== undefined) {
    shape(a.nextPath, ["label", "href"]);
    string(a.nextPath.label, 200);
    string(a.nextPath.href, 300);
    if (!/^\.\.\/[a-z0-9/-]+\.html$/.test(a.nextPath.href))
      fail("Unsupported learning path.");
  }
}
export function artifact(v, labels, { allowMissing = false } = {}) {
  shape(v, [
    "id",
    "name",
    "exercise",
    "labels",
    "created",
    "modified",
    "content",
    "schemaVersion",
    "revision",
    "provenance",
  ]);
  id(v.id);
  if (v.schemaVersion !== 1) fail("Unsupported artifact schema version.");
  integer(v.revision, 1, Number.MAX_SAFE_INTEGER);
  string(v.name, 160, 1);
  if (v.name !== v.name.trim()) fail("Name must be trimmed.");
  shape(v.exercise, ["id", "title", "version"]);
  Object.values(v.exercise).forEach((x) => string(x, 160, 1));
  if (
    !["rubric-writing", "synthetic-classroom", "legacy-markdown"].includes(
      v.exercise.id,
    ) ||
    v.exercise.version !== "1"
  )
    fail("Unsupported exercise version.");
  timestamp(v.created);
  timestamp(v.modified);
  if (v.modified < v.created) fail("Modified time precedes creation.");
  array(v.labels, LIMIT.labels);
  unique(v.labels);
  v.labels.forEach((x) => {
    id(x);
    if (!allowMissing && !labels.some((l) => l.id === x))
      fail("Missing label definition: " + x);
  });
  if (v.provenance !== null) {
    shape(v.provenance, [
      "sourceFormat",
      "sourceHash",
      "importedAt",
      "sourceArtifactId",
    ]);
    if (
      ![FORMAT, "legacy/markdown-v0"].includes(v.provenance.sourceFormat) ||
      !/^[a-f0-9]{64}$/.test(v.provenance.sourceHash)
    )
      fail("Invalid provenance.");
    timestamp(v.provenance.importedAt);
    if (v.provenance.sourceArtifactId !== null)
      id(v.provenance.sourceArtifactId);
  }
  const c = v.content;
  if (c?.type === "legacy/markdown-v0") {
    shape(c, ["type", "status", "text", "originalFilename"]);
    if (c.status !== "draft" || v.exercise.id !== "legacy-markdown")
      fail("Invalid legacy status.");
    string(c.text);
    string(c.originalFilename, 1024);
  } else {
    shape(
      c,
      [
        "type",
        "taskPrompt",
        "inputFacts",
        "fictionalDeliverable",
        "criteria",
        "gradingResults",
        "revisionNotes",
        "status",
      ],
      ["seed", "scenarioId", "attempts"],
    );
    if (
      c.type !== "practice/structured-v1" ||
      v.exercise.id === "legacy-markdown" ||
      !["draft", "complete"].includes(c.status)
    )
      fail("Unsupported content.");
    string(c.taskPrompt);
    strings(c.inputFacts);
    string(c.fictionalDeliverable);
    array(c.criteria, 3);
    c.criteria.forEach(criterion);
    unique(c.criteria.map((x) => x.id));
    array(c.gradingResults, 3);
    unique(c.gradingResults.map((x) => x.criterionId));
    c.gradingResults.forEach((r) => {
      shape(r, ["criterionId", "outcome", "evidence", "points"]);
      const cr = c.criteria.find((x) => x.id === r.criterionId);
      if (!cr || !["PASS", "FAIL", "ungraded"].includes(r.outcome))
        fail("Invalid grading reference.");
      string(r.evidence);
      const expected =
        r.outcome === "ungraded" ? null : r.outcome === "PASS" ? cr.weight : 0;
      if (r.points !== expected) fail("Signed points disagree with outcome.");
    });
    array(c.revisionNotes, 1000);
    c.revisionNotes.forEach((r) => {
      shape(r, ["before", "feedback", "after", "reason"]);
      Object.values(r).forEach((x) => string(x));
    });
    c.revisionNotes
      .filter((n) => n.feedback === "Local resume state: writer-state/v1")
      .forEach((n) => {
        const r = JSON.parse(n.after);
        shape(r, ["drafts", "form", "feedback", "reviews", "answers", "score"]);
        array(r.drafts, 3);
        array(r.form, 4);
        if (r.form.length !== 4) fail("Invalid unfinished writer state.");
        r.form.forEach((v) => string(v, 1200));
        if (!["explicit", "implicit"].includes(r.form[2]))
          fail("Invalid writer origin.");
        string(r.feedback);
        string(r.score, 80);
        integer(r.reviews, 0, 2);
        array(r.answers, 7);
        r.answers.forEach((a) => {
          shape(a, ["name", "value"]);
          if (
            !/^answer-[1-7]$/.test(a.name) ||
            !["0", "1", "2"].includes(a.value)
          )
            fail("Invalid lesson response.");
        });
        unique(r.answers.map((a) => a.name));
        r.drafts.forEach((d, i) => {
          shape(d, ["criterion", "weight", "origin", "reason"]);
          criterion({
            id: "rubric-" + (i + 1),
            text: d.criterion,
            weight: d.weight,
            origin: d.origin,
            reason: d.reason,
          });
          const cr = c.criteria[i];
          if (
            !cr ||
            cr.text !== d.criterion ||
            cr.weight !== d.weight ||
            cr.origin !== d.origin ||
            cr.reason !== d.reason
          )
            fail("Writer drafts disagree with included criteria.");
        });
        if (c.criteria.length !== r.drafts.length)
          fail("Writer draft count mismatch.");
      });
    if (
      (v.exercise.id === "synthetic-classroom") !==
      (c.attempts !== undefined)
    )
      fail("Exercise snapshot type mismatch.");
    if (c.attempts !== undefined) {
      integer(c.seed, 0, 4294967295);
      string(c.scenarioId, 160, 1);
      array(c.attempts, 2);
      c.attempts.forEach((a, i) => {
        attempt(a);
        if (a.round !== i + 1 || a.exercise.seed !== c.seed)
          fail("Invalid attempt sequence.");
      });
      if (!c.attempts.length || c.scenarioId !== c.attempts.at(-1).exercise.id)
        fail("Scenario identity mismatch.");
    } else if (c.seed !== undefined || c.scenarioId !== undefined)
      fail("Incomplete scenario snapshot.");
    if (
      c.status === "complete" &&
      (!c.taskPrompt ||
        !c.inputFacts.length ||
        !c.fictionalDeliverable ||
        c.criteria.length !== 3 ||
        c.gradingResults.length !== 3 ||
        c.gradingResults.some((x) => x.outcome === "ungraded" || !x.evidence) ||
        c.attempts?.some((a) => a.answers.length !== 4))
    )
      fail("Complete work requires all evidence.");
  }
  if (jsonBytes(v).length > LIMIT.artifactBytes)
    fail("Artifact exceeds 2 MiB.");
  return v;
}
export function validate(state) {
  shape(state, ["revision", "artifacts", "labels"]);
  integer(state.revision, 0, Number.MAX_SAFE_INTEGER);
  array(state.artifacts, LIMIT.artifacts);
  array(state.labels, LIMIT.labels);
  state.labels.forEach(label);
  unique(state.labels.map((x) => x.id));
  unique(state.artifacts.map((x) => x.id));
  state.artifacts.forEach((a) => artifact(a, state.labels));
  return state;
}
export function initial() {
  return {
    revision: 0,
    artifacts: [],
    labels: ["Needs review", "In progress", "Reference", "Verified"].map(
      (word, i) => ({ id: `00000000-0000-4000-8000-00000000000${i}`, word }),
    ),
  };
}
export function create(exercise, content) {
  const time = now();
  return {
    id: uuid(),
    name: (exercise.title + " " + new Date().toLocaleString()).slice(0, 160),
    exercise,
    labels: [],
    created: time,
    modified: time,
    content,
    schemaVersion: 1,
    revision: 1,
    provenance: null,
  };
}
export function find(state, query = "", selected = "") {
  const norm = (s) => s.normalize("NFC").toLowerCase();
  const tokens = norm(query).trim().split(/\s+/).filter(Boolean);
  return state.artifacts
    .filter(
      (a) =>
        (!selected || a.labels.includes(selected)) &&
        tokens.every((t) =>
          [
            a.name,
            a.exercise.title,
            ...a.labels.map(
              (id) => state.labels.find((l) => l.id === id)?.word || "",
            ),
          ].some((s) => norm(s).includes(t)),
        ),
    )
    .sort(
      (a, b) =>
        b.modified.localeCompare(a.modified) || a.id.localeCompare(b.id),
    );
}
function canonical(v) {
  return Array.isArray(v)
    ? v.map(canonical)
    : v && typeof v === "object"
      ? Object.fromEntries(
          Object.keys(v)
            .sort()
            .map((k) => [k, canonical(v[k])]),
        )
      : v;
}
export function logical(a) {
  return JSON.stringify(
    canonical([
      a.schemaVersion,
      a.name,
      a.exercise,
      [...a.labels].sort(),
      a.created,
      a.modified,
      a.content,
    ]),
  );
}
export async function hash(value) {
  return Array.from(
    new Uint8Array(await crypto.subtle.digest("SHA-256", value)),
    (x) => x.toString(16).padStart(2, "0"),
  ).join("");
}
export const safeName = (name) =>
  [
    ...name
      .normalize("NFC")
      .replace(/[\x00-\x1f\x7f/\\:*?"<>|]/g, "-")
      .replace(/^[. ]+|[. ]+$/g, ""),
  ]
    .slice(0, 60)
    .join("")
    .replace(/[. ]+$/g, "") || "artifact";
