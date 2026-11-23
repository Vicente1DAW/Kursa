# Contributing to Kursa

## Branches

- `main` contains production-ready code and is protected.
- `develop` is the integration branch for completed work.
- `feature/<issue>-<slug>`, `fix/<issue>-<slug>` and `docs/<slug>` are short-lived branches created from `develop`.
- `hotfix` is kept aligned with `main` and is reserved for urgent, small production fixes. After a hotfix, merge the fix to `main` and back to `develop`, then reset `hotfix` to `main`.

Do not push directly to `main`. Open pull requests and request at least one teammate's review. The GitHub branch rules are configured in the repository settings.

## Pull request workflow

1. Create or update the issue for the change.
2. Update `develop` and create a branch from it.
3. Make focused commits using Conventional Commits, for example `fix(auth): handle expired refresh token`.
4. Run the checks for every app you changed; see [Quality](QUALITY.md).
5. Open a pull request to `develop`, describe the change, link the issue and request a review.
6. Merge `develop` into `main` through a reviewed release pull request when ready for production.

## App commands

Run commands from the relevant app directory:

```bash
cd apps/frontend
npm ci
npm test
npm run build
npm run lint
```

```bash
cd apps/backend
npm ci
npm test
npm run build
```

Never commit `.env`, credentials, `node_modules` or build output. Keep `.env.example` current without putting real secret values in it.
