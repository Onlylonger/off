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
    <div className="flex items-center justify-center min-h-svh gap-2">
      <div>
        <p>effectCount: {effectCountRef.current}</p>
        <p>deepCompareCount: {deepCompareCountRef.current}</p>
        <p>
          <button
            type="button"
            onClick={() => setCount((c) => c + 1)}
            className="px-2 py-1 border border-black rounded-md"
          >
            reRender
          </button>
        </p>
      </div>
    </div>
  );
}
