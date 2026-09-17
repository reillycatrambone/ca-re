# Cloudflare migration

## State on 17 September 2026

The static application is live at https://ca-re.reillycatrambone.com on Cloudflare.
The preview remains at https://ca-re.reillycatrambone.workers.dev. The parent domain
now uses Cloudflare nameservers. Valid TLS and all 346 canonical-domain files have
been verified. The Vercel project was deleted at the owner's request on
17 September 2026 at 16:17 UTC. Its old addresses and transfer bridge are retired.

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

Before deletion, the bridge ran in deployment `dpl_674dEVyrboZhsxJZ5kWSA3nCvV2D`.
A live test with isolated, synthetic browser data proved
that answers, flags, position, and reload persistence survive the transfer.
An empty browser retains its path, query, and fragment at the new address.
The owner's current Chrome session followed the empty-session path to the
textbook. The owner then requested project deletion. The old `vercel.app` URLs
and transfer bridge are no longer available. Previously downloaded backups
still work on the Cloudflare `/transfer/` page.

## Verification completed

- Build, type check, and all 73 content/unit tests pass.
- All 84 existing browser checks pass against the remote Cloudflare Worker.
- Four additional browser checks cover transfer across origins, file backup,
  retained answers/flags/position, invalid backups, and persistence after reload.
- The complete 89-test browser suite passes in GitHub CI.
- All 346 final exported files were fetched and matched by SHA-256. The missing
  route returns the exported 404 page with HTTP 404.
- The same 346 files match through the real custom domain after cutover.
- The deployed Vercel bridge passes the live cross-origin session test.

Private settings snapshots, the original Git bundle, and verification results
are in `~/.codex/migration-ca-re-portfolio/` and `.migration/`. Neither directory
is committed. Recovery now requires a new deployment from the source backup.

## Vercel retirement

The parent domain's registrar remains Namecheap. Its nameservers are now
`harleigh.ns.cloudflare.com` and `joel.ns.cloudflare.com`. Cloudflare activated
the zone at 15:58 UTC on 17 September 2026. The zone binds `ca-re` to this Worker
and preserves the portfolio and photo-blog records. Both managed TLS and direct
custom-domain requests pass. The old Vercel DNS also points `ca-re` to the verified
Cloudflare addresses for resolvers with cached nameservers.

The Vercel deletion returned HTTP 204; a subsequent project lookup returned 404.
After deletion, the Cloudflare home, practice, and transfer pages still return
HTTP 200. Portfolio and photo redirects still preserve paths and query strings.
The source deployment identifiers above are historical; those deployments are
no longer rollback targets. `vercel.json` disables Git-triggered Vercel builds.
Do not delete any unrelated projects, domain registrations, or shared services.
