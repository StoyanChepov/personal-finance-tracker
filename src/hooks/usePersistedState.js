import { useState, useEffect } from "react";

export default function usePersistedState(key, defaultValue) {
  const [state, setState] = useState(() => {
    const persistedState = localStorage.getItem(key);
    return persistedState ? JSON.parse(persistedState) : defaultValue;
  });

  const updateState = (newState) => {
    if (newState === null || newState === undefined) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(newState));
    }
    setState(newState);
  };
  return [state, updateState];
}
