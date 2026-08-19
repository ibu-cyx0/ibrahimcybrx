import { useEffect, useRef, useState, type ReactNode } from "react";

/** Fade-in-on-scroll wrapper. */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-visible={visible}
      style={{ transitionDelay: `${delay}ms` }}
      className={`reveal ${className}`}
    >
      {children}
    </div>
  );
}

/** Terminal chrome frame used around content cards. */
export function TerminalWindow({
  title,
  children,
  className = "",
  glass = true,
}: {
  title: string;
  children: ReactNode;
  className?: string;
  glass?: boolean;
}) {
  return (
    <div
      className={`overflow-hidden rounded-md ${glass ? "glass-card" : "border border-border bg-card/70"} ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-border bg-terminal/80 px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-destructive/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-primary/80" />
        <span className="ml-2 truncate font-mono text-xs text-muted-foreground">{title}</span>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

/** Terminal-command style tag chip. */
export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-sm border border-border bg-secondary/60 px-2 py-1 font-mono text-xs text-muted-foreground transition-colors hover:border-primary/60 hover:text-primary">
      <span className="mr-1 text-primary/70">$</span>
      {children}
    </span>
  );
}

/** Section heading with a terminal prompt prefix. */
export function SectionHeading({ index, title }: { index: string; title: string }) {
  return (
    <div className="mb-10">
      <p className="font-mono text-xs text-accent">
        <span className="text-primary">visitor@portfolio</span>:~$ cd ./{index}
      </p>
      <h2 className="mt-2 font-mono text-3xl font-bold tracking-tight sm:text-4xl">
        <span className="text-primary">&gt;</span> {title}
      </h2>
      <div className="mt-4 h-px w-24 bg-gradient-to-r from-primary to-transparent" />
    </div>
  );
}
