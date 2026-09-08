# Deployment and domain setup

The static site and application endpoint are separate deployments:

- `rememberingpresence.com` — Astro on GitHub Pages
- `forms.rememberingpresence.com` — Cloudflare Worker

## GitHub Pages

1. In the GitHub repository, open **Settings → Pages**.
2. Under **Build and deployment**, choose **GitHub Actions** as the source.
3. Under **Custom domain**, enter `rememberingpresence.com` and save it before changing DNS.
4. In Cloudflare DNS, remove any conflicting placeholder records for the apex and add four `A` records with name `@`:
   - `185.199.108.153`
   - `185.199.109.153`
   - `185.199.110.153`
   - `185.199.111.153`
5. Set these records to **DNS only** while GitHub provisions the site certificate.
6. Add a `CNAME` record named `www` targeting `aleatorydialogue.github.io`, also initially **DNS only**.
7. After DNS resolves and GitHub enables the option, select **Enforce HTTPS**.

Do not add a wildcard DNS record. DNS and TLS provisioning can take time.

## Resend email setup

Cloudflare's outbound Email Service currently requires the Workers paid plan. The v0 Worker therefore uses Resend's free transactional-email API.

1. Create a free Resend account.
2. Add `send.rememberingpresence.com` as a sending domain.
3. Add the DNS records Resend provides to the `rememberingpresence.com` zone in Cloudflare. Keep this sending subdomain separate from the GitHub Pages records and future inbound-email routing.
4. Wait until Resend reports the domain as verified.
5. Create a Resend API key restricted to sending access and copy it once.

The Worker sends from `applications@send.rememberingpresence.com` to `aleatorydialogue@gmail.com`. It sets the applicant's address as Reply-To. Resend's current free plan allows 3,000 emails per month and 100 per day, with 30-day data retention.

Cloudflare Email Routing can separately forward `hello@rememberingpresence.com` to Gmail when desired; it is not required for application delivery.

## Worker deployment credentials

1. In Cloudflare, copy the **Account ID** for the account holding the domain.
2. Create a narrowly scoped API token using the **Edit Cloudflare Workers** template, limited to this account and the `rememberingpresence.com` zone.
3. In GitHub, open **Settings → Secrets and variables → Actions** and add repository secrets:
   - `CLOUDFLARE_ACCOUNT_ID`
   - `CLOUDFLARE_API_TOKEN`
   - `RESEND_API_KEY`
4. Open **Actions → Deploy application Worker → Run workflow**.
5. Confirm `https://forms.rememberingpresence.com/health` returns JSON with `"ok": true`.

The Worker configuration creates the `forms.rememberingpresence.com` custom domain. Do not create a competing DNS record for `forms` manually.

## End-to-end verification

1. Visit `https://rememberingpresence.com` in a private browser window.
2. Confirm the form button is enabled.
3. Submit a clearly labeled test application.
4. Confirm the page returns to the form with a success message.
5. Confirm the message arrives at `aleatorydialogue@gmail.com` and that Reply targets the applicant address.
6. Delete the test message when finished.

The site deployment workflow runs automatically on `main`. The Worker workflow remains manual so ordinary content changes cannot redeploy the intake system unexpectedly.
