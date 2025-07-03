import { createRoot } from "react-dom/client";

const mount = (component: React.ReactNode, className: string = "") => {
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

export default function App() {
  const handleTest = () => {
    const instance = mount(
      "This is Toast Content",
      "fixed top-5 left-1/2 -translate-x-1/2 px-4 py-2 border border-black rounded-md",
    );

    setTimeout(() => {
      instance.unmount();
    }, 3000);
  };

  return <button onClick={handleTest}>Test</button>;
}
