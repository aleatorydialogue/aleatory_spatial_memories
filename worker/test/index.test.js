import assert from "node:assert/strict";
import test from "node:test";

import worker from "../src/index.js";

function environment() {
  return {
    DESTINATION_EMAIL: "aleatorydialogue@gmail.com",
    SENDER_EMAIL: "applications@send.rememberingpresence.com",
    RESEND_API_KEY: "test-key",
    APPLICATION_RATE_LIMITER: {
      async limit() {
        return { success: true };
      },
    },
  };
}

test("health endpoint reports ready", async () => {
  const response = await worker.fetch(
    new Request("https://forms.rememberingpresence.com/health"),
    environment(),
  );

  assert.equal(response.status, 200);
  assert.equal((await response.json()).ok, true);
});

test("rejects submissions from another origin", async () => {
  const response = await worker.fetch(
    new Request("https://forms.rememberingpresence.com/apply", {
      method: "POST",
      headers: {
        origin: "https://example.com",
        "content-type": "application/x-www-form-urlencoded",
      },
      body: "name=Example",
    }),
    environment(),
  );

  assert.equal(response.status, 403);
});

test("emails a valid application and redirects safely", async () => {
  const env = environment();
  const originalFetch = globalThis.fetch;
  let emailRequest;
  globalThis.fetch = async (request, init) => {
    emailRequest = { request, init };
    return Response.json({ id: "test-message" });
  };
  const form = new URLSearchParams({
    name: "Ada Example",
    email: "ada@example.com",
    location: "New Haven",
    memory: "A family gathering in a meaningful old home.",
    details: "A quiet indoor scene.",
    scene_type: "people",
    contact_consent: "yes",
  });
  let response;
  try {
    response = await worker.fetch(
      new Request("https://forms.rememberingpresence.com/apply", {
        method: "POST",
        headers: {
          origin: "https://rememberingpresence.com",
          "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        body: form,
      }),
      env,
    );
  } finally {
    globalThis.fetch = originalFetch;
  }

  assert.equal(response.status, 303);
  assert.equal(
    response.headers.get("location"),
    "https://rememberingpresence.com/?application=received#apply",
  );
  assert.equal(emailRequest.request, "https://api.resend.com/emails");
  assert.equal(emailRequest.init.headers.authorization, "Bearer test-key");
  const message = JSON.parse(emailRequest.init.body);
  assert.equal(message.reply_to, "ada@example.com");
  assert.deepEqual(message.to, ["aleatorydialogue@gmail.com"]);
});
