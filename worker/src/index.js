const SITE_ORIGIN = "https://rememberingpresence.com";
const ALLOWED_ORIGINS = new Set([
  SITE_ORIGIN,
  "https://www.rememberingpresence.com",
]);
const DESTINATION = "aleatorydialogue@gmail.com";
const SENDER = "applications@rememberingpresence.com";
const MAX_BODY_BYTES = 16_000;

const limits = {
  name: 120,
  email: 254,
  location: 160,
  memory: 1_500,
  details: 1_000,
};

function redirect(state) {
  return Response.redirect(`${SITE_ORIGIN}/?application=${state}#apply`, 303);
}

function clean(value, maximum) {
  return String(value ?? "")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .trim()
    .slice(0, maximum);
}

function validEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function formatApplication(data, request) {
  const submittedAt = new Date().toISOString();
  const country = request.cf?.country ?? "Unknown";

  return [
    "New Remembering Presence Founding Capture application",
    "",
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Location: ${data.location}`,
    `Scene type: ${data.sceneTypes.length ? data.sceneTypes.join(", ") : "Not specified"}`,
    "",
    "What they want to remember:",
    data.memory,
    "",
    "Timing and practical details:",
    data.details || "Not provided",
    "",
    `Submitted: ${submittedAt}`,
    `Country reported by Cloudflare: ${country}`,
    "",
    "Reply directly to this email to contact the applicant.",
  ].join("\n");
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === "GET" && url.pathname === "/health") {
      return Response.json(
        { ok: true, service: "remembering-presence-form" },
        { headers: { "cache-control": "no-store" } },
      );
    }

    if (request.method !== "POST" || url.pathname !== "/apply") {
      return new Response("Not found", { status: 404 });
    }

    const origin = request.headers.get("origin");
    if (!origin || !ALLOWED_ORIGINS.has(origin)) {
      return new Response("Forbidden", { status: 403 });
    }

    const contentType = request.headers.get("content-type") ?? "";
    if (!contentType.startsWith("application/x-www-form-urlencoded")) {
      return new Response("Unsupported media type", { status: 415 });
    }

    const contentLength = Number(request.headers.get("content-length") ?? "0");
    if (contentLength > MAX_BODY_BYTES) {
      return new Response("Request too large", { status: 413 });
    }

    const clientKey =
      request.headers.get("cf-connecting-ip") ?? "unknown-client";
    const rateLimit = await env.APPLICATION_RATE_LIMITER.limit({
      key: clientKey,
    });
    if (!rateLimit.success) {
      return new Response("Please wait before trying again", {
        status: 429,
        headers: { "retry-after": "60" },
      });
    }

    let form;
    try {
      form = await request.formData();
    } catch {
      return redirect("error");
    }

    if (clean(form.get("company_website"), 200)) {
      return redirect("received");
    }

    const data = {
      name: clean(form.get("name"), limits.name),
      email: clean(form.get("email"), limits.email).toLowerCase(),
      location: clean(form.get("location"), limits.location),
      memory: clean(form.get("memory"), limits.memory),
      details: clean(form.get("details"), limits.details),
      sceneTypes: form
        .getAll("scene_type")
        .map((value) => clean(value, 40))
        .filter(Boolean),
    };

    if (
      !data.name ||
      !validEmail(data.email) ||
      !data.location ||
      data.memory.length < 20 ||
      form.get("contact_consent") !== "yes"
    ) {
      return redirect("error");
    }

    try {
      await env.EMAIL.send({
        to: DESTINATION,
        from: {
          email: SENDER,
          name: "Remembering Presence applications",
        },
        replyTo: data.email,
        subject: `Founding Capture application — ${data.name}`,
        text: formatApplication(data, request),
      });
      return redirect("received");
    } catch (error) {
      console.error("Application email failed", {
        code: error?.code ?? "unknown",
      });
      return redirect("error");
    }
  },
};
