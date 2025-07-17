import React, { useEffect, useRef, useState } from "react";

async function ajaxData() {
  return fetch("https://jsonplaceholder.typicode.com/users").then((response) =>
    response.json(),
  );
}

function App() {
  const unMountedRef = useRef();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    setLoading(true);
    unMountedRef.current = false;
    const promise = ajaxData();

    promise
      .then((res) => {
        if (!unMountedRef.current) {
          setData(res);
          console.log("optimize res", res);
        }
      })
      .finally(() => {
        if (!unMountedRef.current) {
          console.log("optimize finally");
        }
        setLoading(false);
      });

    return () => {
      unMountedRef.current = true;
    };
  }, []);

  if (loading) {
    return <>Loading...</>;
  }

  return (
    <>
      Main Content
      <div>
        {data.map((v) => (
          <div key={v.id}>{v.name}</div>
        ))}
      </div>
    </>
  );
}

export default function Root() {
  const [key, setKey] = useState(0);

  return (
    <div style={{ position: "relative" }}>
      <App key={key} />
      <div style={{ position: "absolute", right: 0, top: 0 }}>
        <button
          className="px-2 py-1 border border-black rounded-md cursor-pointer"
          onClick={() => setKey((pre) => pre + 1)}
        >
          refresh
        </button>
      </div>
    </div>
  );
}
