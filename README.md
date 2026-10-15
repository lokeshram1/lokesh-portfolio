# Lokesh Ram Hariram — AI / ML / Data Engineering Portfolio

An editorial, responsive portfolio built with Next.js 15, React 19, TypeScript, and CSS. The site presents AI application engineering, machine learning, integrations, and data systems through project case studies.

## Run locally

1. Install Node.js (LTS).
2. From this folder, run:

   ```bash
   npm install
   npm run dev
   ```

3. Open <http://localhost:3000>.

## Content editing

- Edit project descriptions, case-study details, skills, experience, and article outlines in `app/content.ts`.
- Edit homepage structure in `app/page.tsx` and case-study layout in `app/projects/[slug]/page.tsx`.
- Edit presentation and responsive behavior in `app/globals.css`.
- Add a new case study to the `projects` array in `app/content.ts`. Its `slug` creates the URL `/projects/<slug>`; the case-study page is generated from the data.
- Update `experience`, `skills`, and `articles` in the same content file. Article entries are explicitly presented as draft outlines, not published posts.

## Before publishing

- The LinkedIn profile URL is configured in `linkedInUrl` in `app/content.ts`.
- Replace `public/profile.jpg` to update the homepage portrait. The image is cropped with CSS to fit the existing hero frame.
- Confirm the GitHub profile URL in `githubProfile` and replace profile-level project destinations with direct repository URLs when available.
- The resume PDF is included at `public/Lokesh-Ram-Resume.pdf`.
- Verify IncidentIQ implementation notes and integrations against its repository. That repository was not included in the source ZIP, so the case study explicitly limits its claims.
- Confirm current role dates and project details before deployment.

## Content accuracy

Résumé-backed details include the ACEP and SEAR LAB experience and the API verification, meeting intelligence, pricing risk, and AskEMDI projects. The site does not publish the phone number from the résumé. It does not claim unprovided metrics, production deployment, model scores, or business outcomes.
