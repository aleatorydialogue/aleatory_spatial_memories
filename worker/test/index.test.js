import assert from "node:assert/strict";
import test from "node:test";

import worker from "../src/index.js";

function environment() {
  const sent = [];
  return {
    sent,
    EMAIL: {
      async send(message) {
        sent.push(message);
        return { messageId: "test-message" };
      },
    },
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
  const form = new URLSearchParams({
    name: "Ada Example",
    email: "ada@example.com",
    location: "New Haven",
    memory: "A family gathering in a meaningful old home.",
    details: "A quiet indoor scene.",
    scene_type: "people",
    contact_consent: "yes",
  });
  const response = await worker.fetch(
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

  assert.equal(response.status, 303);
  assert.equal(
    response.headers.get("location"),
    "https://rememberingpresence.com/?application=received#apply",
  );
  assert.equal(env.sent.length, 1);
  assert.equal(env.sent[0].replyTo, "ada@example.com");
});
