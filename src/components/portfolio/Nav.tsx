import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const LINKS = [
  { id: "home", label: "home" },
  { id: "about", label: "about" },
  { id: "education", label: "education" },
  { id: "experience", label: "experience" },
  { id: "certifications", label: "certs" },
  { id: "skills", label: "skills" },
  { id: "projects", label: "projects" },
  { id: "contact", label: "contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    LINKS.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <a href="#home" className="font-mono text-sm font-bold">
          <span className="text-primary">ibrahim</span>
          <span className="text-muted-foreground">@soc</span>
          <span className="text-accent">:~$</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                className={`rounded-sm px-3 py-1.5 font-mono text-xs transition-colors ${
                  active === l.id
                    ? "bg-secondary text-primary"
                    : "text-muted-foreground hover:text-accent"
                }`}
              >
                <span className="text-primary/60">&gt;</span> {l.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          className="rounded-sm border border-border p-2 text-primary md:hidden"
        >
          {open ? <X size={16} /> : <Menu size={16} />}
        </button>
      </nav>

      {open && (
        <ul className="border-t border-border bg-background/95 px-5 py-3 md:hidden">
          {LINKS.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                onClick={() => setOpen(false)}
                className="block py-2 font-mono text-sm text-muted-foreground hover:text-primary"
              >
                <span className="text-primary/60">&gt;</span> {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
