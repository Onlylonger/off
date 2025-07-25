import { useCompareEffect2 as useCompareEffect } from "./use-compare-effect";
import { useState, useRef, useEffect } from "react";

export default function App() {
  const [count, setCount] = useState(0);
  const effectCountRef = useRef(0);
  const deepCompareCountRef = useRef(0);

  useEffect(() => {
    effectCountRef.current += 1;
  }, [{}]);

  useCompareEffect(() => {
    deepCompareCountRef.current += 1;
    return () => {
      // do something
    };
  }, [{}]);

  return (
    <div className="flex min-h-svh items-center justify-center gap-2">
      <div>
        <p>effectCount: {effectCountRef.current}</p>
        <p>deepCompareCount: {deepCompareCountRef.current}</p>
        <p>
          <button
            type="button"
            onClick={() => setCount((c) => c + 1)}
            className="rounded-md border border-black px-2 py-1"
          >
            reRender
          </button>
        </p>
      </div>
    </div>
  );
}
