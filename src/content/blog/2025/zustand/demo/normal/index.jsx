import { useCounter } from "./store/counter";

function ClickButton() {
  const count = useCounter((state) => state.count);
  const increaseCount = useCounter((state) => state.increaseCount);
  console.log("Zustand ClickButton render");

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

function CountCountry() {
  const country = useCounter((state) => state.country);
  const updateCountry = useCounter((state) => state.updateCountry);
  console.log("Zustand CountCountry render");

  return (
    <div>
      <span>{country}</span>
      <button
        className="cursor-pointer rounded-md border border-black px-2 py-1"
        onClick={() => updateCountry(`${Math.random()}`)}
      >
        updateCountry
      </button>
    </div>
  );
}

export default function App() {
  return (
    <>
      <ClickButton />
      <CountCountry />
    </>
  );
}
