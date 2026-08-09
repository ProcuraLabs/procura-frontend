# procura-frontend

> TypeScript / React / Vite frontend for **Procura** — a decentralized procurement &
> milestone-payment platform on Stellar / Soroban.

This repository is the web client for Procura: the organization and vendor dashboards
that guide users through publishing procurements, submitting proposals, funding
escrow, and approving milestones. All fund-moving actions are **signed in the user's
own wallet** — the app never sees a private key.

Procura is built as **three separate repositories**:

| Repo | Stack | Role |
|------|-------|------|
| [`procura-contracts`](https://github.com/ProcuraLabs/procura-contracts) | Rust / Soroban | Escrow + milestone state machine |
| [`procura-backend`](https://github.com/ProcuraLabs/procura-backend) | TypeScript / Node.js | Indexer, REST API, transaction builder |
| [`procura-frontend`](https://github.com/ProcuraLabs/procura-frontend) | TypeScript / React / Vite | Organization & vendor dashboards (this repo) |

> **Status: scaffold.** This repository currently contains project structure,
> tooling, and documentation only. The application has not been implemented yet.

---

## What the frontend does

- Renders **organization** and **vendor** dashboards from the backend read-model.
- Walks users through each on-chain action with a clear, human-readable confirmation
  before signing: fund escrow, submit milestone, approve/reject milestone, cancel.
- Delegates all signing to the user's wallet via **Stellar Wallets Kit** (Freighter,
  Albedo, xBull, Ledger, WalletConnect, …).
- Enforces a **network guard**: it refuses to sign unless the wallet's network matches
  the app's configured network, and always signs with an explicit network passphrase.

The canonical on-chain flow is: request an unsigned transaction from the backend →
show the user a plain-language summary → sign in the wallet → submit → poll for
confirmation → reconcile against the indexed read-model.

## Stack

| Component | Choice |
|-----------|--------|
| Framework | React 18 + Vite, TypeScript |
| Routing | React Router |
| Server state | TanStack Query |
| Wallet | `@creit.tech/stellar-wallets-kit` |
| Stellar | `@stellar/stellar-sdk` (v16) |
| UI | Tailwind CSS + shadcn/ui |
| API client | generated from the backend's OpenAPI document |
| Tests | Vitest + Testing Library; Playwright for E2E |

## Intended layout

```
procura-frontend/
├── src/
│   ├── app/          # router, providers, layout shells
│   ├── features/     # auth, procurements, proposals, engagements, wallet
│   ├── lib/          # generated API client, stellar helpers, formatting
│   └── components/   # shared UI primitives
├── test/             # Vitest component/unit tests
└── e2e/              # Playwright happy-path journeys
```

## Getting started (once implemented)

```bash
cp .env.example .env        # VITE_* public config only (no secrets)
pnpm install
pnpm dev                    # start the dev server (Vite)
pnpm test                   # Vitest
pnpm build                  # production build
```

## Environment & secrets

All frontend configuration is build-time and `VITE_`-prefixed — it ships to the
browser and therefore contains **public values only** (API base URL, network,
contract ids). **No secret is ever a `VITE_` variable.** See
[`.env.example`](./.env.example).

## Security

Keys never touch this app; signing happens in the wallet. See
[SECURITY.md](./SECURITY.md) to report a vulnerability privately.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md).

## License

Licensed under the [Apache License 2.0](./LICENSE).
