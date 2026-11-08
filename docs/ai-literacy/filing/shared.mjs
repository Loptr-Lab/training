export function element(tag, text = "", parent, attributes = {}) {
  const el = document.createElement(tag);
  el.textContent = text;
  for (const [k, v] of Object.entries(attributes)) el.setAttribute(k, v);
  parent?.append(el);
  return el;
}
export function download(data, name, type = "application/zip") {
  const url = URL.createObjectURL(new Blob([data], { type }));
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 60000);
}
const editing = new WeakMap();
export function rename(record, button, save, announce) {
  if (editing.has(button)) {
    editing.get(button).focus();
    return;
  }
  const form = element("form", "", button.parentElement);
  const label = element("label", "Name", form);
  const input = element("input", "", label, {
    type: "text",
    required: "",
    maxlength: "160",
  });
  editing.set(button, input);
  input.value = record.name;
  const done = element("button", "Done", form, { type: "submit" }),
    cancel = element("button", "Cancel", form, { type: "button" });
  button.hidden = true;
  input.focus();
  input.select();
  const close = () => {
    editing.delete(button);
    form.remove();
    button.hidden = false;
    button.focus();
  };
  cancel.onclick = close;
  form.onkeydown = (e) => {
    if (e.key === "Escape") {
      e.preventDefault();
      close();
    }
  };
  form.onsubmit = async (e) => {
    e.preventDefault();
    const name = input.value.trim();
    if (!name) {
      input.setCustomValidity("Enter a name.");
      input.reportValidity();
      return;
    }
    input.setCustomValidity("");
    done.disabled = true;
    try {
      const message = await save(name);
      close();
      announce(message || "Name updated.");
    } catch (e) {
      done.disabled = false;
      announce(e.message);
      button.hidden = false;
      button.focus();
    }
  };
}
