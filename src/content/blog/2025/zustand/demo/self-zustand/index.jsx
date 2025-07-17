import { useCounter } from "./store/counter";

function ClickButton() {
  const count = useCounter((state) => state.count);
  const increaseCount = useCounter((state) => state.increaseCount);

  console.log("useSyncExternalStore ClickButton render");

  return (
    <div>
      <span>{count}</span>
      <button
        className="px-2 py-1 border border-black rounded-md cursor-pointer"
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
  console.log("useSyncExternalStore CountCountry render");

  return (
    <div>
      <span>{country}</span>
      <button
        className="px-2 py-1 border border-black rounded-md cursor-pointer"
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
