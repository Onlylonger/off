import { useEffect, useRef } from "react";

// version1
export default function usePrevious(state) {
  const previousRef = useRef();
  const currentRef = useRef();

  useEffect(() => {
    previousRef.current = currentRef.current;
    currentRef.current = state;
  }, [state]);

  return previousRef.current;
}

// version2
export function usePrevious2(state) {
  const previousRef = useRef();
  const currentRef = useRef();

  previousRef.current = currentRef.current;
  currentRef.current = state;

  return previousRef.current;
}

// version3
export function usePrevious3(state) {
  const previousRef = useRef();
  const currentRef = useRef();

  if (!Object.is(currentRef.current, state)) {
    previousRef.current = currentRef.current;
    currentRef.current = state;
  }

  return previousRef.current;
}
