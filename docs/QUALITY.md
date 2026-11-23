# Kursa quality policy

Run the relevant checks before opening a pull request. Changes that affect both apps must pass both sets of checks.

## Required checks

| App | Tests | Build | Lint |
| --- | --- | --- | --- |
| Frontend | `cd apps/frontend && npm test` | `cd apps/frontend && npm run build` | `cd apps/frontend && npm run lint` |
| Backend | `cd apps/backend && npm test` | `cd apps/backend && npm run build` | Not currently configured |

GitHub Actions runs the app checks for pull requests to `main` and deploys only after checks pass on `main`.

## Shared requirements

- Add or update tests when changing application behavior.
- Do not introduce secrets, debug logging or unexplained dependencies.
- Update documentation when behavior, setup, APIs, schemas or environment variables change.
- Use Conventional Commits and request at least one review for every pull request.

## Frontend requirements

- Keep TypeScript strict, validate form input with Zod and use accessible, responsive UI patterns.
- Preserve or improve coverage for changed code; target at least 70% coverage for new modules.
- Run `npm run test:coverage` when changing substantial frontend logic.

## Backend requirements

- Validate external input with Zod before using it.
- Keep the route → middleware → controller → service → database layering.
- Do not log credentials or sensitive data; use the application logger.
- Preserve or improve coverage for changed code; target at least 70% coverage for new modules.

## Definition of done

- [ ] Relevant tests and builds pass; frontend lint passes when frontend files changed.
- [ ] Tests cover new or changed behavior.
- [ ] The pull request has at least one approval and references its issue.
- [ ] No secrets or unnecessary dependencies were added.
- [ ] Relevant documentation was updated.
