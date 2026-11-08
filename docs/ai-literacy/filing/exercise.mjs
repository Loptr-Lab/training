import { create, uuid, clone } from "./model.mjs";
import { openStore, Draft } from "./store.mjs";
import { exportArchive } from "./archive.mjs";
import { rename, download } from "./shared.mjs";
const store = openStore();
const title = document.getElementById("filing-title"),
  status = document.getElementById("filing-status"),
  failure = document.getElementById("filing-failure");
let draft,
  kind = "rubric-writing",
  loading = true;
let rubricSnapshot;
const byKind = new Map(),
  sessions = new Set();
function state(message, error) {
  status.textContent = message;
  failure.hidden =
    message === "Saved on this device" ||
    (message !== "Could not save" && !draft?.error);
  document.getElementById("filing-error").textContent = error || "";
}
function base() {
  if (rubricSnapshot)
    return {
      ...clone(rubricSnapshot),
      criteria: [],
      gradingResults: [],
      status: "draft",
    };
  const section = document.getElementById("fiction").parentElement;
  const lists = section.querySelectorAll("ul");
  return {
    type: "practice/structured-v1",
    taskPrompt: section.querySelector("h3 + p").textContent,
    inputFacts: Array.from(lists[0].children, (x) => x.textContent),
    fictionalDeliverable: Array.from(document.querySelectorAll("p")).find((p) =>
      p.textContent.startsWith("Independent exercise:"),
    ).textContent,
    criteria: [],
    gradingResults: [],
    revisionNotes: [],
    status: "draft",
  };
}
function content() {
  if (kind === "synthetic-classroom") {
    const cap = window.trainingCapstone.snapshot(),
      last = cap.attempts.at(-1),
      e = last.exercise;
    return {
      type: "practice/structured-v1",
      taskPrompt: e.prompt,
      inputFacts: e.facts,
      fictionalDeliverable: e.response.join("\n"),
      criteria: e.criteria.map((c, i) => ({
        id: "capstone-" + (i + 1),
        text: c.text,
        weight: c.weight,
        origin: c.origin,
        reason: "Synthetic task requirement.",
      })),
      gradingResults: e.criteria.map((c, i) => ({
        criterionId: "capstone-" + (i + 1),
        outcome:
          last.answers.length === 4 ? (c.pass ? "PASS" : "FAIL") : "ungraded",
        evidence: last.answers.length === 4 ? c.evidence : "",
        points: last.answers.length === 4 ? (c.pass ? c.weight : 0) : null,
      })),
      revisionNotes: [],
      status: cap.completed ? "complete" : "draft",
      seed: cap.seed,
      scenarioId: cap.scenarioId,
      attempts: cap.attempts,
    };
  }
  const r = window.trainingRubric.snapshot(),
    c = base();
  c.criteria = r.drafts.map((d, i) => ({
    id: rubricSnapshot?.criteria[i]?.id || "rubric-" + (i + 1),
    text: d.criterion,
    weight: d.weight,
    origin: d.origin,
    reason: d.reason,
  }));
  c.gradingResults = c.criteria.map((cr) => ({
    criterionId: cr.id,
    ...(rubricSnapshot?.criteria.some(
      (old) => JSON.stringify(old) === JSON.stringify(cr),
    )
      ? rubricSnapshot.gradingResults.find((r) => r.criterionId === cr.id)
      : null),
    ...(!rubricSnapshot?.criteria.some(
      (old) => JSON.stringify(old) === JSON.stringify(cr),
    ) || !rubricSnapshot.gradingResults.some((r) => r.criterionId === cr.id)
      ? { outcome: "ungraded", evidence: "", points: null }
      : {}),
  }));
  // Resume-only input snapshot uses an explicit, ungraded revision note, not a schema extension or claimed score.
  c.revisionNotes = [
    ...c.revisionNotes.filter(
      (n) => n.feedback !== "Local resume state: writer-state/v1",
    ),
    {
      before: r.form[0],
      feedback: "Local resume state: writer-state/v1",
      after: JSON.stringify(r),
      reason: "Unfinished inputs and lesson responses; no grading claim.",
    },
  ];
  return c;
}
function attach(record, revision) {
  title.textContent = record.name;
  let instance;
  instance = new Draft(store, record, revision, (message, error) => {
    if (draft === instance) state(message, error);
  });
  draft = instance;
  byKind.set(kind, draft);
  sessions.add(draft);
}
function capture(event) {
  if (loading) return;
  const target = event.target;
  const nextKind = target.closest("#fresh-practice")
    ? "synthetic-classroom"
    : "rubric-writing";
  if (draft && nextKind !== kind) {
    draft.flush();
    kind = nextKind;
    draft = byKind.get(kind) || null;
    if (draft) {
      title.textContent = draft.record.name;
      history.replaceState(null, "", "?artifact=" + draft.record.id);
    }
  }
  kind = nextKind;
  if (!draft) {
    const record = create(
      {
        id: kind,
        title:
          kind === "synthetic-classroom"
            ? "Synthetic classroom practice"
            : "Rubric writing",
        version: "1",
      },
      content(),
    );
    attach(record, 0);
    history.replaceState(null, "", "?artifact=" + record.id);
    draft.edit(record);
    draft.flush();
  } else {
    const updated = content();
    if (JSON.stringify(updated) === JSON.stringify(draft.record.content))
      return;
    draft.record.content = updated;
    draft.edit(draft.record);
    if (
      (target.id === "keep-criterion" &&
        draft.record.content.criteria.length === 3) ||
      (target.id === "capstone-next" &&
        draft.record.content.attempts?.at(-1).answers.length === 4)
    )
      draft.flush();
  }
}
try {
  const state = await store.read(),
    requested = new URL(location.href).searchParams.get("artifact");
  if (requested) {
    const record = state.artifacts.find((a) => a.id === requested);
    if (!record)
      throw new Error(
        "This work is not available on this browser origin. Open Library or import a backup.",
      );
    if (record.content.type !== "practice/structured-v1")
      throw new Error("Read legacy Markdown in Library.");
    kind = record.exercise.id;
    attach(record, record.revision);
    if (kind === "synthetic-classroom")
      window.trainingCapstone.restore(record.content);
    else {
      rubricSnapshot = clone(record.content);
      const section = document.getElementById("fiction").parentElement,
        lists = section.querySelectorAll("ul");
      section.querySelector("h3 + p").textContent = record.content.taskPrompt;
      document.getElementById("fiction").textContent =
        "Your saved fictional task snapshot";
      lists[1].previousElementSibling.textContent =
        "Saved fictional deliverable";
      for (const [list, values] of [
        [lists[0], record.content.inputFacts],
        [lists[1], record.content.fictionalDeliverable.split("\n")],
      ]) {
        list.replaceChildren();
        for (const value of values) {
          const li = document.createElement("li");
          li.textContent = value;
          list.append(li);
        }
      }
      const note = record.content.revisionNotes.find(
        (n) => n.feedback === "Local resume state: writer-state/v1",
      );
      if (note) {
        const r = JSON.parse(note.after);
        if (
          !Array.isArray(r.drafts) ||
          !Array.isArray(r.form) ||
          r.form.length !== 4 ||
          !r.form.every((x) => typeof x === "string") ||
          !["explicit", "implicit"].includes(r.form[2])
        )
          throw new Error(
            "Unsupported resume note. Original content remains in Library.",
          );
        window.trainingRubric.restore(r, record.content);
      } else
        window.trainingRubric.restore(
          {
            drafts: record.content.criteria.map((c) => ({
              criterion: c.text,
              weight: c.weight,
              origin: c.origin,
              reason: c.reason,
            })),
            form: ["", "2", "explicit", ""],
            feedback: "",
            reviews: 0,
            answers: [],
            score: "",
          },
          record.content,
        );
    }
    status.textContent = "Saved on this device";
  }
} catch (e) {
  state("Could not save", e.message);
}
loading = false;
for (const selector of [
  "#writer",
  ".rubric-question",
  "#score-practice",
  "#fresh-practice",
])
  for (const el of document.querySelectorAll(selector)) {
    el.addEventListener("input", capture);
    el.addEventListener("change", capture);
    el.addEventListener("submit", (e) => queueMicrotask(() => capture(e)));
  }
for (const id of [
  "keep-criterion",
  "reset-writer",
  "capstone-new",
  "capstone-next",
  "capstone-retry",
])
  document.getElementById(id)?.addEventListener("click", (e) =>
    queueMicrotask(() => {
      if (id === "capstone-new") {
        if (draft && kind === "synthetic-classroom") {
          draft.flush();
          draft = null;
        }
        byKind.delete("synthetic-classroom");
      }
      capture(e);
    }),
  );
document
  .getElementById("written-criteria")
  .nextElementSibling.addEventListener("click", (e) =>
    queueMicrotask(() => capture(e)),
  );
title.onclick = () => {
  if (!draft) return;
  rename(
    draft.record,
    title,
    async (name) => {
      draft.record.name = name;
      draft.edit(draft.record);
      if (!(await draft.flush()))
        throw new Error(draft.error?.message || "Could not save");
      title.textContent = name;
    },
    (message) => {
      if (message === "Name updated.")
        status.textContent = "Saved on this device";
      else state("Could not save", message);
    },
  );
};
document.getElementById("filing-retry").onclick = () => draft?.flush();
document.getElementById("filing-copy").onclick = () => {
  if (!draft) return;
  const copy = clone(draft.record);
  copy.id = uuid();
  copy.revision = 1;
  copy.name = [...(copy.name + " (working copy)")].slice(0, 160).join("");
  attach(copy, 0);
  history.replaceState(null, "", "?artifact=" + copy.id);
  draft.edit(copy);
  draft.flush();
};
document.getElementById("filing-export").onclick = async () => {
  if (!draft) return;
  try {
    const s = await store
      .read()
      .catch(() => ({ revision: 0, artifacts: [], labels: [] }));
    s.artifacts = s.artifacts.filter((a) => a.id !== draft.record.id);
    s.artifacts.push(clone(draft.record));
    const result = await exportArchive(
      s,
      draft.record.id,
      "includes-uncommitted-draft",
    );
    download(result.data, result.name);
    status.textContent =
      "Archive prepared; download started. This draft is not saved locally. Check Downloads or Files.";
  } catch (e) {
    download(
      JSON.stringify(draft.record, null, 2),
      "pixie-draft-salvage.txt",
      "text/plain",
    );
    state(
      "Could not save",
      "Full archive unavailable: " +
        e.message +
        " Plain-text salvage download started; it is not a restorable backup.",
    );
  }
};
document.addEventListener("visibilitychange", () => {
  if (document.hidden) for (const session of sessions) session.flush();
});
window.addEventListener("pagehide", () => {
  for (const session of sessions) session.flush();
});
document.addEventListener("click", async (e) => {
  const a = e.target.closest("a[href]");
  if (
    !a ||
    a.hasAttribute("download") ||
    !["http:", "https:"].includes(a.protocol) ||
    ![...sessions].some((s) => s.dirty) ||
    a.origin !== location.origin ||
    a.hash ||
    e.metaKey ||
    e.ctrlKey
  )
    return;
  e.preventDefault();
  if ((await Promise.all([...sessions].map((s) => s.flush()))).every(Boolean))
    location.href = a.href;
  else
    state(
      "Could not save",
      "A working draft could not be saved. Return to that exercise section and export it before leaving.",
    );
});
