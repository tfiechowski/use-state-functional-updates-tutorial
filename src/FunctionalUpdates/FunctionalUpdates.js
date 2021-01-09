import { useCallback, useState } from "react";
import { wait } from "./wait";

function increment(value) {
  return value + 1;
}

export function FunctionalUpdates() {
  const [counter, setCounter] = useState(0);

  function handleIncrement() {
    setCounter(counter + 1);
  }

  async function handleIncrementAsynchronously() {
    await wait({ miliseconds: 2000 });
    setCounter(counter + 1);
  }

  const handleIncrementCallback = useCallback(async () => {
    await wait({ miliseconds: 2000 });
    setCounter(counter + 1);
  }, [counter, setCounter]);

  async function handleIncrementFunctional() {
    await wait({ miliseconds: 2000 });
    setCounter(increment);
  }

  return (
    <div className="FunctionalUpdates">
      <h4>
        Counter value: <span data-testid="counter-value">{counter}</span>
      </h4>
      <button
        className="btn btn-lg btn-primary"
        data-testid="btn-increment"
        onClick={handleIncrement}
      >
        Increment
      </button>
      <button
        className="btn btn-lg btn-secondary"
        data-testid="btn-increment-async"
        onClick={handleIncrementAsynchronously}
      >
        Increment asynchronously
      </button>
      <button
        className="btn btn-lg btn-danger"
        data-testid="btn-increment-callback"
        onClick={handleIncrementCallback}
      >
        Increment useCallback
      </button>
      <button
        className="btn btn-lg btn-success"
        data-testid="btn-increment-functional"
        onClick={handleIncrementFunctional}
      >
        Increment functionally
      </button>
    </div>
  );
}
