import "./style.scss";

const bases: Record<string, string> = {
  blackTea: "#8B4513",
  greenTea: "#C8E6C9",
  coffee: "#6F4E37",
};

const creamers: Record<string, string> = {
  milk: "AliceBlue",
  cream: "#F5F5DC",
  half: "#FFFACD",
};

const syrups: Record<string, string> = {
  vanilla: "#FFEFD5",
  caramel: "#DAA520",
  hazelnut: "#6B4423",
};

function applyTemperature(input: HTMLInputElement) {
  const container = document.getElementById("condensation");
  if (!container) return;

  Array.from(container.children).forEach((child) => {
    (child as HTMLElement).className = input.value === "hot" ? "stream" : "flake";
  });
}

function applyBase(input: HTMLInputElement) {
  const baseDiv = document.querySelector<HTMLDivElement>(".base");
  if (!baseDiv) return;

  const color = bases[input.value];
  if (color) baseDiv.style.backgroundColor = color;
}

function applyCream(input: HTMLInputElement) {
  const creamElements = document.querySelectorAll<HTMLDivElement>(".foam");
  const color = creamers[input.value];
  if (!color) return;

  creamElements.forEach((element) => {
    element.style.backgroundColor = color;
  });
}

function applySyrup(input: HTMLInputElement) {
  const syrupDiv = document.querySelector<HTMLDivElement>(".syrup");
  if (!syrupDiv) return;

  const color = syrups[input.value];
  if (color) syrupDiv.style.setProperty("--syrup-color", color);
}

function setupListeners<T extends HTMLInputElement>(
  name: string,
  applyFn: (input: T) => void
) {
  const inputs = document.querySelectorAll<T>(`input[name="${name}"]`);

  inputs.forEach((input) => {
    input.addEventListener("change", () => applyFn(input));
  });

  const checked = document.querySelector<T>(`input[name="${name}"]:checked`);
  if (checked) applyFn(checked);
}

setupListeners("temperature", applyTemperature);
setupListeners("base", applyBase);
setupListeners("cream", applyCream);
setupListeners("syrup", applySyrup);
