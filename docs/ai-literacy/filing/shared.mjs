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
export function rename(record, button, save, announce) {
  const form = element("form", "", button.parentElement);
  const label = element("label", "Name", form);
  const input = element("input", "", label, {
    type: "text",
    required: "",
    maxlength: "160",
  });
  input.value = record.name;
  const done = element("button", "Done", form, { type: "submit" }),
    cancel = element("button", "Cancel", form, { type: "button" });
  button.hidden = true;
  input.focus();
  input.select();
  const close = () => {
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
      await save(name);
      close();
      announce("Name updated.");
    } catch (e) {
      done.disabled = false;
      announce(e.message);
      button.hidden = false;
      button.focus();
    }
  };
}
