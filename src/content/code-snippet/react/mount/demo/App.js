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
        <div className="fixed top-0 right-0 bottom-0 left-0 bg-black/60"></div>
        <div className="fixed top-1/2 left-1/2 h-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2 bg-white">
          dialog content
          <div className="absolute right-0 bottom-0 flex gap-4">
            <button
              onClick={() => instance.unmount()}
              className="rounded-md border border-black px-2 py-1"
            >
              Cancel
            </button>
            <button
              onClick={() => instance.unmount()}
              className="rounded-md border border-black px-2 py-1"
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
    <div className="flex min-h-svh items-center justify-center gap-2">
      <button
        onClick={handleTestToast}
        className="rounded-md border border-black px-2 py-1"
      >
        Test Toast
      </button>
      <button
        onClick={handleTestDialog}
        className="rounded-md border border-black px-2 py-1"
      >
        Test Dialog
      </button>
    </div>
  );
}
