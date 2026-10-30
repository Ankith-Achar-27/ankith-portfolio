import React from "react";
import { useEffect, useState } from 'react';
import {
  ArrowDownRight, ArrowUpRight, Github, Linkedin, Mail, Menu, X,
  Code2, LayoutPanelTop, Server, Database, ExternalLink, MapPin,
} from 'lucide-react';
import { projects, skillGroups } from './data.js';

const GITHUB = 'https://github.com/Ankith-Achar-27';
// Replace these before publishing.
const LINKEDIN = 'https://www.linkedin.com/in/ankith-h-s-27smet/';
const EMAIL = 'ankith.achar.dev@gmail.com';

const skillIcons = { code: Code2, layout: LayoutPanelTop, server: Server, database: Database };

function Navbar() {
  const [open, setOpen] = useState(false);
  const links = [
    ['About', '#about'], ['Skills', '#skills'], ['Projects', '#projects'], ['Contact', '#contact'],
  ];
  return (
    <header className="nav-wrap">
      <nav className="navbar" aria-label="Main navigation">
          <a
              className="brand"
              href="#home"
              onClick={() => setOpen(false)}
              onMouseEnter={() => {
                  if (
                      window.matchMedia('(hover: hover) and (pointer: fine)').matches
                  ) {
                      document.querySelector('#home')?.scrollIntoView({
                          behavior: 'smooth',
                          block: 'start',
                      });
                  }
              }}
          >
              Ankith H S<span>.</span>
          </a>
        <button className="menu-toggle" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
        <div className={`nav-links ${open ? 'is-open' : ''}`}>
          {links.map(([label, href]) => (
            <a key={label} href={href} onClick={() => setOpen(false)} onMouseEnter={(event) => { if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) { const target = document.querySelector(href); target?.scrollIntoView({ behavior: 'smooth', block: 'start' }); } }}>{label}</a>
          ))}
          <a className="nav-cta" href={GITHUB} target="_blank" rel="noreferrer">
            Visit GitHub <ArrowUpRight size={14} />
          </a>
        </div>
      </nav>
    </header>
  );
}


function GradientScrollbar() {
  const [scrollState, setScrollState] = useState({ top: 0, height: 18 });

  useEffect(() => {
    const update = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const thumbHeight = scrollable <= 0 ? window.innerHeight : Math.max(48, (window.innerHeight / document.documentElement.scrollHeight) * window.innerHeight);
      const travel = window.innerHeight - thumbHeight;
      const top = scrollable <= 0 ? 0 : (window.scrollY / scrollable) * travel;
      setScrollState({ top, height: thumbHeight });
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    const observer = new ResizeObserver(update);
    observer.observe(document.documentElement);
    return () => { window.removeEventListener('scroll', update); window.removeEventListener('resize', update); observer.disconnect(); };
  }, []);

  const jumpToPosition = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height));
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: ratio * maxScroll, behavior: 'smooth' });
  };

  return <div className="gradient-scrollbar" aria-hidden="true" onClick={jumpToPosition}><span style={{ top: `${scrollState.top}px`, height: `${scrollState.height}px` }} /></div>;
}

function SocialLinks() {
  return (
    <div className="social-links">
      <a href={GITHUB} target="_blank" rel="noreferrer" aria-label="GitHub profile"><Github /></a>
      <a href={LINKEDIN} target="_blank" rel="noreferrer" aria-label="LinkedIn profile"><Linkedin /></a>
        <a
            href={`https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}`}
            target="_blank"
            rel="noreferrer"
            aria-label="Email Ankith"
        >
            <Mail />
        </a>
    </div>
  );
}
function Hero() {
    return (
        <section className="hero section-shell" id="home">
            <div className="hero-photo-wrap">
                <div className="hero-photo">
                    <img
                        src="/src/images/profile.jpeg"
                        alt="Ankith H S - Profile"
                        className="profile-image"
                    />
                </div>

                <span className="orbit orbit-one" />
                <span className="orbit orbit-two" />

                <div className="availability">
                    <span />
                    Open to internship opportunities
                </div>
            </div>

            <div className="hero-copy">
                <p className="intro">Hi, I'm</p>

                <h1>
                    Ankith <span>H S</span>
                </h1>

                <h2>
                    Computer Science Student <span>&amp;</span>
                    <br />
                    Aspiring Software Developer
                </h2>

                <p className="hero-description">
                    I enjoy turning ideas into practical applications, solving
                    problems, and learning how software works from frontend to backend.
                </p>

                <div className="hero-actions">
                    <a className="button button-primary" href="#projects">
                        Explore projects <ArrowDownRight size={17} />
                    </a>

                    <a className="button button-secondary" href="#contact">
                        Contact me
                    </a>
                </div>

                <SocialLinks />

                <div className="hero-location">
                    <MapPin size={14} />
                    Hassan, Karnataka, India
                    <span className="location-dot">·</span>
                    Graduating 2027
                </div>
            </div>

            <span className="hero-index">PORTFOLIO / 2026</span>
        </section>
    );
}

function SectionHeading({ kicker, title, subtitle }) {
  return (
    <div className="section-heading">
      <p className="eyebrow"><span className="eyebrow-line" /> {kicker}</p>
      <h2>{title}</h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </div>
  );
}

function About() {
  return (
    <section className="section-shell about-section" id="about">
      <SectionHeading kicker="A LITTLE ABOUT ME" title={<>Curious by nature.<br /><span>Developer by practice.</span></>} />
      <div className="about-grid">
        <p className="about-lead">I'm a Computer Science and Engineering student at Malnad College of Engineering, Hassan, graduating in 2027.</p>
        <div className="about-body">
          <p>I primarily work with Java and JavaScript while strengthening my programming fundamentals and Data Structures &amp; Algorithms. I'm interested in full-stack web development and enjoy learning by building practical projects.</p>
          <p>From interactive interfaces to data-driven applications, I like understanding how each part fits together. I'm currently looking for internship opportunities where I can contribute, learn from experienced developers, and keep growing.</p>
          <a className="text-link" href="#contact">Let's connect <ArrowUpRight size={16} /></a>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section className="section-shell skills-section" id="skills">
      <SectionHeading kicker="WHAT I WORK WITH" title={<>Tools of the <span>trade.</span></>} subtitle="The technologies I'm learning and using to build things." />
      <div className="skills-grid">
        {skillGroups.map((skill, index) => {
          const Icon = skillIcons[skill.icon];
          return (
            <article className="skill-card" key={skill.title}>
              <div className="skill-card-top"><span className="skill-icon"><Icon size={21} /></span><span className="card-number">0{index + 1}</span></div>
              <h3>{skill.title}</h3>
              <p>{skill.detail}</p>
              <span className="card-arrow"><ArrowUpRight size={17} /></span>
            </article>
          );
        })}
      </div>
      <p className="skills-note">Also exploring: object-oriented programming, database design, and software engineering fundamentals.</p>
    </section>
  );
}

function ProjectVisual({ type, number }) {
  const labels = {
    attendance: ['ATTENDANCE / OVERVIEW', 'Students present', 'Attendance report'],
    housing: ['PROPERTY / INSIGHTS', 'Price prediction', 'Model evaluation'],
    github: ['REPOSITORY / ANALYTICS', 'Stars & forks', 'Popularity insights'],
    chatbot: ['CHAT / INTERFACE', 'Message received', 'Assistant response'],
  };
  const [label, metric, footer] = labels[type];
  return (
    <div className={`project-visual visual-${type}`}>
      <div className="visual-window">
        <div className="visual-chrome"><span /><span /><span /><small>{label}</small></div>
        <div className="visual-content">
          <div className="visual-sidebar"><i /><i /><i /><i /></div>
          <div className="visual-main">
            <div className="visual-heading">{metric}</div>
            <div className="visual-stats"><span /><span /><span /></div>
            <div className="visual-chart"><i /><i /><i /><i /><i /><i /><i /><i /></div>
            <div className="visual-footer">{footer}</div>
          </div>
        </div>
      </div>
      <span className="visual-index">{number} / 04</span>
    </div>
  );
}

function Projects() {
  return (
    <section className="section-shell projects-section" id="projects">
      <SectionHeading kicker="SELECTED WORK" title={<>Things I've <span>built.</span></>} subtitle="A few projects where I've turned learning into hands-on practice." />
      <div className="projects-grid">
        {projects.map((project) => (
          <article className="project-card" key={project.number}>
            <ProjectVisual type={project.visual} number={project.number} />
            <div className="project-content">
              <div className="project-category">{project.category}</div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="tech-tags">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
              <div className="project-links">
                <a href={project.github} target="_blank" rel="noreferrer">GitHub repo <ArrowUpRight size={15} /></a>
                {project.demo && <a href={project.demo} target="_blank" rel="noreferrer">Live demo <ExternalLink size={14} /></a>}
              </div>
            </div>
          </article>
        ))}
      </div>
      <a className="all-projects-link" href={GITHUB} target="_blank" rel="noreferrer">Explore all repositories <ArrowUpRight size={16} /></a>
    </section>
  );
}

function Education() {
  return (
    <section className="section-shell education-section" id="experience">
      <div className="education-panel">
        <div>
          <p className="eyebrow"><span className="eyebrow-line" /> THE FOUNDATION</p>
          <h2>Learning today.<br /><span>Building for tomorrow.</span></h2>
        </div>
        <div className="education-detail">
          <span className="education-year">2023 — 2027</span>
          <h3>B.E. Computer Science &amp; Engineering</h3>
          <p>Malnad College of Engineering</p>
          <p className="education-location">Hassan, Karnataka, India</p>
          <div className="education-status"><span /> Currently studying</div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
    return (
        <section className="section-shell contact-section" id="contact">
            <SectionHeading
                kicker="HAVE A PROJECT OR OPPORTUNITY?"
                title={
                    <>
                        Let's make something <span>meaningful.</span>
                    </>
                }
                subtitle="I'm open to internships, entry-level opportunities, and connecting with fellow developers."
            />

            <div className="contact-panel">
                <div className="contact-copy">
          <span className="contact-icon">
            <Mail size={22} />
          </span>

                    <h3>Have something in mind?</h3>
                    <p>Feel free to reach out. I'd be happy to connect.</p>
                </div>

                <a
                    className="button button-primary contact-button"
                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}`}
                    target="_blank"
                    rel="noreferrer"
                >
                    Say hello <ArrowUpRight size={17} />
                </a>
            </div>

            <div className="contact-socials">
                <a href={GITHUB} target="_blank" rel="noreferrer">
                    <Github size={17} />
                    GitHub
                </a>

                <a href={LINKEDIN} target="_blank" rel="noreferrer">
                    <Linkedin size={17} />
                    LinkedIn
                </a>

                <span>
          <MapPin size={15} />
          Hassan, India
        </span>
            </div>
        </section>
    );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <a className="brand footer-brand" href="#home">Ankith H S<span>.</span></a>
        <p>Designed with intention. Built with React.</p>
        <a className="back-top" href="#home">Back to top ↑</a>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} Ankith H S</span><span>MADE TO KEEP LEARNING</span></div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <Navbar />
      <GradientScrollbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}