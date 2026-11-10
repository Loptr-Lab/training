import { initial, validate, clone, now, fail } from "./model.mjs";
/* One versioned snapshot transaction keeps artifacts, labels and revision atomic.
   No server fallback. Resolve writes only on transaction completion. */
export function openStore(factory = globalThis.indexedDB) {
  let database;
  let opened;
  function databaseConnection() {
    if (opened) return opened;
    opened = new Promise((resolve, reject) => {
      if (!factory) {
        reject(new Error("IndexedDB unavailable. Export the working draft."));
        return;
      }
      const req = factory.open("pixie-creative-filing", 1);
      req.onupgradeneeded = () => req.result.createObjectStore("records");
      req.onerror = () => reject(req.error);
      req.onblocked = () =>
        reject(new Error("Close other Training tabs to open storage."));
      req.onsuccess = () => {
        database = req.result;
        database.onversionchange = () => database.close();
        resolve(database);
      };
    });
    opened.catch(() => {
      opened = null;
    });
    return opened;
  }
  let queue = Promise.resolve();
  async function transaction(change) {
    const db = await databaseConnection();
    return new Promise((resolve, reject) => {
      const tx = db.transaction("records", change ? "readwrite" : "readonly");
      const store = tx.objectStore("records");
      let result, error;
      const req = store.get("library");
      req.onsuccess = () => {
        try {
          const current = validate(req.result || initial());
          result = change ? change(clone(current)) : clone(current);
          if (change) {
            validate(result);
            store.put(result, "library");
          }
        } catch (e) {
          error = e;
          tx.abort();
        }
      };
      tx.oncomplete = () => resolve(clone(result));
      tx.onabort = () =>
        reject(error || tx.error || new Error("Storage transaction aborted."));
      tx.onerror = () => {};
    });
  }
  function mutate(change) {
    const run = queue.then(() => transaction(change));
    queue = run.catch(() => {});
    return run;
  }
  return {
    read: () => transaction(),
    commit: (expected, next) =>
      mutate((current) => {
        if (current.revision !== expected)
          fail(
            "Library changed in another tab. Review again; your working draft is retained.",
          );
        return { ...clone(next), revision: current.revision + 1 };
      }),
    save: (draft, expected) =>
      mutate((current) => {
        const old = current.artifacts.find((a) => a.id === draft.id);
        if ((old?.revision || 0) !== expected)
          fail(
            "Save conflict: another tab changed this work. Export your draft or keep a separate copy.",
          );
        const saved = clone(draft);
        saved.revision = expected + 1;
        saved.modified = old
          ? new Date(
              Math.max(Date.now(), Date.parse(old.modified)),
            ).toISOString()
          : saved.modified;
        const i = current.artifacts.findIndex((a) => a.id === draft.id);
        if (i < 0) current.artifacts.push(saved);
        else current.artifacts[i] = saved;
        current.revision++;
        return current;
      }),
  };
}
export class Draft {
  constructor(store, record, revision, onState = () => {}) {
    this.store = store;
    this.record = clone(record);
    this.revision = revision;
    this.onState = onState;
    this.generation = 0;
    this.durable = revision ? clone(record) : null;
    this.running = null;
    this.dirty = false;
  }
  edit(record) {
    this.record = clone(record);
    this.record.modified = new Date(
      Math.max(Date.now(), Date.parse(record.created)),
    ).toISOString();
    this.generation++;
    this.dirty = true;
    this.onState("Unsaved changes");
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.flush(), 500);
    if (!this.maxTimer) this.maxTimer = setTimeout(() => this.flush(), 2000);
  }
  async flush() {
    clearTimeout(this.timer);
    clearTimeout(this.maxTimer);
    this.maxTimer = null;
    if (this.running)
      return this.running.then(() => (this.dirty ? this.flush() : !this.error));
    if (!this.dirty) return !this.error;
    const generation = this.generation,
      snapshot = clone(this.record);
    this.onState("Saving");
    this.running = this.store
      .save(snapshot, this.revision)
      .then((state) => {
        const saved = state.artifacts.find((a) => a.id === snapshot.id);
        this.revision = saved.revision;
        this.durable = clone(saved);
        this.error = null;
        if (this.generation === generation) {
          this.record = clone(saved);
          this.dirty = false;
          this.onState("Saved on this device");
        }
        return true;
      })
      .catch((e) => {
        this.error = e;
        this.onState("Could not save", e.message);
        return false;
      })
      .finally(() => {
        this.running = null;
      });
    const ok = await this.running;
    if (ok && this.dirty) return this.flush();
    return ok;
  }
}
