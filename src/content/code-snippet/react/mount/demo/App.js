import { mount } from "./utils";

export default function App() {
  const handleTestToast = () => {
    const instance = mount(
      "This is Toast Content",
      "fixed top-5 left-1/2 -translate-x-1/2 px-4 py-2 border border-black rounded-md",
    );

    setTimeout(() => {
      instance.unmount();
    }, 3000);
  };

  const handleTestDialog = () => {
    const instance = mount(
      <div>
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/60"></div>
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 bg-white h-1/2">
          dialog content
          <div className="absolute bottom-0 right-0 flex gap-4">
            <button
              onClick={() => instance.unmount()}
              className="px-2 py-1 border border-black rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={() => instance.unmount()}
              className="px-2 py-1 border border-black rounded-md"
            >
              OK
            </button>
          </div>
        </div>
      </div>,
      "",
    );
  };

  return (
    <div className="flex items-center justify-center min-h-svh gap-2">
      <button
        onClick={handleTestToast}
        className="px-2 py-1 border border-black rounded-md"
      >
        Test Toast
      </button>
      <button
        onClick={handleTestDialog}
        className="px-2 py-1 border border-black rounded-md"
      >
        Test Dialog
      </button>
    </div>
  );
}
