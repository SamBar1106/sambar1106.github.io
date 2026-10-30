# Loom Front Marketing Page (`sambar1106.github.io`)

Static front marketing page for **Loom**, published at `https://sambar1106.github.io/`.
The Loom application itself is served from `https://sambar1106.github.io/loom/`.

## Files

- `index.html` — Static semantic HTML structure and approved v4 marketing copy.
- `styles.css` — Responsive styles (phone 390px, iPad 1024px, desktop 1440px) using the approved Loom palette.
- `config.js` — Single configuration file for the hero headline, approval tags switch, Google OAuth start URL, and legal page links.
- `assets/loom-dash-hero-cropped.png` — Real cropped Loom dashboard screenshot used in the hero browser frame.
- `404.html` — Static fallback page.
- `.github/workflows/pages.yml` — GitHub Pages deployment workflow (runs on push to `main` or manual `workflow_dispatch` once Pages is enabled).

## Configuration (`config.js`)

All configurable values live at the top of `config.js`:

### 1. Changing `TAGLINE`

Update the `TAGLINE` constant in `config.js`:

```js
const TAGLINE = "Sell with confidence. Run it your way.";
```

`config.js` renders `TAGLINE` into the single `<h1>` (`#hero-tagline`) in the hero section.

### 2. Turning off `SHOW_APPROVAL_TAGS`

While fee wording and legal links await final sign-off, three `NEEDS SAMUEL'S APPROVAL` badges are shown (on the Pricing card and next to Terms of Service and Privacy Policy in the footer).

To hide and remove all three approval badges at once, set:

```js
const SHOW_APPROVAL_TAGS = false;
```

### 3. Switching on the legal links (Terms of Service & Privacy Policy)

Until Loom PR #19 is merged, Terms of Service and Privacy Policy render as disabled links (`aria-disabled="true"`, no `href`). Once `/loom/terms` and `/loom/privacy` are live, enable them in `config.js`:

```js
const LEGAL_LINKS_ENABLED = true;
const TERMS_URL = "/loom/terms";
const PRIVACY_URL = "/loom/privacy";
```

### 4. Setting the Google OAuth start URL (`GOOGLE_START_URL`)

Until the hosted API origin is live, `GOOGLE_START_URL` defaults to `""` and the "Continue with Google" button links to `/loom/sign-up` (which has its own Google button). Once the hosted API is up, set:

```js
const GOOGLE_START_URL = "https://<api-origin>/v1/auth/google/start";
```
