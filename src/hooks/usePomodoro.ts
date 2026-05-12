import { useState, useEffect, useCallback, useRef } from "react";
import { useUserLocalStorage } from "./useUserLocalStorage";

type Mode = "focus" | "break";
const TIMES: Record<Mode, number> = { focus: 25 * 60, break: 5 * 60 };

export function usePomodoro() {
  const [mode, setMode] = useState<Mode>("focus");
  const [seconds, setSeconds] = useState(TIMES.focus);
  const [running, setRunning] = useState(false);
  const [sessions, setSessions] = useUserLocalStorage<number>(
    "pomodoro-sessions",
    0,
  );

  const secondsRef = useRef(seconds);
  const modeRef = useRef(mode);

  // Sync refs after render
  useEffect(() => { secondsRef.current = seconds; }, [seconds]);
  useEffect(() => { modeRef.current = mode; }, [mode]);

  useEffect(() => {
    if (!running) return;

    const id = setInterval(() => {
      const s = secondsRef.current - 1;
      if (s > 0) {
        setSeconds(s);
      } else {
        clearInterval(id);
        const wasFocus = modeRef.current === "focus";
        const next: Mode = wasFocus ? "break" : "focus";
        setRunning(false);
        if (wasFocus) setSessions((n) => n + 1);
        setMode(next);
        setSeconds(TIMES[next]);
      }
    }, 1000);

    return () => clearInterval(id);
  }, [running, setSessions]);

  const toggle = useCallback(() => setRunning((r) => !r), []);

  const reset = useCallback(() => {
    setRunning(false);
    setSeconds(TIMES[mode]);
  }, [mode]);

  const switchMode = useCallback((m: Mode) => {
    setMode(m);
    setRunning(false);
    setSeconds(TIMES[m]);
  }, []);

  const fmt = (s: number) =>
    `${Math.floor(s / 60)
      .toString()
      .padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;

  const progress = 100 - (seconds / TIMES[mode]) * 100;

  return {
    mode,
    seconds,
    running,
    sessions,
    progress,
    toggle,
    reset,
    switchMode,
    fmt,
  };
}