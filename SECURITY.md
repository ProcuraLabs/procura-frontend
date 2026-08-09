# Security Policy

Procura's frontend guides users through signing financial transactions. It never
handles private keys — signing happens inside the user's wallet — but a compromised
or misleading frontend could trick a user into signing something they didn't intend.
That makes frontend security reports important.

## Supported versions

Procura is pre-release (testnet). Security fixes are applied to the `main` branch.

## Reporting a vulnerability

**Please do not open a public GitHub issue for security vulnerabilities.**

Report privately through one of:

- **GitHub Security Advisories** — the
  ["Report a vulnerability"](https://github.com/ProcuraLabs/procura-frontend/security/advisories/new)
  button on this repository's *Security* tab (preferred).
- **Email** — `security@procuralabs.example` (replace with the real contact before
  launch).

Include a description, impact, reproduction steps, and affected commit/route.

## What to expect

- Acknowledgement within **3 business days**.
- A severity assessment and coordinated disclosure timeline.
- Credit for reporters who wish to be named.

## Scope

In scope:

- **Transaction/clickjacking spoofing** — anything that causes the app to show the
  user a transaction summary that does not match what the wallet is asked to sign.
- **Network confusion** — paths that could get a transaction signed against the wrong
  Stellar network, or without an explicit network passphrase.
- XSS, dependency-based supply-chain risks, `postMessage`/wallet-bridge issues.
- Leakage of session tokens or user data.

Out of scope:

- Vulnerabilities in wallet extensions themselves (report to the wallet vendor).
- Attacks requiring a compromised user device or wallet secret.

## Keys and secrets

This app holds **no private keys**. All signing is delegated to the user's wallet.
Frontend configuration is build-time `VITE_*` public values only — never put a secret
in a `VITE_` variable, since it ships to the browser. `.gitignore` excludes `.env*`.
If you believe a secret was committed, rotate it and notify the maintainers.
