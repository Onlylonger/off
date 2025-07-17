import React, { useEffect, useState } from "react";

function ajaxData() {
  return fetch("https://jsonplaceholder.typicode.com/users").then((response) =>
    response.json(),
  );
}

function App() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    setLoading(true);
    ajaxData()
      .then((res) => {
        setData(res);
        console.log("no optimize res", res);
      })
      .finally(() => {
        console.log("no optimize finally");
        setLoading(false);
      });
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
