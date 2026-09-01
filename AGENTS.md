# Next.js Website Instructions

## Role

This is the incomplete Next.js modernization of the public website. It is not currently the public source of truth and must not silently redefine or omit approved content.

## Stack and checks

- Next.js, React, TypeScript, Mantine, and ESLint.
- Run `npm run lint` for relevant changes.
- Run `npm run build` before declaring a deployable milestone.
- Keep route, component, responsive, accessibility, and content parity explicit.

## Migration rules

- Use `../website/` as the current page/design reference and private docs as the technical-claim authority.
- Review content during migration; do not blindly preserve placeholders or overclaims.
- Do not declare feature parity until the criteria in `../docs/architecture/website.md` are met.
- Avoid unnecessary duplication of large media assets; document the eventual asset strategy.
- Do not configure deployment, a remote, or a production cutover without explicit approval.

## Relevant documentation

- `../docs/architecture/website.md`
- `../docs/website/claims-and-evidence.md`
- `../docs/program/status.md`
