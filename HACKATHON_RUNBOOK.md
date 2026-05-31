# WCIR Hackathon Runbook

## One-command demo

```bash
docker compose up --build
```

Open:

- Frontend: http://localhost:3000
- Backend health: http://localhost:3001/health
- API metrics: http://localhost:3001/api/v1/dashboard/metrics

## Judge narrative

WCIR answers a high-value executive question: "What breaks if a critical employee leaves or becomes an insider risk?"

The demo should show:

1. Select Sarah Johnson in the dashboard.
2. Explain the executive decision brief: exposure, action window, and affected systems.
3. Switch scenario tabs to show immediate versus full-transfer impact.
4. Point to the dependency graph and evidence ledger as explainability.
5. Hit the backend API to prove the UI is backed by deployable services.

## API smoke tests

```bash
curl http://localhost:3001/health
curl http://localhost:3001/api/v1/employees?limit=3
curl http://localhost:3001/api/v1/dashboard/metrics
```

## Why it is compelling

- Clear buyer: CISO, CTO, CHRO, risk/compliance teams.
- Clear pain: single points of failure and insider-risk blind spots.
- Clear moat: multi-source evidence joining across code, tickets, IAM, comms, and documentation.
- Clear action: successor ranking and transfer-plan generation.

## Production notes

- Replace the synthetic seed data with real connectors for GitHub, Jira, Slack, IAM, and documentation sources.
- Put API auth in front of all `/api/v1/*` routes before exposing outside a private network.
- Store secrets in a managed vault, not `.env` files.
- Run Postgres with managed backups and retention policies.
