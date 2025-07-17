import { useEffect } from "react";
import { createEventEmitter } from "./create-event-emitter";

const emitter = createEventEmitter();

export default function App() {
  useEffect(() => {
    const handler = (...params) => {
      console.log(...params);
    };

    emitter.on("load", handler);

    return () => {
      emitter.off("load", handler);
    };
  }, []);

  const handleTrigger = () => {
    emitter.emit("load", { name: "bibi" });
  };

  return <button onClick={handleTrigger}>Test Trigger</button>;
}
