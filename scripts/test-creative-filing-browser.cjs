const { chromium } = require("playwright");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const base = process.env.BASE_URL || "http://127.0.0.1:8765";
(async () => {
  const browser = await chromium.launch({
    executablePath: process.env.BROWSER_EXECUTABLE || "/usr/bin/chromium",
    args: ["--no-sandbox"],
  });
  const context = await browser.newContext({ acceptDownloads: true });
  context.setDefaultTimeout(10000);
  const page = await context.newPage();
  const errors = [],
    network = [];
  page.on("pageerror", (e) => errors.push(e.message));
  context.on("request", (r) => {
    if (
      !["GET", "HEAD"].includes(r.method()) ||
      new URL(r.url()).origin !== new URL(base).origin
    )
      network.push(r.method() + " " + r.url());
  });
  const saved = () =>
    page.waitForFunction(
      () =>
        document.querySelector("#filing-status")?.textContent ===
        "Saved on this device",
    );
  const library = async () => {
    await page.goto(base + "/ai-literacy/library.html");
    await page.waitForFunction(() =>
      document
        .querySelector("#library-status")
        .textContent.includes("Library loaded"),
    );
  };
  const snapshot = () =>
    page.evaluate(async () => {
      const { openStore } = await import("./filing/store.mjs");
      return openStore().read();
    });
  await page.goto(base + "/ai-literacy/rubrics.html");
  await page.waitForTimeout(150);
  assert.equal((await snapshot()).artifacts.length, 0);
  await page
    .locator("#criterion-text")
    .fill("States the synthetic total as 100 credits.");
  await page.locator("#criterion-reason").fill("The prompt asks for costs.");
  await saved();
  let state = await snapshot();
  assert.equal(state.artifacts.length, 1);
  const id = state.artifacts[0].id;
  await page.reload();
  await page.waitForFunction(() =>
    document.querySelector("#criterion-text").value.includes("100 credits"),
  );
  assert.equal((await snapshot()).artifacts[0].id, id);
  await page.locator("#filing-title").click();
  await page.getByLabel("Name", { exact: true }).fill("Cancel name");
  await page.keyboard.press("Escape");
  assert.notEqual(
    await page.locator("#filing-title").innerText(),
    "Cancel name",
  );
  assert.equal(
    await page
      .locator("#filing-title")
      .evaluate((e) => e === document.activeElement),
    true,
  );
  await page.locator("#filing-title").click();
  await page.getByLabel("Name", { exact: true }).fill("Synthetic café");
  await page.keyboard.press("Enter");
  await saved();
  await library();
  assert.match(await page.locator("#recent").innerText(), /Synthetic café/);
  let actions = page.locator("#recent article details");
  if (!(await actions.evaluate((e) => e.open)))
    await actions.locator("summary").click();
  await actions
    .getByLabel("Needs review for Synthetic café", { exact: true })
    .check();
  actions = page.locator("#recent article details");
  if (!(await actions.evaluate((e) => e.open)))
    await actions.locator("summary").click();
  await actions
    .getByLabel("In progress for Synthetic café", { exact: true })
    .check();
  await page.locator("#find").fill("CAFÉ review");
  await page.waitForTimeout(250);
  assert.equal(await page.locator("#recent article").count(), 1);
  await page
    .locator("#label-views")
    .getByRole("button", { name: "Verified", exact: true })
    .click();
  assert.equal(await page.locator("#recent article").count(), 0);
  await page.locator("#clear").click();
  await page.locator("#label-word").fill("Unused custom");
  await page.getByRole("button", { name: "Create label", exact: true }).click();
  await page.waitForFunction(() =>
    document
      .querySelector("#label-views")
      .textContent.includes("Unused custom"),
  );
  const before = await snapshot();
  const dp = page.waitForEvent("download");
  await page.locator("#export-all").click();
  const dl = await dp;
  const file = await dl.path();
  const backup = fs.readFileSync(file);
  assert(backup.length > 0);
  await page.locator("#import-file").setInputFiles({
    name: "roundtrip.zip",
    mimeType: "application/zip",
    buffer: backup,
  });
  await page.locator("#import-preview").waitFor({ state: "visible" });
  assert.match(await page.locator("#import-content").innerText(), /1 skipped/);
  await page.locator("#import-cancel").click();
  assert.deepEqual(await snapshot(), before);

  // A library mutation after preview must stop the import and require a new confirmation.
  await page
    .locator("#import-file")
    .setInputFiles({
      name: "stale-preview.md",
      mimeType: "text/markdown",
      buffer: Buffer.from("# Synthetic concurrent import"),
    });
  await page.locator("#import-preview").waitFor({ state: "visible" });
  await page.evaluate(async () => {
    const { openStore } = await import("./filing/store.mjs");
    const store = openStore(),
      s = await store.read();
    s.labels.push({ id: crypto.randomUUID(), word: "Concurrent tab label" });
    await store.commit(s.revision, s);
  });
  await page.locator("#import-confirm").click();
  await page.waitForFunction(() =>
    document
      .querySelector("#import-status")
      .textContent.includes("Library changed since preview"),
  );
  assert.equal((await snapshot()).artifacts.length, before.artifacts.length);
  await page.locator("#import-confirm").click();
  await page.waitForFunction(() =>
    document
      .querySelector("#library-status")
      .textContent.includes("Import committed"),
  );
  // Quota failure retains the old durable revision; explicit export and retry recover.
  const editPage = await context.newPage();
  await editPage.goto(base + "/ai-literacy/rubrics.html?artifact=" + id);
  await editPage.waitForFunction(
    () =>
      document.querySelector("#filing-status").textContent ===
      "Saved on this device",
  );
  await editPage.evaluate(() => {
    window.realPut = IDBObjectStore.prototype.put;
    IDBObjectStore.prototype.put = function () {
      throw new DOMException("Synthetic quota failure", "QuotaExceededError");
    };
  });
  await editPage
    .locator("#criterion-text")
    .fill("Unsaved synthetic quota draft");
  await editPage.waitForFunction(
    () =>
      document.querySelector("#filing-status").textContent === "Could not save",
  );
  assert.equal(
    await editPage.locator("#criterion-text").inputValue(),
    "Unsaved synthetic quota draft",
  );
  const oldDurable = await snapshot();
  assert.notEqual(
    oldDurable.artifacts[0].content.revisionNotes[0].before,
    "Unsaved synthetic quota draft",
  );
  const draftDownload = editPage.waitForEvent("download");
  await editPage.locator("#filing-export").click();
  assert.match((await draftDownload).suggestedFilename(), /\.zip$/);
  await editPage.evaluate(
    () => (IDBObjectStore.prototype.put = window.realPut),
  );
  await editPage.locator("#filing-retry").click();
  await editPage.waitForFunction(
    () =>
      document.querySelector("#filing-status").textContent ===
      "Saved on this device",
  );
  await editPage.close();
  // Real IndexedDB atomic stale revision / transaction abort checks.
  const fault = await page.evaluate(async () => {
    const { openStore } = await import("./filing/store.mjs");
    const s = openStore(),
      one = await s.read(),
      two = await s.read();
    one.labels[0].word = "Renamed review";
    await s.commit(one.revision, one);
    let stale = false;
    try {
      await s.commit(two.revision, two);
    } catch {
      stale = true;
    }
    const old = await s.read();
    const original = IDBObjectStore.prototype.put;
    IDBObjectStore.prototype.put = function (...args) {
      const request = original.apply(this, args);
      this.transaction.abort();
      return request;
    };
    let aborted = false;
    try {
      const next = structuredClone(old);
      next.labels.push({ id: crypto.randomUUID(), word: "Should not commit" });
      await s.commit(old.revision, next);
    } catch {
      aborted = true;
    } finally {
      IDBObjectStore.prototype.put = original;
    }
    return {
      stale,
      aborted,
      unchanged: JSON.stringify(old) === JSON.stringify(await s.read()),
    };
  });
  assert.deepEqual(fault, { stale: true, aborted: true, unchanged: true });
  // Restore into a separate browser identity / origin store without overwriting owner data.
  const fresh = await browser.newContext();
  const p = await fresh.newPage();
  await p.goto(base + "/ai-literacy/library.html");
  await p.waitForFunction(() =>
    document
      .querySelector("#library-status")
      .textContent.includes("Library loaded"),
  );
  await p.locator("#import-file").setInputFiles({
    name: "restore.zip",
    mimeType: "application/zip",
    buffer: backup,
  });
  await p.locator("#import-preview").waitFor({ state: "visible" });
  await p.locator("#import-confirm").click();
  await p.waitForFunction(() =>
    document
      .querySelector("#library-status")
      .textContent.includes("Import committed"),
  );
  const restored = await p.evaluate(async () => {
    const { openStore } = await import("./filing/store.mjs");
    return openStore().read();
  });
  assert.deepEqual(restored.artifacts[0].content, before.artifacts[0].content);
  assert.deepEqual(restored.artifacts[0].labels, before.artifacts[0].labels);
  assert.equal(restored.labels.at(-1).word, "Unused custom");
  await p.reload();
  await p.waitForFunction(() =>
    document.querySelector("#recent").textContent.includes("Synthetic café"),
  );
  await p.locator("#recent details summary").click();
  await p.getByRole("link", { name: "Resume Synthetic café" }).click();
  await p.waitForFunction(() =>
    document.querySelector("#criterion-text").value.includes("100 credits"),
  );
  // Capstone actual answer snapshot and resume, preserving the existing grader.
  await p.locator("#capstone-new").click();
  await p.waitForTimeout(150);
  await p.locator("#capstone-controls input[value=PASS]").check();
  await p.locator("#capstone-submit").click();
  await p.waitForFunction(
    () =>
      document.querySelector("#filing-status").textContent ===
      "Saved on this device",
  );
  const capId = new URL(p.url()).searchParams.get("artifact");
  await p.reload();
  await p.waitForFunction(() =>
    document
      .querySelector("#capstone-question")
      .textContent.includes("check 2 of 3"),
  );
  assert.equal(new URL(p.url()).searchParams.get("artifact"), capId);
  // Preserve a completed failed first attempt and incomplete second attempt in native ZIP.
  for (let step = 2; step <= 4; step++) {
    const snap = await p.evaluate(() => window.trainingCapstone.snapshot());
    const exercise = snap.attempts.at(-1).exercise;
    if (step < 4)
      await p
        .locator(
          "#capstone-controls input[value=" +
            (exercise.criteria[step - 1].pass ? "FAIL" : "PASS") +
            "]",
        )
        .check();
    else await p.locator("#capstone-total").fill(String(exercise.score + 1));
    await p.locator("#capstone-submit").click();
    await p.locator("#capstone-next").click();
  }
  await p.locator("#capstone-retry").click();
  for (let step = 1; step <= 2; step++) {
    await p.locator("#capstone-controls input[value=PASS]").check();
    await p.locator("#capstone-submit").click();
    await p.locator("#capstone-next").click();
  }
  await p.waitForFunction(
    () =>
      document.querySelector("#filing-status").textContent ===
      "Saved on this device",
  );
  const twoRounds = await p.evaluate(async (id) => {
    const { openStore } = await import("./filing/store.mjs"),
      { exportArchive, readArchive } = await import("./filing/archive.mjs");
    const s = await openStore().read(),
      record = s.artifacts.find((a) => a.id === id),
      archive = await exportArchive(s, id),
      source = await readArchive(archive.data, "two-attempts.zip");
    return {
      same:
        JSON.stringify(source.artifacts[0].content) ===
        JSON.stringify(record.content),
      status: record.content.status,
      answers: record.content.attempts.map((a) => a.answers.length),
      ungraded: record.content.gradingResults.every(
        (r) => r.outcome === "ungraded" && r.points === null,
      ),
    };
  }, capId);
  assert.deepEqual(twoRounds, {
    same: true,
    status: "draft",
    answers: [4, 2],
    ungraded: true,
  });
  // Legacy exact bytes and untrusted text rendering.
  await library();
  const legacy = Buffer.from(
    "# Synthetic\r\n<script>window.pwned=1</script>\r\n",
  );
  await page.locator("#import-file").setInputFiles({
    name: "legacy.md",
    mimeType: "text/markdown",
    buffer: legacy,
  });
  await page.locator("#import-preview").waitFor({ state: "visible" });
  await page.locator("#import-confirm").click();
  await page.waitForFunction(() =>
    document
      .querySelector("#library-status")
      .textContent.includes("Import committed"),
  );
  const legacyRow = page.locator("article").filter({ hasText: "legacy.md" });
  await legacyRow.locator("summary").click();
  await legacyRow
    .getByRole("button", { name: "Read original Markdown" })
    .click();
  assert.equal(await page.evaluate(() => window.pwned), undefined);
  const mdp = page.waitForEvent("download");
  await legacyRow
    .getByRole("button", { name: "Download original Markdown" })
    .click();
  assert.deepEqual(fs.readFileSync(await (await mdp).path()), legacy);
  // Reflow at doubled base text size and both shared themes, no page overflow.
  for (const theme of ["dark", "light"])
    for (const width of [320, 768, 1024]) {
      await page.setViewportSize({ width, height: 900 });
      await page.evaluate((theme) => {
        document.documentElement.dataset.theme = theme;
        document.documentElement.style.fontSize = "200%";
      }, theme);
      assert(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        theme + " " + width,
      );
    }

  if (process.env.AXE_PATH) {
    await page.setViewportSize({ width: 1024, height: 900 });
    for (const theme of ["dark", "light"]) {
      await page.evaluate((theme) => {
        document.documentElement.style.fontSize = "";
        document.documentElement.dataset.theme = theme;
      }, theme);
      await page.addScriptTag({ path: process.env.AXE_PATH });
      const scan = await page.evaluate(() =>
        axe.run(document, {
          runOnly: ["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"],
        }),
      );
      assert.deepEqual(
        scan.violations.map((v) => ({
          id: v.id,
          nodes: v.nodes.map((n) => n.target),
        })),
        [],
        theme + " axe",
      );
    }
    console.log("PASS axe WCAG A/AA on populated Library in both themes.");
  }
  const out = process.env.ARTIFACT_DIR || "/tmp/creative-filing-review";
  fs.mkdirSync(out, { recursive: true });
  await page.setViewportSize({ width: 1024, height: 900 });
  await page.screenshot({
    path: path.join(out, "library.png"),
    fullPage: true,
  });
  assert.deepEqual(errors, []);
  assert.deepEqual(network, []);
  await fresh.close();
  await context.close();
  await browser.close();
  console.log(
    "PASS browser: RT-01..12 and NEG-01/03/07/09 automated portions: real IndexedDB, input resume, keyboard rename, labels/search, download, atomic import, isolated restore, capstone, legacy text, no artifact requests, doubled text/reflow. Physical iPad/VoiceOver NOT RUN.",
  );
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
