import { mount } from "./utils";

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
