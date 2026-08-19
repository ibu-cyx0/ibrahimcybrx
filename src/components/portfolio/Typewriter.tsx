import { useEffect, useState } from "react";

/** Types a single string once. */
export function Typewriter({ text, speed = 70 }: { text: string; speed?: number }) {
  const [n, setN] = useState(0);

  useEffect(() => {
    if (n >= text.length) return;
    const id = setTimeout(() => setN((v) => v + 1), speed);
    return () => clearTimeout(id);
  }, [n, text, speed]);

  return (
    <>
      {text.slice(0, n)}
      {n < text.length && <span className="cursor-blink">&nbsp;</span>}
    </>
  );
}

/** Cycles through phrases with a type / delete loop. */
export function RotatingText({ phrases }: { phrases: string[] }) {
  const [index, setIndex] = useState(0);
  const [len, setLen] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[index % phrases.length] ?? "";
    if (!deleting && len === current.length) {
      const id = setTimeout(() => setDeleting(true), 1600);
      return () => clearTimeout(id);
    }
    if (deleting && len === 0) {
      setDeleting(false);
      setIndex((i) => (i + 1) % phrases.length);
      return;
    }
    const id = setTimeout(() => setLen((l) => l + (deleting ? -1 : 1)), deleting ? 30 : 60);
    return () => clearTimeout(id);
  }, [len, deleting, index, phrases]);

  return (
    <span className="text-accent">
      {(phrases[index % phrases.length] ?? "").slice(0, len)}
      <span className="cursor-blink">&nbsp;</span>
    </span>
  );
}
