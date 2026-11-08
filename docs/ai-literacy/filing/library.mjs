import { clone, uuid, now, find, validate } from "./model.mjs";
import { openStore } from "./store.mjs";
import { exportArchive, readArchive, planImport } from "./archive.mjs";
import { element, download, rename } from "./shared.mjs";
const store = openStore(),
  $ = (id) => document.getElementById(id);
let current,
  selected = "",
  source,
  plan,
  choices = {},
  previewState;
const announce = (message) => ($("library-status").textContent = message);
$("storage-origin").textContent = location.origin;
async function load() {
  try {
    current = await store.read();
    render();
    announce("Library loaded on this device.");
    $("storage-retry").hidden = true;
  } catch (e) {
    announce("Could not load Library: " + e.message);
    $("storage-retry").hidden = false;
    $("export-all").disabled = true;
    $("import-file").disabled = true;
  }
}
$("storage-retry").onclick = load;
async function commit(next, message) {
  const result = await store.commit(current.revision, next);
  current = result;
  render();
  announce(message);
}
function render() {
  $("export-all").disabled = false;
  $("import-file").disabled = false;
  renderResults();
  $("label-views").replaceChildren();
  $("label-management").replaceChildren();
  for (const l of current.labels) {
    const button = element("button", l.word, $("label-views"), {
      type: "button",
      "aria-pressed": String(l.id === selected),
    });
    button.onclick = () => {
      selected = selected === l.id ? "" : l.id;
      render();
      [...$("label-views").querySelectorAll("button")]
        .find((b) => b.textContent === l.word)
        ?.focus();
    };
    const row = element("details", "", $("label-management"));
    element("summary", "Manage label: " + l.word, row);
    const r = element("button", "Rename label " + l.word, row, {
      type: "button",
    });
    r.onclick = () =>
      rename(
        { name: l.word },
        r,
        async (word) => {
          if ([...word].length > 40)
            throw new Error("Labels have at most 40 characters.");
          const next = clone(current);
          next.labels.find((x) => x.id === l.id).word = word;
          const focusId = l.id;
          await commit(next, "Label renamed everywhere.");
          $("label-views")
            .querySelectorAll("button")
            [current.labels.findIndex((x) => x.id === focusId)]?.focus();
        },
        announce,
      );
    const del = element("button", "Delete label " + l.word, row, {
      type: "button",
    });
    del.onclick = async () => {
      const count = current.artifacts.filter((a) =>
        a.labels.includes(l.id),
      ).length;
      if (
        !confirm(
          "Delete label “" +
            l.word +
            "” from " +
            count +
            " works? The works remain.",
        )
      )
        return;
      try {
        const next = clone(current);
        next.labels = next.labels.filter((x) => x.id !== l.id);
        next.artifacts.forEach((a) => {
          if (a.labels.includes(l.id)) {
            a.labels = a.labels.filter((id) => id !== l.id);
            a.revision++;
            a.modified = now();
          }
        });
        if (selected === l.id) selected = "";
        await commit(next, "Label deleted; work preserved.");
        $("label-word").focus();
      } catch (e) {
        announce(e.message);
      }
    };
  }
}
function renderResults() {
  const openMenus = new Set(
    [...$("recent").querySelectorAll("article")]
      .filter((a) => a.querySelector("details")?.open)
      .map((a) => a.dataset.id),
  );
  const results = find(current, $("find").value, selected);
  $("result-count").textContent =
    results.length +
    " result" +
    (results.length === 1 ? "" : "s") +
    (selected
      ? " · " + current.labels.find((l) => l.id === selected)?.word
      : "");
  $("recent").replaceChildren();
  if (!results.length) {
    element(
      "p",
      current.artifacts.length
        ? "No matches. Clear search and label to see all work."
        : "No saved work yet. Start an exercise or import a backup.",
      $("recent"),
    );
    return;
  }
  for (const a of results) {
    const row = element("article", "", $("recent"), { class: "filing-record" }),
      heading = element("h3", "", row),
      button = element("button", a.name, heading, {
        type: "button",
        "aria-label": "Rename " + a.name,
      });
    row.dataset.id = a.id;
    button.onclick = () =>
      rename(
        a,
        button,
        async (name) => {
          const next = clone(current),
            record = next.artifacts.find((x) => x.id === a.id);
          record.name = name;
          record.modified = now();
          record.revision++;
          await commit(next, "Name saved.");
          if (
            !find(current, $("find").value, selected).some((x) => x.id === a.id)
          ) {
            announce("Name saved. This work moved out of the current results.");
            $("find").focus();
          } else
            [...$("recent").querySelectorAll("h3 button")]
              .find((b) => b.textContent === name)
              ?.focus();
        },
        announce,
      );
    element(
      "p",
      a.exercise.title +
        " · " +
        new Date(a.modified).toLocaleString() +
        " · " +
        a.content.status,
      row,
    );
    element(
      "p",
      a.labels
        .map((id) => current.labels.find((l) => l.id === id)?.word)
        .join(" · ") || "No labels",
      row,
    );
    const menu = element("details", "", row);
    menu.open = openMenus.has(a.id);
    element("summary", "Actions for " + a.name, menu);
    if (a.content.type === "practice/structured-v1")
      element("a", "Resume " + a.name, menu, {
        href: "rubrics.html?artifact=" + a.id,
        class: "button",
      });
    else {
      const read = element("button", "Read original Markdown", menu, {
        type: "button",
      });
      read.onclick = () => {
        const pre = element("pre", a.content.text, menu);
        read.disabled = true;
      };
      const original = element("button", "Download original Markdown", menu, {
        type: "button",
      });
      original.onclick = () => {
        download(
          a.content.text,
          a.content.originalFilename.replace(/[\/\\]/g, "-") || "practice.md",
          "text/markdown",
        );
        announce("Markdown download started. Check Downloads or Files.");
      };
    }
    const labels = element("fieldset", "", menu);
    element("legend", "Labels for " + a.name, labels);
    for (const l of current.labels) {
      const wrap = element("label", "", labels, { class: "choice" }),
        input = element("input", "", wrap, {
          type: "checkbox",
          "aria-label": l.word + " for " + a.name,
        });
      input.checked = a.labels.includes(l.id);
      wrap.append(document.createTextNode(l.word));
      input.onchange = async () => {
        const next = clone(current),
          r = next.artifacts.find((x) => x.id === a.id);
        r.labels = input.checked
          ? [...r.labels, l.id]
          : r.labels.filter((id) => id !== l.id);
        r.revision++;
        r.modified = now();
        try {
          await commit(next, "Labels saved.");
          const row = [...$("recent").querySelectorAll("article")].find(
            (row) => row.dataset.id === a.id,
          );
          if (row) {
            const focus = [...row.querySelectorAll("input")].find(
              (el) =>
                el.getAttribute("aria-label") === l.word + " for " + a.name,
            );
            focus?.focus();
          } else $("find").focus();
        } catch (e) {
          input.checked = !input.checked;
          announce(e.message);
        }
      };
    }
    const exp = element("button", "Export " + a.name, menu, { type: "button" });
    exp.onclick = () => exportWork(a.id);
    const duplicate = element("button", "Duplicate " + a.name, menu, {
      type: "button",
    });
    duplicate.onclick = async () => {
      try {
        const next = clone(current),
          copy = clone(a);
        copy.id = uuid();
        copy.name = [...(copy.name + " (copy)")].slice(0, 160).join("");
        copy.revision = 1;
        copy.created = copy.modified = now();
        next.artifacts.push(copy);
        await commit(next, "Separate copy saved.");
      } catch (e) {
        announce(e.message);
      }
    };
    const del = element("button", "Delete " + a.name, menu, { type: "button" });
    del.onclick = async () => {
      if (
        !confirm(
          "Before deleting “" +
            a.name +
            "”, use its Export action if you need a backup. Delete now? There is no trash.",
        )
      )
        return;
      try {
        const next = clone(current);
        next.artifacts = next.artifacts.filter((x) => x.id !== a.id);
        await commit(next, "Work deleted. Restore only from a prior backup.");
        $("find").focus();
      } catch (e) {
        announce(e.message);
      }
    };
  }
}
let searchTimer;
$("find").oninput = () => {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(renderResults, 200);
};
$("clear").onclick = () => {
  selected = "";
  $("find").value = "";
  render();
  $("find").focus();
};
$("new-label").onsubmit = async (e) => {
  e.preventDefault();
  const word = $("label-word").value.trim();
  if (!word) return;
  try {
    const next = clone(current);
    next.labels.push({ id: uuid(), word });
    await commit(next, "Custom label created.");
    $("new-label").reset();
    $("label-word").focus();
  } catch (e) {
    announce(e.message);
  }
};
async function exportWork(id = null) {
  try {
    const latest = await store.read();
    const result = await exportArchive(latest, id);
    download(result.data, result.name);
    announce(
      "Archive prepared; download started. Check Downloads or Files before relying on it.",
    );
  } catch (e) {
    announce("Export failed: " + e.message);
  }
}
$("export-all").onclick = () => exportWork();
const dialog = $("import-preview");
function preview() {
  $("import-content").replaceChildren();
  try {
    plan = planImport(source, previewState, choices);
    const s = plan.summary;
    element(
      "p",
      "Schema v1 · " +
        s.added +
        " to add · " +
        s.copied +
        " copies · " +
        s.skipped +
        " skipped · " +
        s.drafts +
        " unfinished drafts. Imported practice is learner-produced.",
      $("import-content"),
    );
    if (source.persistence === "includes-uncommitted-draft")
      element(
        "p",
        "This archive includes work that was not saved on its source device.",
        $("import-content"),
      );
    for (const issue of plan.issues) {
      const wrapper = element(
        "label",
        (issue.name || issue.word) +
          " · " +
          (issue.type === "artifact"
            ? "Existing work differs; it will not be overwritten."
            : issue.type === "label"
              ? "Label conflicts with “" + issue.existing + "”."
              : "Missing label definition; choose a repair."),
        $("import-content"),
      );
      const select = element("select", "", wrapper);
      const opts =
        issue.type === "artifact"
          ? [
              ["", "Choose (Skip is default)"],
              ["skip", "Skip imported work"],
              ["copy", "Keep imported as a separate copy"],
            ]
          : issue.type === "label"
            ? [
                ["", "Choose label mapping"],
                ["existing", "Use existing label"],
                ["copy", "Create separate label and remap"],
              ]
            : [
                ["", "Choose repair"],
                ["omit", "Omit this membership explicitly"],
                ...previewState.labels.map((l) => [
                  "map:" + l.id,
                  "Map to " + l.word,
                ]),
              ];
      for (const [value, text] of opts) {
        element("option", text, select, { value });
      }
      select.value =
        choices[
          (issue.type === "artifact" ? "artifact:" : "label:") + issue.id
        ] || "";
      select.onchange = () => {
        choices[
          (issue.type === "artifact" ? "artifact:" : "label:") + issue.id
        ] = select.value;
        preview();
        $("import-content").querySelector("select")?.focus();
      };
    }
    $("import-confirm").disabled = plan.issues.some(
      (i) => i.type !== "artifact",
    );
    $("import-status").textContent = plan.issues.length
      ? "Review conflicts. Unselected artifact conflicts will be skipped."
      : "Ready to import atomically. Existing work will be preserved.";
  } catch (e) {
    plan = null;
    $("import-confirm").disabled = true;
    $("import-status").textContent = e.message;
  }
}
$("import-file").onchange = async () => {
  const file = $("import-file").files[0];
  if (!file) return;
  try {
    if (file.size > 20 * 1024 * 1024) throw new Error("Input exceeds 20 MiB.");
    source = await readArchive(
      new Uint8Array(await file.arrayBuffer()),
      file.name,
    );
    previewState = await store.read();
    choices = {};
    preview();
    dialog.showModal();
    $("import-cancel").focus();
  } catch (e) {
    announce("Import rejected; Library unchanged. " + e.message);
  } finally {
    $("import-file").value = "";
  }
};
function close() {
  dialog.close();
  source = null;
  plan = null;
  $("import-file").focus();
}
$("import-cancel").onclick = close;
dialog.addEventListener("cancel", (e) => {
  e.preventDefault();
  close();
});
$("import-confirm").onclick = async () => {
  try {
    const explicit = { ...choices };
    for (const i of plan.issues)
      if (i.type === "artifact") explicit["artifact:" + i.id] = "skip";
    const final = planImport(source, previewState, explicit);
    if (final.issues.length) throw new Error("Resolve label repairs first.");
    const latest = await store.read();
    if (latest.revision !== previewState.revision) {
      previewState = latest;
      preview();
      throw new Error(
        "Library changed since preview. Review the refreshed plan and confirm again.",
      );
    }
    current = await store.commit(final.revision, final.next);
    render();
    const s = final.summary;
    close();
    announce(
      "Import committed: " +
        s.added +
        " added, " +
        s.skipped +
        " skipped. Verify restored content and labels.",
    );
  } catch (e) {
    $("import-status").textContent = "Import not committed. " + e.message;
  }
};
if (navigator.storage?.persisted) {
  try {
    const persisted = await navigator.storage.persisted();
    $("storage-info").textContent = persisted
      ? "Browser reports persistent storage. Keep an external backup."
      : "Browser storage is best effort. Keep an external backup.";
    $("request-persistence").hidden = !navigator.storage.persist;
  } catch {}
}
$("request-persistence").onclick = async () => {
  try {
    const granted = await navigator.storage.persist();
    $("storage-info").textContent = granted
      ? "Persistence granted by browser; backup is still necessary."
      : "Persistence not granted; work remains best effort. Export a backup.";
  } catch (e) {
    announce("Persistence request unavailable. Export a backup.");
  }
};
window.addEventListener("pageshow", () => load());
await load();
