# Cloudflare migration

## State on 17 September 2026

The static application is live at https://ca-re.reillycatrambone.com on Cloudflare.
The preview remains at https://ca-re.reillycatrambone.workers.dev. The parent domain
now uses Cloudflare nameservers. Valid TLS and all 346 canonical-domain files have
been verified. `ca-re.vercel.app` now serves the temporary session-transfer bridge.

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

The bridge is active in deployment `dpl_674dEVyrboZhsxJZ5kWSA3nCvV2D` on the
existing Vercel project. A live test with isolated, synthetic browser data proved
that answers, flags, position, and reload persistence survive the transfer.
An empty browser retains its path, query, and fragment at the new address.
The owner's current Chrome session followed the empty-session path to the
textbook. Keep the bridge available while the owner
moves any wanted sessions. Deleting Vercel ends its `vercel.app` URLs and their
transfer bridge; a previously downloaded backup still works on Cloudflare.

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
is committed. The original Vercel production deployment is retained for rollback.

## Vercel retirement

The parent domain's registrar remains Namecheap. Its nameservers are now
`harleigh.ns.cloudflare.com` and `joel.ns.cloudflare.com`. Cloudflare activated
the zone at 15:58 UTC on 17 September 2026. The zone binds `ca-re` to this Worker
and preserves the portfolio and photo-blog records. Both managed TLS and direct
custom-domain requests pass. The old Vercel DNS also points `ca-re` to the verified
Cloudflare addresses for resolvers with cached nameservers.

The Cloudflare application no longer needs the Vercel project. Before deleting
the project, visit `https://ca-re.vercel.app` in each browser with wanted saved
progress and restore that session, or download a backup. Deletion ends the old
links and the temporary bridge. The source deployment is retained for rollback;
promote `dpl_HJZ2PU9i18qCvur9Yr39P2LaWxqD` to restore the old application while the
project still exists. `vercel.json` disables future Git-triggered Vercel builds.
Do not delete any unrelated projects, domain registrations, or shared services.
