import React, { useState } from "react";
import useRequest from "./useRequestFinal";

function ajaxData(params = {}) {
  const controller = new AbortController();
  const signal = controller.signal;
  const url = new URL("https://jsonplaceholder.typicode.com/comments");
  Object.keys(params).forEach((field) => {
    url.searchParams.set(field, params[field]);
  });
  const promise = fetch(url, {
    signal,
  }).then((response) => response.json());
  return Object.assign(promise, {
    abort(...reset) {
      controller.abort(reset);
    },
  });
}

function App() {
  const [params, setParams] = useState({
    postId: 1,
  });

  const { loading, data } = useRequest(ajaxData, params);

  if (loading) {
    return <>Loading...</>;
  }

  return (
    <>
      <div>
        <button
          className="px-2 py-1 border border-black rounded-md cursor-pointer"
          onClick={() => {
            setParams((pre) => ({ postId: pre.postId + 1 }));
          }}
        >
          differ params
        </button>
        <button
          className="px-2 py-1 border border-black rounded-md cursor-pointer"
          onClick={() => setParams({ postId: params.postId })}
        >
          same params
        </button>
      </div>
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
