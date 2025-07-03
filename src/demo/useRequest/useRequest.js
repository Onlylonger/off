import { useState, useEffect } from "react";

export const useFetcher = (promiseFn) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    setLoading(true);
    setError(null);
    const promise = promiseFn();

    promise
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setError(err);
        setLoading(false);
      });
    return () => {
      promise?.abortController?.abort();
    };
  }, []);

  return {
    data,
    loading,
    error,
  };
};
