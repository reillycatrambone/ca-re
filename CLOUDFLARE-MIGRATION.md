# Cloudflare migration

## State on 17 September 2026

The static application is deployed at https://ca-re.reillycatrambone.workers.dev.
The intended canonical address is https://ca-re.reillycatrambone.com. Its domain
switch is pending Namecheap sign-in for the parent domain. Vercel still serves
`ca-re.vercel.app`; do not retire it until the custom domain passes its live checks.

- Source commit: `39926ef8803d1ff6d17acd1f7f82b8b37e70f062`.
- Vercel project: `ca-re`, `prj_XvtidKH3YPOOLAq17AMVrjXQnGhI`.
- Original deployment: `dpl_HJZ2PU9i18qCvur9Yr39P2LaWxqD`.
- Cloudflare account: `5f664f4b283ca81a3229fdf867feca19`.
- Worker/static assets: `ca-re`.
- Domain zone: `ca7b82995a49cc4eb3cf438c62a2ceb2`.

No server database, external storage, authentication, environment secret, or
scheduled job is used. Content, questions, images, and the search index are
published with the static export. Existing Sites metadata is retained for
reference; this deployment uses the owner's Cloudflare account and Wrangler.
No additional paid service was enabled.

## Build and deploy

Use Node 24 and the repository's pinned pnpm 11.22.0. The deployment command
builds the static export and uploads it with the explicit Worker configuration.

```sh
pnpm install --frozen-lockfile
pnpm typecheck
pnpm test
pnpm deploy:cloudflare
PLAYWRIGHT_BASE_URL=https://ca-re.reillycatrambone.workers.dev pnpm test:browser
```

The Wrangler build dependency `workerd` is explicitly allowed in
`pnpm-workspace.yaml`. Routes keep their trailing slash and use the exported
404 page. `lib/site.ts` supplies the new canonical URL to metadata, sitemap,
and robots output. No content or textbook design was changed.

## Browser-saved study progress

Progress is stored under `ca-re:study:v1` in the visitor's browser. A new hostname
cannot read storage from the old hostname. The `/transfer/` page accepts a
validated backup, retains answers, flags, question order, revisions, and position,
and requires a button click before replacing the current session. Backups can
also be downloaded and later restored without the old website.

The temporary Vercel retirement site in `scripts/vercel-retirement/` reads the
old-origin session and carries it to the new site's `/transfer/` page in a URL
fragment. The fragment is not sent to the server and is removed from browser
history when the page reads it. Visitors without a session continue to the same
path and query at the new address. The old saved copy is not deleted.

Deploy that bridge to the existing Vercel project only after the new custom
domain and the transfer page are verified. Keep it available while the owner
moves any wanted sessions. Deleting Vercel ends its `vercel.app` URLs and their
transfer bridge; a previously downloaded backup still works on Cloudflare.

## Verification completed

- Build, type check, and all 73 content/unit tests pass.
- All 84 existing browser checks pass against the remote Cloudflare Worker.
- Four additional browser checks cover transfer across origins, file backup,
  retained answers/flags/position, invalid backups, and persistence after reload.
- All 346 final exported files were fetched and matched by SHA-256. The missing
  route returns the exported 404 page with HTTP 404.

Private settings snapshots, the original Git bundle, and verification results
are in `~/.codex/migration-ca-re-portfolio/` and `.migration/`. Neither directory
is committed. The original Vercel production deployment is retained for rollback.

## Remaining cutover

The parent domain's registrar is Namecheap. Replace its four current nameservers
with `harleigh.ns.cloudflare.com` and `joel.ns.cloudflare.com` after sign-in.
The pending Cloudflare zone already binds `ca-re` to this Worker and preserves
the portfolio and photo-blog records. Confirm an active zone, valid TLS, all
routes/assets, and browser study behavior through the final custom domain.

Then activate the Vercel transfer bridge, verify the live transfer, and mark the
project safe to retire. `vercel.json` disables future Git-triggered Vercel builds.
Do not delete any unrelated projects, domain registrations, or shared services.
