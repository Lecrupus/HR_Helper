# WCIRIA - Workforce Continuity and Insider Risk Intelligence Agent

WCIRIA is a full-stack dashboard for workforce continuity analysis, insider-risk signal review, successor planning, and knowledge-transfer planning. The project combines a static frontend experience with a Fastify backend, PostgreSQL schema, Redis cache support, and Coral as the core reasoning layer that joins employee, system, and security data into an explainable intelligence view.

## What This Project Does

The application is designed to help teams understand where knowledge concentration, critical access, and departure risk are highest. It provides:

- employee risk profiles and search
- knowledge risk scoring and insider-risk indicators
- scenario simulations for departure impact
- successor readiness and transfer planning
- an evidence trail that shows how the intelligence was assembled
- Coral-driven multi-source semantic joins and explainable analysis
- a responsive dashboard UI for reviewing the data interactively

## What We Built

This workspace contains four main layers:

1. A static dashboard in the project root that renders the main experience with HTML, CSS, and JavaScript.
2. A Fastify backend in `backend/` that exposes REST endpoints, validates input with Zod, and serves employee intelligence data.
3. A PostgreSQL-backed data layer with schema and seed files that initialize the demo dataset automatically when the backend starts.
4. A supporting React and Tailwind scaffold in `frontend/` that defines reusable dashboard components and a visual system for future expansion.

## How We Built It

The frontend is a lightweight dashboard that reads mock and API-backed data, updates panels based on the selected employee, and falls back to local analysis when the backend is unavailable.

The backend uses Fastify with middleware for CORS, security headers, and rate limiting. It boots a PostgreSQL connection, checks whether the database schema exists, and loads `schema.sql` and `mock-data.sql` when needed.

The reasoning layer, implemented in `backend/src/services/coral-reasoning-engine.ts`, acts as the intelligence engine. Coral is the main differentiator in the system: it combines data from multiple internal sources, calculates knowledge-risk and insider-risk scores, and generates scenario outputs for the dashboard.

The repository also contains a second frontend surface in `frontend/` with Tailwind configuration, global styles, and reusable components such as the dashboard header and KPI cards. The shipped experience is still the static root dashboard, but the component scaffold shows how the UI can be migrated into a more modular frontend later.

## Coral Reasoning

Coral is the semantic reasoning core of the project and the reason the platform is more than a static dashboard. It turns fragmented source data into a single intelligence view that can be explained, traced, and acted on.

Coral handles three important jobs:

- multi-source joining across employee, repository, communication, permission, and ticket data
- risk calculation for knowledge concentration and insider threat indicators
- scenario simulation for departure impact and transfer planning

In practice, Coral powers the intelligence profile endpoint, the dashboard decision brief, the evidence trail, and the scenario outputs shown in the UI. The frontend presents the findings, while Coral performs the analysis behind them.

## Docker Stack

The project is containerized with Docker Compose for local development and demo deployment.

The compose file starts four services:

- `postgres` - PostgreSQL 16 with schema and seed SQL mounted at startup
- `redis` - Redis 7 for cache support
- `backend` - Fastify API built from the multi-stage `Dockerfile`
- `frontend` - Nginx serving the static dashboard files from the project root

Ports exposed by the stack:

- Frontend: `3000`
- Backend: `3001`
- PostgreSQL: `5432`
- Redis: `6379`

The backend container builds the TypeScript server, copies the compiled output into a production image, and exposes `/health` for container health checks.

## Technology Stack

### Frontend

- HTML5 for structure
- CSS3 for layout, responsiveness, and visual design
- Vanilla JavaScript for interaction and data rendering

### Backend

- Node.js
- Fastify
- TypeScript
- Zod for validation
- Pino for structured logging
- @fastify/cors, @fastify/helmet, and @fastify/rate-limit for API hardening

### Data and Infrastructure

- PostgreSQL for persistent relational storage
- Redis for cache support in the containerized stack
- Docker and Docker Compose for local orchestration
- Nginx for serving the static frontend in the Docker setup

## Key Features

- employee listing with filtering, pagination, and search
- employee detail and intelligence profile endpoints
- scenario simulation for different departure timelines
- knowledge transfer task planning
- dashboard metrics for executive-level summaries
- automatic database bootstrap on first backend start
- static hosting support for the frontend

## Project Structure

- `index.html` - main dashboard entry point
- `styles.css` - dashboard styling
- `app.js` - frontend logic and data binding
- `frontend/` - supporting React/Tailwind component scaffold
- `backend/src/server.ts` - Fastify server bootstrap
- `backend/src/routes/api-routes.ts` - REST API definitions
- `backend/src/services/coral-reasoning-engine.ts` - intelligence and simulation logic
- `backend/src/models/validation-schemas.ts` - request and response validation
- `backend/src/database/schema.sql` - database schema
- `backend/src/database/mock-data.sql` - seed data
- `docker-compose.yml` - local full-stack orchestration
- `Dockerfile` - backend container image

## Main API Endpoints

The backend exposes the following core routes under `/api/v1`:

- `GET /employees` - list employees with filters and pagination
- `POST /employees` - create a new employee and generate an initial analysis
- `GET /employees/:id` - fetch a single employee profile
- `GET /employees/:id/intelligence-profile` - consolidated intelligence view
- `POST /simulation/run` - run a single scenario simulation
- `POST /simulation/batch` - run multiple simulations in one request
- `GET /search` - fuzzy search across the dataset
- `POST /knowledge-transfer/plan` - create a transfer checklist
- `GET /dashboard/metrics` - executive dashboard metrics

## Database And Data Model

The data model is centered around employees, systems, permissions, and evidence. The schema includes tables for employee profiles, connected systems, system permissions, repositories, contributors, risk indicators, work tickets, communication events, knowledge-transfer tasks, scenario simulations, and audit logs.

The backend seeds realistic mock data so the dashboard can be used immediately without any manual database setup beyond running the stack.

## How To Run

### Full Stack With Docker

```bash
docker compose up --build
```

After startup, open:

- Frontend: http://localhost:3000
- Backend health: http://localhost:3001/health
- API example: http://localhost:3001/api/v1/employees?limit=3

The first startup may take longer while Docker builds the backend image and PostgreSQL initializes the schema and seed data.

### Backend Only

```bash
cd backend
npm install
npm run dev
```

The backend expects a PostgreSQL database at `DATABASE_URL`. If the required tables are missing, it will initialize them from the SQL files in `backend/src/database/`.

### Static Frontend Only

Open `index.html` directly in a browser or serve the project root with any static file server.

## Configuration

Useful environment variables include:

- `DATABASE_URL` - PostgreSQL connection string
- `PORT` - backend port, default `3001`
- `HOST` - bind address, default `0.0.0.0`
- `REDIS_URL` - Redis connection string when cache-backed flows are enabled
- `CORS_ORIGIN` - allowed frontend origin
- `REQUIRE_API_KEY` - enable API key checks when set to `true`
- `API_KEY_SECRET` - expected `x-api-key` value when API key checks are enabled

## Deployment Notes

- The static frontend can be hosted on Vercel, GitHub Pages, or any static host.
- The backend is intended for Docker or a Node.js runtime with PostgreSQL available.
- In the Docker stack, the frontend is served through Nginx and the backend connects to PostgreSQL and Redis through the compose network.

## Important Notes

- This project is a working demonstration platform, not a live enterprise system.
- The dataset is synthetic and intended for exploration, demos, and evaluation.
- The frontend is intentionally simple in architecture so the intelligence flow is easy to inspect and extend.

## Related Files

- [IMPLEMENTATION_GUIDE.md](IMPLEMENTATION_GUIDE.md) for the longer build and architecture notes
- [BUILD_SUMMARY.md](BUILD_SUMMARY.md) for the project delivery summary

## Deployed at - https://hr-helper-pink.vercel.app/
