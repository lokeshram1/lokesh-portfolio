import { ArrowDownRight, ArrowRight, ArrowUpRight, Github, Mail, MapPin, FileText, BrainCircuit, Code2, Database, Workflow } from 'lucide-react';
import Image from 'next/image';
import { articles, email, experience, githubProfile, linkedInUrl, projects, skills } from './content';
import { ExperienceAccordions, PersistentPanel, ProjectAccordions } from './portfolio-accordions';

const icons = [BrainCircuit, Code2, Database, Workflow];

export default function Home() {
  return <main>
    <div className="viewport-group viewport-group-hero" id="home">
      <header className="topbar compact-topbar">
        <a className="wordmark" href="#home">Lokesh Ram Hariram<span>.</span></a>
        <nav aria-label="Main navigation"><a href="#experience">Experience</a><a href="#projects">Projects</a><a href="#skills">Skills</a><a href="#education">Education</a><a href="#writing">Writing</a></nav>
        <div className="header-links">
          <a href="/Lokesh-Ram-Resume.pdf" target="_blank" rel="noopener noreferrer">Resume</a>
          <a href={linkedInUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">LinkedIn</a>
          <a href={githubProfile} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github size={16}/></a>
          <a href={`mailto:${email}`} aria-label={`Email ${email}`}><Mail size={16}/></a>
        </div>
      </header>

      <section className="hero wrap compact-hero">
        <div className="hero-copy">
          <p className="eyebrow"><span className="status-dot"/> AI ENGINEERING <i>/</i> MACHINE LEARNING <i>/</i> DATA ENGINEERING</p>
          <p className="hero-role">AI/ML ENGINEER · DATA ENGINEER</p>
          <h1>I build AI systems that connect LLMs, data, and <em>real-world workflows.</em></h1>
          <p className="intro">From AI agents and API integrations to predictive ML systems, I build practical software that turns complex requirements into working, testable solutions.</p>
          <p className="credibility">Hands-on work includes an LLM-powered natural-language-to-SQL platform, predictive ML models, and an API verification workflow for 10 selected endpoints.</p>
          <div className="hero-actions">
            <a className="button primary" href="#projects">Explore My Projects <ArrowDownRight size={16}/></a>
            <a className="text-link" href="/Lokesh-Ram-Resume.pdf" target="_blank" rel="noopener noreferrer">View Resume <ArrowUpRight size={15}/></a>
            <a className="text-link" href={githubProfile} target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight size={15}/></a>
            <a className="text-link" href={linkedInUrl} target="_blank" rel="noopener noreferrer">LinkedIn <ArrowUpRight size={15}/></a>
          </div>
          <div className="hero-meta"><span><MapPin size={15}/> Austin, TX, USA · Open to relocation</span><span><Mail size={15}/> <a href={`mailto:${email}`}>{email}</a></span></div>
        </div>
        <aside className="hero-aside compact-hero-aside">
          <div className="portrait"><Image className="portrait-image" src="/profile.jpg" alt="Professional portrait of Lokesh Ram Hariram" width={622} height={802} priority/><span>AI / SYSTEMS / PRODUCT</span></div>
        </aside>
      </section>
      <div className="intro-strip"><div className="wrap strip-inner"><span>FROM AMBIGUITY TO WORKING SYSTEMS</span><p>Discovery → prototype → integration → validation → clear handoff.</p><span className="strip-index">01 — 05</span></div></div>
    </div>

    <PersistentPanel id="experience" eyebrow="01 / EXPERIENCE" title="Applied engineering, with outcomes" className="viewport-group-experience experience-panel">
      <div className="persistent-panel-body">
        <p className="section-summary">Building data foundations, applied ML models, and AI workflows with domain and engineering stakeholders.</p>
        <ExperienceAccordions items={experience}/>
      </div>
    </PersistentPanel>

    <PersistentPanel id="projects" eyebrow="02 / FEATURED PROJECTS" title="Built to solve real problems" className="featured-projects-panel">
      <div className="persistent-panel-body">
        <div className="section-top compact-section-top"><p className="section-summary">AI applications, integrations, and ML systems with explicit validation and practical trade-offs.</p></div>
        <ProjectAccordions items={projects}/>
      </div>
    </PersistentPanel>

    <div className="viewport-group viewport-group-finish">
      <PersistentPanel id="education" eyebrow="03 / EDUCATION" title="Foundations in systems and computer science" className="education-section education-panel">
        <div className="persistent-panel-body">
          <div className="education-grid"><span className="edu-icon"><FileText size={18}/></span><article className="education-entry"><strong>Master of Science, Information Systems</strong><div className="education-meta"><span>The University of Texas at Arlington</span><time>May 2026</time></div></article><div className="edu-divider" aria-hidden="true"/><article className="education-entry"><strong>Bachelor of Science, Computer Science</strong><div className="education-meta"><span>Sathyabama University</span><time>May 2024</time></div></article></div>
        </div>
      </PersistentPanel>

      <PersistentPanel id="skills" eyebrow="04 / TECHNICAL TOOLKIT" title="Skills grounded in the work" className="skills-section toolkit-panel">
        <div className="persistent-panel-body">
          <p className="section-summary">A practical toolkit across AI application development, data systems, ML, and delivery.</p>
          <div className="skills-grid">{skills.map(({title, items}, i) => { const Icon = icons[i % icons.length]; return <article className="skill-card" key={title}><div className="skill-icon"><Icon size={20}/></div><h3>{title}</h3><div className="skill-tags">{items.map(item => <span key={item}>{item}</span>)}</div></article>; })}</div>
        </div>
      </PersistentPanel>

      <PersistentPanel id="writing" eyebrow="05 / TECHNICAL WRITING" title="Topics I’m developing" className="technical-writing-panel">
        <div className="persistent-panel-body writing-panel-body">
          <p className="section-summary">Draft article outlines on reliability, integration, and production behavior. These are not published posts.</p>
          <div className="article-list">{articles.map((article, index) => <article className="article-row" key={article.title}><span className="article-number">0{index + 1}</span><div><p className="project-category">DRAFT OUTLINE</p><h3>{article.title}</h3><p>{article.desc}</p></div></article>)}</div>
        </div>
      </PersistentPanel>

      <section className="contact-band compact-contact" id="contact">
        <div className="wrap contact-inner"><p className="eyebrow">CONTACT · BUILDING AI, ML, AND INTEGRATION SYSTEMS</p><h2>Have a real problem <em>to work through?</em></h2><p>Open to full-time AI Engineer, Applied AI, Machine Learning Engineer, and Data Engineer opportunities.</p><div className="contact-actions"><a className="button light" href={`mailto:${email}`}>Get in touch <ArrowRight size={16}/></a><a className="contact-link" href={linkedInUrl} target="_blank" rel="noopener noreferrer">LinkedIn <ArrowUpRight size={14}/></a><a className="contact-link" href={githubProfile} target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight size={14}/></a><a className="contact-link" href="/Lokesh-Ram-Resume.pdf" target="_blank" rel="noopener noreferrer">Résumé <ArrowUpRight size={14}/></a></div></div>
      </section>
      <footer className="footer wrap"><a className="wordmark" href="#home">Lokesh Ram Hariram<span>.</span></a><p>AI applications, reliable integrations, and data-driven systems.</p><div className="footer-links"><a href={githubProfile} target="_blank" rel="noopener noreferrer">GitHub</a><a href={linkedInUrl} target="_blank" rel="noopener noreferrer">LinkedIn</a><a href={`mailto:${email}`}>Email</a></div><small>© {new Date().getFullYear()} Lokesh Ram Hariram</small></footer>
    </div>
  </main>;
}
