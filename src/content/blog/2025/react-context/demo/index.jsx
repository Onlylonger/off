import React from "react";
import { CounterProvider, useCounter } from "./store/counter";

function ClickButton() {
  const { count, increaseCount } = useCounter();

  return (
    <div>
      <span>{count}</span>
      <button
        className="cursor-pointer rounded-md border border-black px-2 py-1"
        onClick={() => increaseCount()}
      >
        Increase Count
      </button>
    </div>
  );
}

function App() {
  return (
    <CounterProvider initialState={1}>
      <ClickButton />
    </CounterProvider>
  );
}

export default App;
