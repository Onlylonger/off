import { usePrevious3 as usePrevious } from "./use-previous";
import { useState } from "react";

export default function App() {
  const [count, setCount] = useState(0);
  const previous = usePrevious(count);

  return (
    <div className="flex items-center justify-center min-h-svh gap-2">
      <div>
        <div>counter current value: {count}</div>
        <div>counter previous value: {previous}</div>
        <button
          type="button"
          onClick={() => setCount((c) => c + 1)}
          className="px-2 py-1 border border-black rounded-md"
        >
          increase
        </button>
        <button
          type="button"
          className="px-2 py-1 border border-black rounded-md ml-2"
          onClick={() => setCount((c) => c - 1)}
        >
          decrease
        </button>
      </div>
    </div>
  );
}
