import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  // function useCustomHook() {
  //   function action() {}

  //   return { action };
  // }

  function transition(newMode, replace = false) {
    if (replace) {
      setHistory((prev) => [...prev.slice(0, prev.length - 1), newMode]);
    } else {
      setHistory((prev) => [...prev, newMode])
    }
  }

  function back() {
    setHistory((prev) => [...prev.slice(0, prev.length - 1)]);
    // setHistory(history.pop());
  }

  return { mode: history[history.length - 1], transition, back };
}
