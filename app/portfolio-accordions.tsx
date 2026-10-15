'use client';

import { useState, type ReactNode } from 'react';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import type { CaseStudy, ExperienceRole } from './content';

export function PersistentPanel({ id, eyebrow, title, className = '', children }: { id: string; eyebrow: string; title: string; className?: string; children: ReactNode }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const triggerId = `${id}-toggle`;
  const panelId = `${id}-content`;

  return <section className={`persistent-section ${className}`} id={id}>
    <div className="wrap">
      <button className="persistent-section-header" type="button" id={triggerId} aria-expanded={isExpanded} aria-controls={panelId} onClick={() => setIsExpanded((expanded) => !expanded)}>
        <span className="persistent-section-heading"><span className="eyebrow">{eyebrow}</span><span className="persistent-section-title">{title}</span></span>
        <ChevronDown className="persistent-section-chevron" size={21} aria-hidden="true" />
      </button>
      <div className={`persistent-section-content${isExpanded ? ' is-expanded' : ''}`} id={panelId} role="region" aria-labelledby={triggerId} aria-hidden={!isExpanded} inert={!isExpanded}>
        <div className="persistent-section-inner">{children}</div>
      </div>
    </div>
  </section>;
}

export function ExperienceAccordions({ items }: { items: ExperienceRole[] }) {
  const [openRole, setOpenRole] = useState<string | null>(null);

  return <div className="accordion-list experience-accordion-list">
    {items.map((item, index) => {
      const isOpen = openRole === item.role;
      const triggerId = `experience-trigger-${index}`;
      const panelId = `experience-panel-${index}`;

      return <article className={`accordion-item${isOpen ? ' is-open' : ''}`} key={item.role}>
        <button className="accordion-trigger" id={triggerId} type="button" aria-expanded={isOpen} aria-controls={panelId} onClick={() => setOpenRole(isOpen ? null : item.role)}>
          <span className="accordion-index">0{index + 1}</span>
          <span className="accordion-heading">
            <span className="accordion-title">{item.role}</span>
            <span className="accordion-meta">{item.org}{item.location ? ` · ${item.location}` : ''} <span aria-hidden="true">·</span> {item.date}</span>
            <span className="accordion-preview">{item.bullets[0]}</span>
          </span>
          <ChevronDown className="accordion-chevron" size={18} aria-hidden="true" />
        </button>
        <div className="accordion-panel" id={panelId} role="region" aria-labelledby={triggerId} hidden={!isOpen}>
          <ul className="experience-details">{item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
        </div>
      </article>;
    })}
  </div>;
}

export function ProjectAccordions({ items }: { items: CaseStudy[] }) {
  const [openProject, setOpenProject] = useState<string | null>(null);

  return <div className="accordion-list project-accordion-list">
    {items.map((item, index) => {
      const isOpen = openProject === item.slug;
      const triggerId = `project-trigger-${index}`;
      const panelId = `project-panel-${index}`;

      return <article className={`accordion-item${isOpen ? ' is-open' : ''}`} key={item.slug}>
        <div className="project-accordion-row">
          <button className="accordion-trigger project-accordion-trigger" id={triggerId} type="button" aria-expanded={isOpen} aria-controls={panelId} onClick={() => setOpenProject(isOpen ? null : item.slug)}>
            <span className="accordion-index">{item.number}</span>
            <span className="accordion-heading">
              <span className="accordion-category">{item.category}</span>
              <span className="accordion-title">{item.title}</span>
              <span className="accordion-preview">{item.summary}</span>
              <span className="accordion-tags">{item.stack.map((technology) => <span key={technology}>{technology}</span>)}</span>
            </span>
            <ChevronDown className="accordion-chevron" size={18} aria-hidden="true" />
          </button>
          <div className="project-row-links">
            <a href={`/projects/${item.slug}`} aria-label={`Open ${item.title} case study`}>Case study <ArrowUpRight size={13}/></a>
            {item.github && <a href={item.github} target="_blank" rel="noopener noreferrer" aria-label={`Open ${item.title} GitHub link`}>GitHub <ArrowUpRight size={13}/></a>}
          </div>
        </div>
        <div className="accordion-panel project-accordion-panel" id={panelId} role="region" aria-labelledby={triggerId} hidden={!isOpen}>
          {item.verificationNote && <p className="verification-note">{item.verificationNote}</p>}
          <div className="project-detail-grid">
            <section><h3>The challenge</h3><p>{item.problem}</p></section>
            <section><h3>System and implementation</h3><ul>{item.approach.map((entry) => <li key={entry}>{entry}</li>)}</ul></section>
            <section><h3>Engineering choices</h3><ul>{item.decisions.map((entry) => <li key={entry}>{entry}</li>)}</ul></section>
            <section><h3>Reliability and validation</h3><ul>{item.validation.map((entry) => <li key={entry}>{entry}</li>)}</ul></section>
            <section><h3>Practical value</h3><p>{item.value}</p></section>
            <section><h3>Trade-offs and scope</h3><p>{item.limitations}</p></section>
          </div>
          <p className="expanded-stack"><strong>Technologies:</strong> {item.stack.join(' · ')}</p>
          <a className="expanded-case-link" href={`/projects/${item.slug}`}>Read the full case study <ArrowUpRight size={14}/></a>
        </div>
      </article>;
    })}
  </div>;
}
