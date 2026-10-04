// 99names · Noor · the threshold
// Vercel Edge Middleware. /gate is the airlock page, a signed cookie is the
// clearance. Same mechanism as the Smart Temple hall, with the lab's own key.
//
//   username  99names
//   password  noor
//
// Flow
//   GET  anything without a valid key  -> 302 to /gate?next=<where you were going>
//   GET  /gate                         -> the gate page (rewritten to /gate.html)
//   POST /gate                         -> checks the key, sets the cookie, then
//                                         JSON {ok:true,next} for fetch() callers or
//                                         303 to next for a plain form post
//   GET  /leave                        -> clears the cookie, back to the gate
//
// The cookie is an HMAC-SHA256 of user:pass under SECRET, so it cannot be
// forged without the secret and it never carries the password itself.

export const config = {
  matcher: "/:path*",
};

const USER = "99names";
const PASS = "noor";
const SECRET = "noor-2026-light-by-name-ninety-nine-rays-no-streaks-no-guilt";
const COOKIE = "noor_key";
const MAX_AGE = 60 * 60 * 24 * 30; // thirty days

// Paths that must be reachable before the key is held.
const OPEN = [
  /^\/gate(\.html)?$/,
  /^\/hub\/favicon\.svg$/,        // the favicon on the threshold
  /^\/social\/quiet\/out\/media\//,  // the quiet months' post media: Metricool fetches these to publish them
];

const enc = new TextEncoder();

async function sign(value) {
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(value));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function readCookie(request, name) {
  const raw = request.headers.get("cookie") || "";
  for (const part of raw.split(";")) {
    const [k, ...v] = part.trim().split("=");
    if (k === name) return decodeURIComponent(v.join("="));
  }
  return "";
}

function setCookie(value, maxAge) {
  return `${COOKIE}=${value}; Path=/; Max-Age=${maxAge}; HttpOnly; Secure; SameSite=Lax`;
}

function safeNext(value) {
  // Only ever send people to a path on this site.
  if (!value || typeof value !== "string") return "/";
  if (!value.startsWith("/") || value.startsWith("//") || value.startsWith("/gate") || value.startsWith("/leave")) return "/";
  return value;
}

function wantsJSON(request) {
  const accept = request.headers.get("accept") || "";
  return accept.includes("application/json") || request.headers.get("x-requested-with") === "fetch";
}

function rewrite(request, to) {
  const headers = new Headers();
  headers.set("x-middleware-rewrite", new URL(to, request.url).toString());
  return new Response(null, { headers });
}

function redirect(request, to, status = 302, extraHeaders = {}) {
  const headers = new Headers({ Location: new URL(to, request.url).toString() });
  for (const [k, v] of Object.entries(extraHeaders)) headers.set(k, v);
  return new Response(null, { status, headers });
}

export default async function middleware(request) {
  const url = new URL(request.url);
  const path = url.pathname;
  const expected = await sign(`${USER}:${PASS}`);

  // Leaving the lab.
  if (path === "/leave") {
    return redirect(request, "/gate", 302, { "Set-Cookie": setCookie("", 0) });
  }

  // Presenting the key.
  if (path === "/gate" && request.method === "POST") {
    let user = "";
    let pass = "";
    let next = "/";
    const type = request.headers.get("content-type") || "";
    try {
      if (type.includes("application/json")) {
        const body = await request.json();
        user = String(body.user || "");
        pass = String(body.pass || "");
        next = String(body.next || "/");
      } else {
        const form = await request.formData();
        user = String(form.get("user") || "");
        pass = String(form.get("pass") || "");
        next = String(form.get("next") || "/");
      }
    } catch (e) {
      // fall through with empty credentials
    }
    next = safeNext(next);
    const ok = user.trim().toLowerCase() === USER && pass === PASS;

    if (wantsJSON(request)) {
      const headers = new Headers({ "content-type": "application/json", "cache-control": "no-store" });
      if (ok) headers.set("Set-Cookie", setCookie(expected, MAX_AGE));
      return new Response(JSON.stringify(ok ? { ok: true, next } : { ok: false }), {
        status: ok ? 200 : 401,
        headers,
      });
    }
    if (ok) return redirect(request, next, 303, { "Set-Cookie": setCookie(expected, MAX_AGE) });
    return redirect(request, `/gate?denied=1&next=${encodeURIComponent(next)}`, 303);
  }

  const token = readCookie(request, COOKIE);
  const holdsKey = Boolean(token) && token === expected;

  // The gate itself and the few things it needs. Anyone already holding the
  // key walks straight through to where they were going.
  if (path === "/gate") {
    if (holdsKey && !url.searchParams.has("again")) return redirect(request, safeNext(url.searchParams.get("next")), 302);
    return rewrite(request, "/gate.html");
  }
  if (OPEN.some((re) => re.test(path))) return;

  // Holding the key: continue to the requested page or asset.
  if (holdsKey) return;

  // No key. Pages go to the gate; bare assets get a plain 401.
  const accept = request.headers.get("accept") || "";
  const isNavigation = request.method === "GET" && accept.includes("text/html");
  if (isNavigation) {
    const next = path === "/" ? "" : `?next=${encodeURIComponent(path + url.search)}`;
    return redirect(request, `/gate${next}`, 302);
  }
  return new Response("The threshold is closed.", {
    status: 401,
    headers: { "content-type": "text/plain", "cache-control": "no-store" },
  });
}
