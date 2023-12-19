"use client";

import { useState, useEffect } from "react";

export function useLocalStorageState(initialState: any, key: string) {
  const [value, setValue] = useState(() => {
    if (typeof localStorage !== "undefined") {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : initialState;
    }
    return null;
  });

  useEffect(
    () => localStorage.setItem(key, JSON.stringify(value)),
    [value, key]
  );

  return [value, setValue];
}
