import { useState } from "react";

export const useClickOnce = (fn: Function) => {
  const [isDone, setIsDone] = useState(false);
  return (...args: any) => {
    if (!isDone) {
      setIsDone(false);
      fn(...args);
    }
  };
};
