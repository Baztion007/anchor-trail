"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";
import type { StyleValue } from "@/types/affiliate";

const STORAGE_KEY = "at:style";
const DEFAULT_STYLE: StyleValue = "all";

interface StyleContextValue {
  style: StyleValue;
  setStyle: (next: StyleValue) => void;
}

const StyleContext = createContext<StyleContextValue | null>(null);

function isStyleValue(value: unknown): value is StyleValue {
  return value === "all" || value === "cruise" || value === "backpacking";
}

/* ------------------------------------------------------------------ */
/* External store: localStorage-backed travel style                    */
/* ------------------------------------------------------------------ */

const listeners = new Set<() => void>();

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot(): StyleValue {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return isStyleValue(stored) ? stored : DEFAULT_STYLE;
  } catch {
    return DEFAULT_STYLE;
  }
}

function getServerSnapshot(): StyleValue {
  return DEFAULT_STYLE;
}

function setStoredStyle(next: StyleValue): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, next);
  } catch {
    /* storage unavailable (private mode) — keep in-memory value */
  }
  listeners.forEach((listener) => listener());
}

export function StyleProvider({ children }: { children: React.ReactNode }) {
  const style = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const setStyle = useCallback((next: StyleValue) => setStoredStyle(next), []);

  const value = useMemo(() => ({ style, setStyle }), [style, setStyle]);

  return <StyleContext.Provider value={value}>{children}</StyleContext.Provider>;
}

export function useTravelStyle(): StyleContextValue {
  const ctx = useContext(StyleContext);
  if (!ctx) {
    throw new Error("useTravelStyle must be used within a StyleProvider");
  }
  return ctx;
}
