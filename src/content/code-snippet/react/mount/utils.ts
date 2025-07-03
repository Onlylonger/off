import { createRoot } from "react-dom/client";

export const mount = (component: React.ReactNode, className: string = "") => {
  const placeholder = document.createElement("div");
  const uuid = crypto.randomUUID();
  placeholder.id = uuid;
  placeholder.className = className;
  document.body.appendChild(placeholder);

  const root = createRoot(placeholder);

  root.render(component);

  return {
    unmount() {
      root.unmount();
      document.body.removeChild(placeholder);
    },
  };
};
