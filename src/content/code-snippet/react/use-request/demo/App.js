import { useRequest } from "./use-request";
import { getItem } from "./api";
import { useState } from "react";

const Test = () => {
  const { error, loading, data } = useRequest(getItem);

  if (loading) return "loading...";
  if (error) return "error";

  return JSON.stringify(data);
};

export default function App() {
  const [open, setOpen] = useState(false);

  const handleTest = () => {
    setOpen(!open);
  };

  return (
    <div>
      <button onClick={handleTest}>Test</button>
      {open && <Test />}
    </div>
  );
}
