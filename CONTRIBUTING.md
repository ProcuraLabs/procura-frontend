# Contributing to procura-frontend

Thanks for contributing to Procura's web client. This app is how organizations and
vendors interact with the on-chain escrow contract, so the bar for the signing
experience in particular is high.

## Principles that shape reviews

- **Sign what you see.** Before every signature, the UI must show a human-readable
  summary (action, engagement, milestone, amount, payee) derived from the *same*
  transaction the wallet is asked to sign. Never ask a user to sign opaque data.
- **Never touch keys.** All signing goes through the wallet (Stellar Wallets Kit).
  The app must never request, store, or handle a secret key or seed.
- **Network guard is mandatory.** On-chain actions must go through the shared
  sign-and-submit path, which refuses to sign on a network mismatch and always passes
  an explicit network passphrase.
- **No secrets in the bundle.** Only public `VITE_*` config ships to the browser.

## Development environment

You will need Node.js 22 LTS and `pnpm`.

```bash
cp .env.example .env
pnpm install
pnpm dev          # Vite dev server
pnpm test         # Vitest
pnpm build        # production build
```

The app talks to a running `procura-backend`. Point `VITE_API_BASE_URL` at it.

## Checks that must pass

```bash
pnpm lint         # eslint
pnpm typecheck    # tsc --noEmit
pnpm test         # Vitest component/unit tests
```

- The API client under `src/lib/api` is **generated** from the backend's OpenAPI
  document — do not hand-edit it. Regenerate when the API changes; CI checks for
  drift.
- New on-chain actions must reuse the single sign-and-submit choke point so
  confirmation UX, the network guard, and error decoding stay consistent.
- Money is formatted using the token's decimals (7 dp) — never with floating-point
  arithmetic on raw amounts.

## Commit & PR conventions

- Conventional Commits encouraged (`feat:`, `fix:`, `test:`, `docs:`, `chore:`).
- Keep PRs focused; include screenshots for UI changes and note any impact on the
  signing flow.

## Secrets

Never commit `.env` files or any credential. `.gitignore` excludes `.env*` (except
`.env.example`). No secret belongs in a `VITE_` variable.

## License

By contributing, you agree your contributions are licensed under the
[Apache License 2.0](./LICENSE).
