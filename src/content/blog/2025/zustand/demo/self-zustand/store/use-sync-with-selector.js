import {
  useRef,
  useEffect,
  useMemo,
  useDebugValue,
  useSyncExternalStore,
} from "react";

// Intentionally not using named imports because Rollup uses dynamic dispatch
// for CommonJS interop.

// Same as useSyncExternalStore, but supports selector and isEqual arguments.
export function useSyncExternalStoreWithSelector(
  subscribe,
  getSnapshot,
  getServerSnapshot,
  selector,
  isEqual,
) {
  // Use this to track the rendered snapshot.
  const instRef = useRef(null);
  let inst;
  if (instRef.current === null) {
    inst = {
      hasValue: false,
      value: null,
    };
    instRef.current = inst;
  } else {
    inst = instRef.current;
  }

  const [getSelection, getServerSelection] = useMemo(() => {
    // Track the memoized state using closure variables that are local to this
    // memoized instance of a getSnapshot function. Intentionally not using a
    // useRef hook, because that state would be shared across all concurrent
    // copies of the hook/component.
    let hasMemo = false;
    let memoizedSnapshot;
    let memoizedSelection;
    const memoizedSelector = (nextSnapshot) => {
      if (!hasMemo) {
        // The first time the hook is called, there is no memoized result.
        hasMemo = true;
        memoizedSnapshot = nextSnapshot;
        const nextSelection = selector(nextSnapshot);
        if (isEqual !== undefined) {
          // Even if the selector has changed, the currently rendered selection
          // may be equal to the new selection. We should attempt to reuse the
          // current value if possible, to preserve downstream memoizations.
          if (inst.hasValue) {
            const currentSelection = inst.value;
            if (isEqual(currentSelection, nextSelection)) {
              memoizedSelection = currentSelection;
              return currentSelection;
            }
          }
        }
        memoizedSelection = nextSelection;
        return nextSelection;
      }

      // We may be able to reuse the previous invocation's result.
      const prevSnapshot = memoizedSnapshot;
      const prevSelection = memoizedSelection;

      if (Object.is(prevSnapshot, nextSnapshot)) {
        // The snapshot is the same as last time. Reuse the previous selection.
        return prevSelection;
      }

      // The snapshot has changed, so we need to compute a new selection.
      const nextSelection = selector(nextSnapshot);

      // If a custom isEqual function is provided, use that to check if the data
      // has changed. If it hasn't, return the previous selection. That signals
      // to React that the selections are conceptually equal, and we can bail
      // out of rendering.
      if (isEqual !== undefined && isEqual(prevSelection, nextSelection)) {
        return prevSelection;
      }

      memoizedSnapshot = nextSnapshot;
      memoizedSelection = nextSelection;
      return nextSelection;
    };
    // Assigning this to a constant so that Flow knows it can't change.
    const maybeGetServerSnapshot =
      getServerSnapshot === undefined ? null : getServerSnapshot;
    const getSnapshotWithSelector = () => memoizedSelector(getSnapshot());
    const getServerSnapshotWithSelector =
      maybeGetServerSnapshot === null
        ? undefined
        : () => memoizedSelector(maybeGetServerSnapshot());
    return [getSnapshotWithSelector, getServerSnapshotWithSelector];
  }, [getSnapshot, getServerSnapshot, selector, isEqual]);

  const value = useSyncExternalStore(
    subscribe,
    getSelection,
    getServerSelection,
  );

  useEffect(() => {
    // $FlowFixMe[incompatible-type] changing the variant using mutation isn't supported
    inst.hasValue = true;
    // $FlowFixMe[incompatible-type]
    inst.value = value;
  }, [value]);

  useDebugValue(value);
  return value;
}
