# Cyber Nexus

Build a modern, dark "hacker-terminal" themed portfolio website for Mohamed Ibrahim H, a Cybersecurity Engineer / SOC Analyst based in Tamil Nadu, India. Include a placeholder profile picture area (circular, with a glowing neon border effect) at the top of the Home/Hero section.

Overall Style & Design Direction:

Dark mode by default (near-black background: #0a0e14 or similar), with neon green (#00ff41 "Matrix" green) and cyan/electric blue accents

Monospace typography for headers and code-like elements (JetBrains Mono, Fira Code, or Space Mono via Google Fonts) paired with a clean sans-serif for body text

Terminal/CLI-inspired UI elements: blinking cursor effects, typewriter text animation for the hero tagline, terminal window frames around content cards

Subtle background effects: matrix-style falling code rain (low opacity, non-distracting), scanline overlay, or grid pattern

Glassmorphism cards with green/cyan glow borders on hover

Smooth scroll animations, fade-ins on scroll

Badge/chip style tags for skills and tools (like terminal command tags: nmap, splunk, wireshark)

Site Structure:

1. Hero / Home Section

Profile picture with glowing ring

Typewriter-animated headline: "Mohamed Ibrahim H" followed by rotating text: "SOC Analyst | Blue Team Enthusiast | Threat Hunter"

Short tagline: "Securing networks, hunting threats, defending the perimeter."

CTA buttons: "View Projects" and "Download Resume" styled like terminal commands (e.g., ./view_projects.sh)

TryHackMe Top 5% Global badge displayed prominently (handle: IbrahimCyb3r4, 30+ rooms completed)

2. About Section

Bio: Recent B.E. Cybersecurity Engineering graduate from Paavai Engineering College, Namakkal, actively pursuing SOC Analyst and Blue Team roles in Chennai and Bangalore. Passionate about hands-on defensive security, log analysis, and threat detection.

Include a "whoami" terminal-style card listing quick facts: Location, Focus Area, Current Status (Actively job hunting), Certifications count, and a highlight line for 1st Place — National Cyber Olympiad 2024

3. Education

B.E. Cybersecurity Engineering — Paavai Engineering College, Namakkal

Present as a terminal log/timeline format.

4. Experience

SOC Analyst Intern — The Mind IT (Jan 2026 – Apr 2026, ~4 months)

Brief description: Hands-on SOC operations experience, alert triage, log monitoring, and incident response support

Present as a timeline with terminal-log styling ([2026-01] > INTERNSHIP_STARTED)

5. Certifications

EC-Council CSA (Certified SOC Analyst)

EC-Council EHE (Ethical Hacking Essentials)

Splunk Core Certified User

Cisco CyberOps Associate

Display as badge/card grid with icons

6. Skills

Group into categories with terminal-tag styling:

SIEM & Monitoring: Splunk, log analysis, alert triage

Network Security: pfSense, Wireshark, IDS/IPS

Threat Intelligence: AlienVault OTX, AbuseIPDB, URLhaus

Frameworks: NIST SP 800-207 (Zero Trust), MITRE ATT&CK

Tools: Wazuh, CyberOps stack

Soft skills: incident response, social engineering awareness training (delivered seminar to 150+ students)

7. Portfolio / Projects
Feature 3 flagship projects as terminal-window styled cards, each with a "cat project.md" reveal-on-click feel:

CTI Automation Platform — Threat intel integration pulling from AlienVault OTX, AbuseIPDB, and URLhaus, feeding into Splunk for automated correlation and alerting

AI-Powered SOC Alert Triage System — Machine learning (Random Forest) model to automatically prioritize and triage SOC alerts, reducing analyst fatigue

Zero Trust Network Simulation Lab — Full Zero Trust architecture built with pfSense, Wazuh, following NIST SP 800-207 principles
Each card: short description, tech stack tags, GitHub link placeholder, "view details" expand

8. Contact Section

Terminal-style contact form ("send_message.sh")

Email, LinkedIn, GitHub (ibu-cyx0), TryHackMe profile link

Location: Tamil Nadu, India (open to Chennai/Bangalore roles)

Resume download button

Navigation:

Sticky top nav styled like a terminal tab bar, or a fixed sidebar with > prompt-style menu items

Smooth scroll to sections

Footer:

Simple, minimal: social icons (GitHub, LinkedIn, TryHackMe), copyright, "Built with 🖤 and caffeine" or similar personal touch

Responsiveness: Fully responsive for mobile — collapse the terminal sidebar into a hamburger menu, stack project cards vertically.
</portfolio_prompt>

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://ibrahimcybrx.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/e8f62cf6-46be-4a30-b7a0-1fb0b358f04f).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```



                                 
