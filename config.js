/**
 * Loom front marketing page configuration.
 *
 * - TAGLINE: Single h1 headline rendered in the hero section.
 * - SHOW_APPROVAL_TAGS: Controls visibility of the 3 "NEEDS SAMUEL'S APPROVAL"
 *   badges (pricing card, Terms of Service, Privacy Policy). Set to false once
 *   Samuel approves the fee wording and legal links.
 * - GOOGLE_START_URL: Full URL to `{API origin}/v1/auth/google/start`.
 *   Leave empty ("") until the hosted API origin is live; when empty, the
 *   "Continue with Google" button falls back to `/loom/sign-up` (which hosts
 *   its own Google button).
 * - LEGAL_LINKS_ENABLED: Keep false until Loom PR #19 (Terms & Privacy routes)
 *   is merged. When false, Terms and Privacy render as disabled links without
 *   an href attribute.
 */
const TAGLINE = "Sell with confidence. Run it your way.";
const SHOW_APPROVAL_TAGS = true;
const GOOGLE_START_URL = "";

const LEGAL_LINKS_ENABLED = false;
const TERMS_URL = "/loom/terms";
const PRIVACY_URL = "/loom/privacy";
const LOG_IN_URL = "/loom/sign-in";
const SIGN_UP_URL = "/loom/sign-up";

const LOOM_CONFIG = {
  TAGLINE: TAGLINE,
  SHOW_APPROVAL_TAGS: SHOW_APPROVAL_TAGS,
  GOOGLE_START_URL: GOOGLE_START_URL,
  LEGAL_LINKS_ENABLED: LEGAL_LINKS_ENABLED,
  TERMS_URL: TERMS_URL,
  PRIVACY_URL: PRIVACY_URL,
  LOG_IN_URL: LOG_IN_URL,
  SIGN_UP_URL: SIGN_UP_URL
};

function applyLoomConfig() {
  // 1. Render hero h1 tagline from TAGLINE config constant.
  const taglineEl = document.getElementById("hero-tagline");
  if (taglineEl && typeof TAGLINE === "string" && TAGLINE.trim() !== "") {
    const breakTarget = "Sell with confidence.";
    if (TAGLINE.startsWith(breakTarget)) {
      const rest = TAGLINE.slice(breakTarget.length).trim();
      taglineEl.innerHTML = "";
      const firstLine = document.createElement("span");
      firstLine.className = "tagline-line";
      firstLine.textContent = breakTarget;
      taglineEl.appendChild(firstLine);
      if (rest) {
        taglineEl.appendChild(document.createTextNode(" "));
        const secondLine = document.createElement("span");
        secondLine.className = "tagline-line";
        secondLine.textContent = rest;
        taglineEl.appendChild(secondLine);
      }
    } else {
      taglineEl.textContent = TAGLINE;
    }
  }

  // 2. Toggle the 3 approval tags behind SHOW_APPROVAL_TAGS.
  const approvalTags = document.querySelectorAll("[data-approval-tag]");
  approvalTags.forEach(function (tagEl) {
    if (SHOW_APPROVAL_TAGS) {
      tagEl.hidden = false;
    } else {
      tagEl.remove();
    }
  });

  // 3. Configure "Continue with Google" target.
  // Until the hosted API origin is decided, empty GOOGLE_START_URL links to
  // /loom/sign-up (which has its own Google button).
  const googleBtn = document.getElementById("google-start-btn");
  if (googleBtn) {
    const targetUrl =
      typeof GOOGLE_START_URL === "string" && GOOGLE_START_URL.trim() !== ""
        ? GOOGLE_START_URL.trim()
        : SIGN_UP_URL;
    googleBtn.setAttribute("href", targetUrl);
  }

  // 4. Configure Terms of Service and Privacy Policy links.
  const legalLinks = [
    { id: "terms-link", url: TERMS_URL },
    { id: "privacy-link", url: PRIVACY_URL }
  ];
  legalLinks.forEach(function (item) {
    const el = document.getElementById(item.id);
    if (!el) return;
    if (LEGAL_LINKS_ENABLED) {
      el.setAttribute("href", item.url);
      el.removeAttribute("aria-disabled");
      el.classList.remove("link-disabled");
    } else {
      el.removeAttribute("href");
      el.setAttribute("aria-disabled", "true");
      el.classList.add("link-disabled");
    }
  });
}

if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applyLoomConfig);
  } else {
    applyLoomConfig();
  }
}
