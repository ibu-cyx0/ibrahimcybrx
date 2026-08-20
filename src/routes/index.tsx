import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  Download,
  Terminal,
  ShieldCheck,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import { toast } from "sonner";

import profileImg from "@/assets/profile-photo.jpg";
import resumeAsset from "@/assets/resume.pdf.asset.json";
import { MatrixRain } from "@/components/portfolio/MatrixRain";
import { Typewriter, RotatingText } from "@/components/portfolio/Typewriter";
import { Nav } from "@/components/portfolio/Nav";
import { Reveal, TerminalWindow, Tag, SectionHeading } from "@/components/portfolio/Primitives";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mohamed Ibrahim H — SOC Analyst & Cybersecurity Engineer" },
      {
        name: "description",
        content:
          "Portfolio of Mohamed Ibrahim H, Cybersecurity Engineer and SOC Analyst in Tamil Nadu, India. Splunk, Wazuh, threat hunting, Zero Trust and blue team projects.",
      },
      { property: "og:title", content: "Mohamed Ibrahim H — SOC Analyst & Threat Hunter" },
      {
        property: "og:description",
        content:
          "Blue team portfolio: CTI automation, AI-powered SOC alert triage, Zero Trust lab. TryHackMe Top 5% global.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Portfolio,
});

const SKILLS = [
  { cat: "SIEM & Monitoring", items: ["splunk", "log-analysis", "alert-triage"] },
  { cat: "Network Security", items: ["pfsense", "wireshark", "ids/ips"] },
  { cat: "Threat Intelligence", items: ["alienvault-otx", "abuseipdb", "urlhaus"] },
  { cat: "Frameworks", items: ["nist-sp-800-207", "mitre-att&ck", "zero-trust"] },
  { cat: "Tools", items: ["wazuh", "cyberops-stack", "nmap"] },
  {
    cat: "Soft Skills",
    items: ["incident-response", "sec-awareness-training", "150+student-seminar"],
  },
];

const CERTS = [
  { name: "Certified SOC Analyst (CSA)", org: "EC-Council" },
  { name: "Ethical Hacking Essentials (EHE)", org: "EC-Council" },
  { name: "Splunk Core Certified User", org: "Splunk" },
  { name: "CyberOps Associate", org: "Cisco" },
];

const PROJECTS = [
  {
    file: "cti_automation.md",
    title: "CTI Automation Platform",
    short:
      "Threat intel pipeline pulling indicators from AlienVault OTX, AbuseIPDB and URLhaus into Splunk.",
    detail:
      "Automated ingestion of IOCs on a schedule, normalisation into a lookup layer, and correlation searches in Splunk that raise alerts when internal telemetry matches known-bad infrastructure. Cuts manual enrichment time during triage.",
    stack: ["python", "splunk", "otx-api", "abuseipdb", "urlhaus"],
    repo: "https://github.com/ibu-cyx0/CTI-Automation-Platform",
  },
  {
    file: "ai_alert_triage.md",
    title: "AI-Powered SOC Alert Triage",
    short: "Random Forest model that prioritises SOC alerts and reduces analyst fatigue.",
    detail:
      "Trained on labelled alert data with feature engineering across source reputation, asset criticality and alert frequency. Outputs a priority score so analysts work the queue by real risk instead of raw timestamp order.",
    stack: ["python", "scikit-learn", "random-forest", "pandas"],
    repo: "https://github.com/ibu-cyx0/AI-Powered-Threat-Detection-Engine",
  },
  {
    file: "zero_trust_lab.md",
    title: "Zero Trust Network Simulation Lab",
    short: "Full Zero Trust architecture built on pfSense and Wazuh following NIST SP 800-207.",
    detail:
      "Segmented lab network with policy enforcement points, identity-aware access rules, continuous monitoring through Wazuh agents, and logging pipelines validating each of the NIST SP 800-207 tenets against simulated attacks.",
    stack: ["pfsense", "wazuh", "nist-800-207", "vlan-segmentation"],
    repo: "https://github.com/ibu-cyx0/Zero-Trust-Network-Simulation-Lab",
  },
];

function Portfolio() {
  return (
    <div className="relative min-h-screen scanlines">
      <MatrixRain />
      <Nav />
      <main className="mx-auto max-w-6xl px-5 pt-28">
        <Hero />
        <About />
        <Education />
        <Experience />
        <Certifications />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section id="home" className="grid-bg -mx-5 px-5 py-16 sm:py-24">
      <div className="flex flex-col items-center text-center">
        <div className="relative">
          <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-primary to-accent opacity-40 blur-xl" />
          <img
            src={profileImg}
            width={768}
            height={768}
            alt="Mohamed Ibrahim H"
            className="relative h-36 w-36 rounded-full border-2 border-primary object-cover glow-neon sm:h-44 sm:w-44"
          />
        </div>

        <p className="mt-8 font-mono text-xs text-muted-foreground sm:text-sm">
          <span className="text-primary">visitor@portfolio</span>:~$ whoami
        </p>
        <h1 className="mt-3 font-mono text-4xl font-bold tracking-tight sm:text-6xl">
          <Typewriter text="Mohamed Ibrahim H" />
        </h1>
        <p className="mt-4 font-mono text-base sm:text-xl">
          <RotatingText
            phrases={["SOC Analyst", "Blue Team Enthusiast", "Threat Hunter"]}
          />
        </p>
        <p className="mt-5 max-w-xl text-sm text-muted-foreground sm:text-base">
          Securing networks, hunting threats, defending the perimeter.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href="#projects"
            className="rounded-sm border border-primary bg-primary/10 px-5 py-2.5 font-mono text-sm text-primary transition-all hover:bg-primary/20 hover:glow-neon"
          >
            ./view_projects.sh
          </a>
          <a
            href="/resume.pdf"
            download
            className="inline-flex items-center gap-2 rounded-sm border border-accent bg-accent/10 px-5 py-2.5 font-mono text-sm text-accent transition-all hover:bg-accent/20 hover:glow-cyan"
          >
            <Download size={14} /> ./download_resume.sh
          </a>
        </div>

        <Reveal className="mt-10 w-full max-w-md" delay={200}>
          <div className="glass-card rounded-md p-4">
            <div className="flex items-center justify-center gap-3">
              <ShieldCheck className="text-primary" size={20} />
              <div className="text-left font-mono text-xs sm:text-sm">
                <p className="text-primary">TryHackMe · Top 5% Global</p>
                <p className="text-muted-foreground">@IbrahimCyb3r4 · 30+ rooms completed</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="py-20">
      <Reveal>
        <SectionHeading index="about" title="About" />
      </Reveal>
      <div className="grid gap-6 md:grid-cols-2">
        <Reveal>
          <TerminalWindow title="bio.txt" className="h-full">
            <p className="text-sm leading-relaxed text-muted-foreground">
              Recent B.E. Cybersecurity Engineering graduate from Paavai Engineering College,
              Namakkal, actively pursuing SOC Analyst and Blue Team roles in Chennai and
              Bangalore. Passionate about hands-on defensive security, log analysis and threat
              detection — building labs, breaking them, and then instrumenting them until nothing
              moves unseen.
            </p>
          </TerminalWindow>
        </Reveal>
        <Reveal delay={120}>
          <TerminalWindow title="whoami --facts" className="h-full">
            <dl className="space-y-3 font-mono text-sm">
              {[
                ["location", "Tamil Nadu, India"],
                ["focus_area", "SOC Ops · Blue Team · Threat Hunting"],
                ["status", "Actively job hunting"],
                ["certifications", "4"],
              ].map(([k, v]) => (
                <div key={k} className="flex flex-wrap gap-2">
                  <dt className="text-primary">{k}:</dt>
                  <dd className="text-muted-foreground">{v}</dd>
                </div>
              ))}
            </dl>
          </TerminalWindow>
        </Reveal>
      </div>
    </section>
  );
}

function Education() {
  return (
    <section id="education" className="py-20">
      <Reveal>
        <SectionHeading index="education" title="Education" />
      </Reveal>
      <Reveal>
        <TerminalWindow title="cat education.log">
          <div className="space-y-2 font-mono text-sm">
            <p className="text-muted-foreground">
              <span className="text-accent">[2021-08]</span>{" "}
              <span className="text-primary">&gt; PROGRAM_STARTED</span> — B.E. Cybersecurity
              Engineering
            </p>
            <p className="text-muted-foreground">
              <span className="text-accent">[institution]</span> Paavai Engineering College,
              Namakkal
            </p>
            <p className="text-muted-foreground">
              <span className="text-accent">[2025-05]</span>{" "}
              <span className="text-primary">&gt; GRADUATED</span> — status: exit code 0
            </p>
          </div>
        </TerminalWindow>
      </Reveal>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="py-20">
      <Reveal>
        <SectionHeading index="experience" title="Experience" />
      </Reveal>
      <Reveal>
        <TerminalWindow title="tail -f experience.log">
          <div className="relative border-l border-border pl-6">
            <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-primary glow-neon" />
            <p className="font-mono text-xs text-accent">
              [2026-01] <span className="text-primary">&gt; INTERNSHIP_STARTED</span>
            </p>
            <h3 className="mt-2 font-mono text-lg font-semibold">SOC Analyst Intern — The Mind IT</h3>
            <p className="font-mono text-xs text-muted-foreground">
              Jan 2026 – Apr 2026 · ~4 months
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Hands-on SOC operations experience: alert triage, continuous log monitoring across
              network and endpoint sources, and incident response support alongside senior
              analysts.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {["alert-triage", "log-monitoring", "incident-response"].map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
            <p className="mt-4 font-mono text-xs text-accent">
              [2026-04] <span className="text-primary">&gt; INTERNSHIP_COMPLETED</span>
            </p>
          </div>
        </TerminalWindow>
      </Reveal>
    </section>
  );
}

function Certifications() {
  return (
    <section id="certifications" className="py-20">
      <Reveal>
        <SectionHeading index="certifications" title="Certifications" />
      </Reveal>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {CERTS.map((c, i) => (
          <Reveal key={c.name} delay={i * 90}>
            <div className="glass-card h-full rounded-md p-5">
              <ShieldCheck className="text-primary" size={22} />
              <h3 className="mt-4 font-mono text-sm font-semibold">{c.name}</h3>
              <p className="mt-1 font-mono text-xs text-muted-foreground">{c.org}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="py-20">
      <Reveal>
        <SectionHeading index="skills" title="Skills" />
      </Reveal>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {SKILLS.map((group, i) => (
          <Reveal key={group.cat} delay={i * 80}>
            <div className="glass-card h-full rounded-md p-5">
              <h3 className="font-mono text-sm text-accent">
                <span className="text-primary">#</span> {group.cat}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((s) => (
                  <Tag key={s}>{s}</Tag>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Projects() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section id="projects" className="py-20">
      <Reveal>
        <SectionHeading index="projects" title="Projects" />
      </Reveal>
      <div className="grid gap-6 lg:grid-cols-3">
        {PROJECTS.map((p, i) => {
          const expanded = open === p.file;
          return (
            <Reveal key={p.file} delay={i * 100}>
              <TerminalWindow title={`cat ${p.file}`} className="h-full">
                <h3 className="font-mono text-base font-semibold text-primary">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.short}</p>
                {expanded && (
                  <p className="mt-3 border-l border-primary/50 pl-3 text-sm leading-relaxed text-muted-foreground">
                    {p.detail}
                  </p>
                )}
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.stack.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
                <div className="mt-5 flex items-center justify-between font-mono text-xs">
                  <button
                    onClick={() => setOpen(expanded ? null : p.file)}
                    className="inline-flex items-center gap-1 text-primary hover:underline"
                  >
                    <ChevronRight
                      size={14}
                      className={expanded ? "rotate-90 transition-transform" : "transition-transform"}
                    />
                    {expanded ? "collapse" : "view details"}
                  </button>
                  <a
                    href={p.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-muted-foreground hover:text-accent"
                  >
                    <Github size={14} /> repo
                  </a>
                </div>
              </TerminalWindow>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <section id="contact" className="py-20">
      <Reveal>
        <SectionHeading index="contact" title="Contact" />
      </Reveal>
      <div className="grid gap-6 md:grid-cols-2">
        <Reveal>
          <TerminalWindow title="./send_message.sh">
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
                toast.success("Message queued — I'll get back to you soon.");
              }}
            >
              {[
                { id: "name", label: "--name", type: "text" },
                { id: "email", label: "--email", type: "email" },
              ].map((f) => (
                <div key={f.id}>
                  <label htmlFor={f.id} className="font-mono text-xs text-primary">
                    {f.label}
                  </label>
                  <input
                    id={f.id}
                    type={f.type}
                    required
                    className="mt-1 w-full rounded-sm border border-input bg-background/60 px-3 py-2 font-mono text-sm outline-none focus:border-primary focus:glow-neon"
                  />
                </div>
              ))}
              <div>
                <label htmlFor="message" className="font-mono text-xs text-primary">
                  --message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  required
                  className="mt-1 w-full rounded-sm border border-input bg-background/60 px-3 py-2 font-mono text-sm outline-none focus:border-primary focus:glow-neon"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-sm border border-primary bg-primary/10 px-4 py-2.5 font-mono text-sm text-primary transition-all hover:bg-primary/20 hover:glow-neon"
              >
                execute ./send_message.sh
              </button>
              {sent && (
                <p className="font-mono text-xs text-accent">
                  &gt; message sent · exit code 0
                </p>
              )}
            </form>
          </TerminalWindow>
        </Reveal>

        <Reveal delay={120}>
          <TerminalWindow title="contact_info.json" className="h-full">
            <ul className="space-y-4 font-mono text-sm">
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-primary" />
                <a href="mailto:ibrahim.cybrx@gmail.com" className="text-muted-foreground hover:text-accent">
                  ibrahim.cybrx@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Linkedin size={16} className="text-primary" />
                <a
                  href="https://www.linkedin.com/in/mohamed-ibrahim-h-585b92282/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted-foreground hover:text-accent"
                >
                  linkedin.com/in/mohamed-ibrahim-h
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Github size={16} className="text-primary" />
                <a
                  href="https://github.com/ibu-cyx0"
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted-foreground hover:text-accent"
                >
                  github.com/ibu-cyx0
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Terminal size={16} className="text-primary" />
                <a
                  href="https://tryhackme.com/p/IbrahimCyb3r4"
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted-foreground hover:text-accent"
                >
                  tryhackme.com/p/IbrahimCyb3r4
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin size={16} className="text-primary" />
                <span className="text-muted-foreground">
                  Tamil Nadu, India · open to Chennai / Bangalore
                </span>
              </li>
            </ul>
            <a
              href="/resume.pdf"
              download
              className="mt-6 inline-flex items-center gap-2 rounded-sm border border-accent bg-accent/10 px-4 py-2 font-mono text-xs text-accent transition-all hover:bg-accent/20 hover:glow-cyan"
            >
              <Download size={14} /> download_resume.pdf
              <ExternalLink size={12} />
            </a>
          </TerminalWindow>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="mt-10 border-t border-border py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-5 sm:flex-row sm:justify-between">
        <div className="flex gap-4">
          <a href="https://github.com/ibu-cyx0" target="_blank" rel="noreferrer" aria-label="GitHub" className="text-muted-foreground hover:text-primary">
            <Github size={18} />
          </a>
          <a href="https://www.linkedin.com/in/mohamed-ibrahim-h-585b92282/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary">
            <Linkedin size={18} />
          </a>
          <a href="https://tryhackme.com/p/IbrahimCyb3r4" target="_blank" rel="noreferrer" aria-label="TryHackMe" className="text-muted-foreground hover:text-primary">
            <Terminal size={18} />
          </a>
        </div>
        <p className="font-mono text-xs text-muted-foreground">
          © {new Date().getFullYear()} Mohamed Ibrahim H · Built with 🖤 and caffeine
        </p>
      </div>
    </footer>
  );
}
