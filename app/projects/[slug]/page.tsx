import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, Github } from 'lucide-react';
import { notFound } from 'next/navigation';
import { githubProfile, projects } from '../../content';

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find(item => item.slug === slug);
  if (!project) notFound();

  return <main>
    <header className="topbar"><Link className="wordmark" href="/#home">Lokesh Ram Hariram<span>.</span></Link><nav aria-label="Project navigation"><Link href="/#projects">All projects</Link><Link href="/#experience">Experience</Link><Link href="/#skills">Skills</Link></nav><a className="text-link" href={githubProfile} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={15}/></a></header>
    <article className="case-study wrap">
      <Link className="back-link" href="/#projects"><ArrowLeft size={15}/> All projects</Link>
      <p className="eyebrow">{project.number} / {project.category}</p>
      <h1>{project.title}</h1>
      <p className="case-lede">{project.summary}</p>
      <div className="case-stack"><span className="project-category">TECHNOLOGIES</span><div className="tags">{project.stack.map(item => <span key={item}>{item}</span>)}</div></div>
      {project.verificationNote && <p className="verification-note">{project.verificationNote}</p>}
      <div className="case-grid">
        <section className="case-section"><p className="eyebrow">01 / PROBLEM</p><h2>The challenge</h2><p>{project.problem}</p></section>
        <section className="case-section"><p className="eyebrow">02 / APPROACH</p><h2>System and implementation</h2><ul>{project.approach.map(item => <li key={item}>{item}</li>)}</ul></section>
        <section className="case-section"><p className="eyebrow">03 / DECISIONS</p><h2>Engineering choices</h2><ul>{project.decisions.map(item => <li key={item}>{item}</li>)}</ul></section>
        <section className="case-section"><p className="eyebrow">04 / EVALUATION</p><h2>Reliability and validation</h2><ul>{project.validation.map(item => <li key={item}>{item}</li>)}</ul></section>
        <section className="case-section"><p className="eyebrow">05 / VALUE</p><h2>Practical value</h2><p>{project.value}</p></section>
        <section className="case-section"><p className="eyebrow">06 / LIMITATIONS</p><h2>Trade-offs and scope</h2><p>{project.limitations}</p></section>
      </div>
      <div className="case-cta"><div><p className="eyebrow">CONTINUE THE CONVERSATION</p><h2>Want to discuss the technical trade-offs?</h2></div><a className="button primary" href={project.github ?? githubProfile} target="_blank" rel="noreferrer"><Github size={16}/>{project.github && project.github !== githubProfile ? 'Open project repository' : 'View GitHub profile'}<ArrowUpRight size={15}/></a></div>
      <p className="project-footnote">The current package includes a profile destination for some projects rather than a project-specific repository. Replace it when the direct repository URL is available.</p>
    </article>
  </main>;
}
