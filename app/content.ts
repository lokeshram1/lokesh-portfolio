export type CaseStudy = {
  slug: string;
  number: string;
  category: string;
  title: string;
  summary: string;
  problem: string;
  approach: string[];
  decisions: string[];
  validation: string[];
  value: string;
  limitations: string;
  stack: string[];
  github?: string;
  verificationNote?: string;
};

export const githubProfile = 'https://github.com/lokeshram1';
export const email = 'lokeshramloka@gmail.com';
// Add the actual profile URL when available; never link to LinkedIn's generic homepage.
export const linkedInUrl: string | undefined = undefined;

export const projects: CaseStudy[] = [
  {
    slug: 'api-contract-agent', number: '01', category: 'AI AGENTS · API INTEGRATION',
    title: 'API Integration & Contract Verification Agent',
    summary: 'How do you know an AI-generated API integration actually works? This agent turns API documentation into executable clients and tests, then checks observed behavior against documented contracts.',
    problem: 'Integrating an unfamiliar API means translating prose into request mappings and response models, while undocumented behavior and inconsistent errors can break an otherwise plausible generated client.',
    approach: [
      'Used Claude API to parse Shippo documentation for 10 selected endpoints and generate endpoint clients, request mappings, response schemas, and integration tests.',
      'Ran a bounded generate–execute–diagnose–repair workflow against the Shippo test environment, retrying once for defined issues such as missing fields, incorrect mappings, and invalid request formats.',
      'Compared documented request and response structures with observed API behavior, including error responses.',
    ],
    decisions: ['Treat generated code as a candidate that must execute, not as proof of correctness.', 'Bound repair attempts and keep unresolved failures visible for an engineer to review.', 'Record discrepancies and repair history in an endpoint-level report for an auditable handoff.'],
    validation: ['Executable integration tests against the API test environment.', 'JSON Schema checks against observed responses.', 'Reports of missing parameters, schema mismatches, unexpected fields, and inconsistent errors.'],
    value: 'Provides engineers with a repeatable way to inspect generated API integrations and see which endpoint contracts passed, failed, or still need human review.',
    limitations: 'Verification covered 10 selected endpoints and defined failure cases. A passing check does not guarantee correctness for every API state or future contract change; unresolved issues require human review.',
    stack: ['Python', 'Claude API', 'Shippo API', 'FastAPI', 'Docker', 'JSON Schema'],
    github: githubProfile,
  },
  {
    slug: 'askemdi', number: '02', category: 'APPLIED AI · NATURAL LANGUAGE TO SQL',
    title: 'AskEMDI — Natural-Language-to-SQL Platform',
    summary: 'An LLM-powered application that lets emergency physicians and researchers ask questions of structured data in natural language rather than writing SQL.',
    problem: 'Making structured encounter data useful to nontechnical researchers requires both an accessible query workflow and data that has been prepared and checked before it reaches downstream AI and analytics.',
    approach: ['Contributed to AskEMDI, an LLM-powered natural-language-to-SQL platform using Amazon Bedrock and Anthropic Claude.', 'Engineered Azure Data Factory and Azure Synapse pipelines to ingest, cleanse, transform, and validate a dataset of 23M+ encounters.', 'Built Python and SQL checks for missing values, inconsistent records, and coding issues before downstream workflows.', 'Gathered requirements with clinicians and operations stakeholders, demonstrated prototypes, and refined query logic and outputs from feedback.'],
    decisions: ['Treat data preparation and validation as part of the AI application, not as separate cleanup.', 'Use prototype demonstrations and stakeholder feedback to refine how questions map to query logic and outputs.'],
    validation: ['Python and SQL data-quality validation for missing values, inconsistencies, and coding issues.', 'Stakeholder review of prototype behavior and query outputs.'],
    value: 'Connected natural-language access to a structured data foundation built from 23M+ encounters, with validation steps and stakeholder feedback in the workflow.',
    limitations: 'The résumé describes individual contributions within a broader platform effort; it does not establish sole ownership or provide query-quality metrics, so neither is claimed here.',
    stack: ['Amazon Bedrock', 'Anthropic Claude', 'Azure Data Factory', 'Azure Synapse', 'Python', 'SQL'],
  },
  {
    slug: 'meeting-intelligence', number: '03', category: 'LLM APPLICATIONS · INFORMATION RETRIEVAL',
    title: 'Longitudinal Meeting Intelligence & Accountability System',
    summary: 'Turns recurring public city council meeting minutes into searchable accountability intelligence that tracks commitments across sessions.',
    problem: 'Meeting records are unstructured and each session is easy to read in isolation. Following a commitment over time requires matching related items while distinguishing a continuing issue from a genuinely new one.',
    approach: ['Extracted decisions, action items, owners, deadlines, and issue context from recurring public meeting minutes.', 'Persisted records in PostgreSQL and used embedding similarity followed by Claude-based verification to match related items across meetings.', 'Tracked overdue, stale, and repeatedly resurfacing commitments with an evidence trail across meetings.', 'Built an interactive accountability dashboard.'],
    decisions: ['Use similarity to retrieve candidate matches, then use Claude-based verification to assess the relationship.', 'Preserve the source evidence and temporal state so related commitments can be inspected over time.', 'Evaluate matching errors explicitly rather than treating every semantic similarity as a true match.'],
    validation: ['Created a manually labeled set of 75 meeting/action-item examples.', 'Analyzed false matches and missed links to identify recurring sources of error.'],
    value: 'Makes unresolved commitments easier to find across meeting records, with their context and evidence available for review.',
    limitations: 'The 75-example set was used to analyze error patterns; no accuracy score is reported. Meeting records and extracted details still need human review.',
    stack: ['Python', 'Claude API', 'Embeddings', 'PostgreSQL', 'FastAPI', 'Docker'],
    github: githubProfile,
  },
  {
    slug: 'pricing-risk', number: '04', category: 'MACHINE LEARNING · RISK ANALYTICS',
    title: 'E-Commerce Pricing Risk Detection System',
    summary: 'An end-to-end ML application that scores product listings for suspicious prices and gives reviewers evidence to investigate each flag.',
    problem: 'A price can look unusual for many reasons. A useful review queue needs category context and product semantics, while balancing missed anomalies against the workload created by false alarms.',
    approach: ['Used the Amazon Reviews 2023 electronics metadata dataset.', 'Combined category-level price deviations, relative discounts, product attributes, and Sentence Transformer embeddings of product text as XGBoost features.', 'Built a FastAPI scoring service and a Streamlit investigation dashboard showing comparable category prices, product attributes, contributing signals, and model explanations.', 'Created synthetic anomaly labels by injecting realistic anomalies into genuine product-price records.'],
    decisions: ['Present risk signals and comparisons so a person can investigate a score.', 'Tune decision thresholds using precision, recall, false-negative cost, and expected manual-review volume.', 'Use synthetic injected anomalies for evaluation and identify them as synthetic labels.'],
    validation: ['Evaluated against an injected-anomaly benchmark.', 'Tuned thresholds against precision, recall, false-negative cost, and manual-review volume.'],
    value: 'Packages feature engineering, scoring, and investigation into a review-oriented application rather than leaving the model as a notebook output.',
    limitations: 'The anomaly labels were synthetically injected. No production deployment, model accuracy, savings, or financial impact is claimed.',
    stack: ['Python', 'XGBoost', 'Sentence Transformers', 'PostgreSQL', 'FastAPI', 'Streamlit', 'Docker'],
    github: githubProfile,
  },
  {
    slug: 'incidentiq', number: '05', category: 'AI AGENTS · INCIDENT INVESTIGATION',
    title: 'IncidentIQ',
    summary: 'The portfolio describes an evidence-first incident investigation workflow: the model proposes hypotheses; evidence determines which ones hold up.',
    problem: 'Incident investigation produces competing explanations from operational signals. Teams need to see why a hypothesis is plausible and what evidence supports or weakens it.',
    approach: ['The current portfolio describes ranked hypotheses using logs, metrics, deployments, and baselines.', 'It describes deterministic checks and supporting evidence as separate from model-generated possibilities.'],
    decisions: ['Keep hypothesis generation distinct from validation.', 'Make the evidence behind a candidate explanation inspectable.'],
    validation: ['The available portfolio source does not include implementation notes or the IncidentIQ repository, so specific checks and integrations cannot be independently verified here.'],
    value: 'The stated design principle is clear and relevant to dependable AI workflows: a model can suggest an explanation, while evidence must support it.',
    limitations: 'Implementation status, source-code details, evidence integrations, scoring behavior, and demo availability need verification against the project repository before making stronger claims.',
    stack: ['Python', 'FastAPI', 'Next.js', 'Docker', 'PostgreSQL'],
    github: 'https://github.com/lokeshram1/IncidentIQ',
    verificationNote: 'Implementation details on this page are limited to the portfolio description provided in the ZIP. Verify against the project repository before publishing.',
  },
];

export const skills = [
  { title: 'AI & LLM Engineering', items: ['LLMs', 'Generative AI', 'OpenAI API', 'Claude API', 'Amazon Bedrock', 'RAG', 'AI agents', 'Embeddings', 'Vector search', 'Tool calling', 'Structured outputs', 'LLM evaluation', 'Guardrails'] },
  { title: 'AI Application & Integration Engineering', items: ['Python', 'FastAPI', 'REST APIs', 'JSON Schema', 'API integration', 'Contract validation', 'Agentic workflows', 'Human-in-the-loop systems', 'Natural-language-to-SQL'] },
  { title: 'Machine Learning', items: ['XGBoost', 'ARIMA', 'Predictive modeling', 'Feature engineering', 'Time-series forecasting', 'Statistical analysis', 'Exploratory data analysis'] },
  { title: 'Data & Cloud Engineering', items: ['SQL', 'PostgreSQL', 'ETL/ELT', 'Azure Data Factory', 'Azure Synapse Analytics', 'AWS', 'Azure', 'Data modeling', 'Docker', 'Kubernetes', 'CI/CD'] },
  { title: 'Analytics & Collaboration', items: ['Power BI', 'DAX', 'Power Query', 'KPI analysis', 'Requirements gathering', 'Technical discovery', 'Prototyping', 'Systems integration', 'Solution design'] },
];

export const experience = [
  { date: 'AUG 2025 — JAN 2026', role: 'Applied AI/ML Engineer', org: 'American College of Emergency Physicians (ACEP) · Irving, TX', bullets: ['Contributed to AskEMDI, an LLM-powered natural-language-to-SQL platform built with Amazon Bedrock and Anthropic Claude.', 'Built Azure Data Factory and Synapse pipelines for a 23M+ encounter dataset, with Python and SQL validation before downstream AI workflows.', 'Worked with clinicians and operations stakeholders to gather requirements, demonstrate prototypes, and refine query logic and outputs.'] },
  { date: 'AUG 2024 — MAY 2025', role: 'Research Assistant (Machine Learning)', org: 'SEAR LAB · Arlington, TX', bullets: ['Built Python and SQL pipelines for 500K+ time-series sensor records and developed XGBoost and ARIMA predictive models.', 'Modeling work contributed to a 15% production-efficiency improvement in the research environment.', 'Automated data workflows and reporting, reducing KPI reporting time by 40%; dashboards were adopted for weekly KPI tracking.'] },
];

export const articles = [
  { title: 'How to Validate an LLM-Generated API Integration', desc: 'Draft outline: executable checks, API contracts, bounded repair attempts, error handling, and auditable handoffs.' },
  { title: 'Why I Separate LLM Hypothesis Generation From Evidence-Based Validation', desc: 'Draft outline: candidate explanations, deterministic checks, evidence quality, and reviewable incident workflows.' },
  { title: 'Building Longitudinal Memory Across Repeated Meetings', desc: 'Draft outline: candidate retrieval, verified matching, temporal state, and analysis of false matches and missed links.' },
  { title: 'Evaluating an ML-Based Pricing Risk Detection System', desc: 'Draft outline: synthetic anomaly labels, threshold trade-offs, review volume, and interpretable risk signals.' },
  { title: 'Connecting Natural Language to Structured Data Safely', desc: 'Draft outline: data foundations, validation, stakeholder discovery, and natural-language-to-SQL workflows.' },
];
