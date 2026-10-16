'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import type { CaseStudy, ExperienceRole } from './content';

type PortfolioAccordionContextValue = {
  openSections: ReadonlySet<string>;
  openSection: (id: string) => void;
  toggleSection: (id: string) => void;
};

const PortfolioAccordionContext = createContext<PortfolioAccordionContextValue | null>(null);

function usePortfolioAccordionContext() {
  const context = useContext(PortfolioAccordionContext);
  if (!context) throw new Error('Portfolio accordions must be rendered inside PortfolioAccordionProvider.');
  return context;
}

export function PortfolioAccordionProvider({ children }: { children: ReactNode }) {
  const [openSections, setOpenSections] = useState<Set<string>>(() => new Set());
  const context: PortfolioAccordionContextValue = {
    openSections,
    openSection: (id) => setOpenSections((current) => current.has(id) ? current : new Set(current).add(id)),
    toggleSection: (id) => setOpenSections((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    }),
  };

  return <PortfolioAccordionContext.Provider value={context}>{children}</PortfolioAccordionContext.Provider>;
}

export function PortfolioNavigation() {
  const { openSection } = usePortfolioAccordionContext();
  const links = [
    ['experience', 'Experience'],
    ['projects', 'Projects'],
    ['skills', 'Skills'],
    ['education', 'Education'],
    ['writing', 'Writing'],
  ] as const;

  return <nav aria-label="Main navigation">{links.map(([id, label]) => <a href={`#${id}`} key={id} onClick={() => openSection(id)}>{label}</a>)}</nav>;
}

export function PersistentPanel({ id, eyebrow, title, className = '', children }: { id: string; eyebrow: string; title: string; className?: string; children: ReactNode }) {
  const { openSections, toggleSection } = usePortfolioAccordionContext();
  const isExpanded = openSections.has(id);
  const triggerId = `${id}-toggle`;
  const panelId = `${id}-content`;

  return <section className={`persistent-section ${className}`} id={id}>
    <div className="wrap">
      <button className="persistent-section-header" type="button" id={triggerId} aria-expanded={isExpanded} aria-controls={panelId} onClick={() => toggleSection(id)}>
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
            <span className="experience-highlights" aria-label="Selected outcomes">{item.highlights.map((highlight) => <span key={highlight}>{highlight}</span>)}</span>
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
            <ProjectWorkflowVisual slug={item.slug}/>
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

function ProjectWorkflowVisual({ slug }: { slug: string }) {
  const labels: Record<string, string> = {
    'api-contract-agent': 'Illustrative API workflow: documentation, generated client, execution, and contract checks.',
    askemdi: 'Illustrative natural-language-to-SQL flow connecting a question, query, and structured data.',
    'meeting-intelligence': 'Illustrative timeline connecting commitments across recurring meetings for review.',
    'pricing-risk': 'Illustrative pricing-risk concept showing product signals prioritized for human review; not model output.',
    incidentiq: 'Illustrative incident workflow: signals inform hypotheses, which are checked against evidence.',
  };

  return <svg className={`project-visual project-visual-${slug}`} viewBox="0 0 320 132" role="img" aria-label={labels[slug]}>
    {slug === 'api-contract-agent' && <>
      <rect x="8" y="10" width="304" height="112" rx="3" fill="#f4f6fb"/>
      <text x="22" y="29" className="visual-kicker">CONTRACT CHECK · WORKFLOW</text>
      {[['DOCS',22],['CLIENT',102],['TEST',182],['REPORT',262]].map(([label,x]) => <g key={String(label)}>
        <rect x={Number(x)} y="54" width="52" height="37" rx="3" fill="white" stroke="#cbd5eb"/>
        <text x={Number(x)+26} y="76" textAnchor="middle" className="visual-label">{label}</text>
      </g>)}
      <path d="M75 72h20m0 0-5-4m5 4-5 4M155 72h20m0 0-5-4m5 4-5 4M235 72h20m0 0-5-4m5 4-5 4" fill="none" stroke="#345bd6" strokeWidth="2"/>
      <text x="22" y="108" className="visual-note">generate → execute → compare to schema</text>
    </>}
    {slug === 'askemdi' && <>
      <rect x="8" y="10" width="304" height="112" rx="3" fill="#eef4f6"/>
      <text x="22" y="29" className="visual-kicker">ASKEMDI · DATA TO QUESTION</text>
      <rect x="22" y="43" width="91" height="52" rx="3" fill="#fff" stroke="#b8d1d4"/>
      <text x="32" y="61" className="visual-note">Research</text><text x="32" y="76" className="visual-note">question</text>
      <path d="M117 69h24m0 0-5-4m5 4-5 4" fill="none" stroke="#27778a" strokeWidth="2"/>
      <rect x="147" y="43" width="70" height="52" rx="3" fill="#193c4c"/>
      <text x="182" y="64" textAnchor="middle" fill="#fff" className="visual-label">NATURAL</text><text x="182" y="78" textAnchor="middle" fill="#fff" className="visual-label">LANGUAGE → SQL</text>
      <path d="M221 69h24m0 0-5-4m5 4-5 4" fill="none" stroke="#27778a" strokeWidth="2"/>
      <rect x="251" y="43" width="49" height="52" rx="3" fill="#d9e9e8"/>
      <path d="M260 55h31M260 64h31M260 73h31M260 82h20" stroke="#5d9999" strokeWidth="3"/>
      <text x="22" y="108" className="visual-note">23M+ encounter data foundation · validated pipelines</text>
    </>}
    {slug === 'meeting-intelligence' && <>
      <rect x="8" y="10" width="304" height="112" rx="3" fill="#f5f3ee"/>
      <text x="22" y="29" className="visual-kicker">COMMITMENTS ACROSS SESSIONS</text>
      <path d="M48 48v53M153 48v53M258 48v53" stroke="#c9bda7" strokeWidth="2"/>
      {[48,153,258].map((x,i)=><g key={x}><circle cx={x} cy="60" r="7" fill={i===1?'#345bd6':'#8799ad'}/><rect x={x-27} y="77" width="82" height="25" rx="3" fill="#fff" stroke="#dfd9cd"/><text x={x+14} y="93" textAnchor="middle" className="visual-label">{['SESSION 01','SESSION 02','SESSION 03'][i]}</text></g>)}
      <path d="M56 60c28 0 36 26 74 26s53-26 121-26" fill="none" stroke="#c7854e" strokeDasharray="4 4" strokeWidth="2"/>
      <text x="22" y="114" className="visual-note">candidate match → verification → evidence trail</text>
    </>}
    {slug === 'pricing-risk' && <>
      <rect x="8" y="10" width="304" height="112" rx="3" fill="#f7f1f0"/>
      <text x="22" y="29" className="visual-kicker">PRICE SIGNALS · REVIEW PRIORITY</text>
      <path d="M43 98V43M43 98h239" fill="none" stroke="#a9a2a0" strokeWidth="1.5"/>
      <path d="M48 85c50-10 93-16 148-26" fill="none" stroke="#c47e65" strokeDasharray="4 4" strokeWidth="2"/>
      {[[66,82],[84,72],[111,79],[137,64],[165,74],[188,49],[214,66],[239,43],[260,57]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r={i===7?5:3.5} fill={i===7?'#c4553e':'#627e94'} opacity=".9"/>)}
      <text x="45" y="111" className="visual-note">category context + product signals · human review</text>
    </>}
    {slug === 'incidentiq' && <>
      <rect x="8" y="10" width="304" height="112" rx="3" fill="#f1f3f7"/>
      <text x="22" y="29" className="visual-kicker">INCIDENT INVESTIGATION · CONCEPT</text>
      <rect x="22" y="53" width="58" height="38" rx="3" fill="#fff" stroke="#cbd2df"/><text x="51" y="76" textAnchor="middle" className="visual-label">SIGNALS</text>
      <rect x="99" y="46" width="66" height="52" rx="3" fill="#e5eafa" stroke="#aebce7"/><text x="132" y="68" textAnchor="middle" className="visual-label">HYPOTHESIS</text><text x="132" y="82" textAnchor="middle" className="visual-note">candidate</text>
      <rect x="184" y="53" width="55" height="38" rx="3" fill="#fff" stroke="#cbd2df"/><text x="211" y="76" textAnchor="middle" className="visual-label">EVIDENCE</text>
      <rect x="259" y="53" width="43" height="38" rx="3" fill="#dfeee8" stroke="#a8cbb9"/><text x="280" y="69" textAnchor="middle" className="visual-label">CHECK</text><text x="280" y="81" textAnchor="middle" className="visual-note">result</text>
      <path d="M82 72h13m0 0-4-4m4 4-4 4M167 72h13m0 0-4-4m4 4-4 4M241 72h13m0 0-4-4m4 4-4 4" fill="none" stroke="#596d9b" strokeWidth="2"/>
      <text x="22" y="111" className="visual-note">model suggestions remain separate from validation</text>
    </>}
  </svg>;
}
