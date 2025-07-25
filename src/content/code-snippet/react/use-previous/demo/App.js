import { usePrevious3 as usePrevious } from "./use-previous";
import { useState } from "react";

export default function App() {
  const [count, setCount] = useState(0);
  const previous = usePrevious(count);

  return (
    <div className="flex min-h-svh items-center justify-center gap-2">
      <div>
        <div>counter current value: {count}</div>
        <div>counter previous value: {previous}</div>
        <button
          type="button"
          onClick={() => setCount((c) => c + 1)}
          className="rounded-md border border-black px-2 py-1"
        >
          increase
        </button>
        <button
          type="button"
          className="ml-2 rounded-md border border-black px-2 py-1"
          onClick={() => setCount((c) => c - 1)}
        >
          decrease
        </button>
      </div>
    </div>
  );
}
