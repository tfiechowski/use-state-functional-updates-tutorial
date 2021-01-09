import { act, fireEvent, render } from "@testing-library/react";
import { FunctionalUpdates } from "./FunctionalUpdates";

function renderComponent() {
  const { getByTestId } = render(<FunctionalUpdates />);

  function increment() {
    fireEvent.click(getByTestId("btn-increment"));
  }

  function incrementAsynchronously() {
    fireEvent.click(getByTestId("btn-increment-async"));
  }
  function incrementUseCallback() {
    fireEvent.click(getByTestId("btn-increment-callback"));
  }
  function incrementFunctionally() {
    fireEvent.click(getByTestId("btn-increment-functional"));
  }

  function getCounterValue() {
    return Number(getByTestId("counter-value").textContent);
  }

  async function advanceTimersByTime(time) {
    await act(async () => {
      await jest.advanceTimersByTime(time);
    });
  }

  return {
    increment,
    incrementAsynchronously,
    incrementUseCallback,
    incrementFunctionally,
    getCounterValue,
    advanceTimersByTime,
  };
}

describe("Functional updates", () => {
  describe("Synchronous increment", () => {
    it("should increment the counter synchronously", async () => {
      const { increment, getCounterValue } = renderComponent();

      expect(getCounterValue()).toBe(0);

      increment();

      expect(getCounterValue()).toBe(1);
    });
  });

  describe("Asynchronous increment", () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    it("should not count plain async increment properly", async () => {
      const {
        increment,
        incrementAsynchronously,
        getCounterValue,
        advanceTimersByTime,
      } = renderComponent();

      expect(getCounterValue()).toBe(0);

      increment();
      incrementAsynchronously();
      increment();
      incrementAsynchronously();
      increment();

      await act(async () => {
        await advanceTimersByTime(5000);
      });

      expect(getCounterValue()).toBe(3);
    });

    it("should not count plain useCallback increment properly", async () => {
      const {
        increment,
        incrementUseCallback,
        getCounterValue,
        advanceTimersByTime,
      } = renderComponent();

      expect(getCounterValue()).toBe(0);

      increment();
      incrementUseCallback();
      increment();
      incrementUseCallback();
      increment();

      await act(async () => {
        await advanceTimersByTime(5000);
      });

      expect(getCounterValue()).toBe(3);
    });

    it("should count functional update properly", async () => {
      const {
        increment,
        incrementFunctionally,
        getCounterValue,
        advanceTimersByTime,
      } = renderComponent();

      expect(getCounterValue()).toBe(0);

      increment();
      incrementFunctionally();
      increment();
      incrementFunctionally();
      increment();

      await act(async () => {
        await advanceTimersByTime(5000);
      });

      expect(getCounterValue()).toBe(5);
    });
  });
});
