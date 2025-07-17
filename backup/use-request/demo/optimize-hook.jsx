import React, { useState } from "react";
import useRequest from "./useRequest";

function ajaxData() {
  const controller = new AbortController();
  const signal = controller.signal;
  const promise = fetch("https://jsonplaceholder.typicode.com/users", {
    signal,
  }).then((response) => response.json());
  return Object.assign(promise, {
    abort(...reset) {
      controller.abort(reset);
    },
  });
}

function App() {
  const { loading, data } = useRequest(ajaxData);

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
