import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { normalizeEthNameInput } from "../src/hooks/name-availability.ts";

describe("normalizeEthNameInput", () => {
  it("normalizes a plain label", () => {
    assert.deepEqual(normalizeEthNameInput("  VITALIK  "), {
      isValid: true,
      label: "vitalik",
      name: "vitalik.eth",
    });
  });

  it("normalizes a full second-level .eth name", () => {
    assert.deepEqual(normalizeEthNameInput("VITALIK.ETH"), {
      isValid: true,
      label: "vitalik",
      name: "vitalik.eth",
    });
  });

  it("normalizes valid unicode labels", () => {
    assert.deepEqual(normalizeEthNameInput("Nàme.eth"), {
      isValid: true,
      label: "nàme",
      name: "nàme.eth",
    });
  });

  it("reports empty input as idle-compatible validation state", () => {
    assert.deepEqual(normalizeEthNameInput("  "), {
      isValid: false,
      error: {
        code: "empty",
        message: "Enter an ENS name.",
      },
    });
  });

  it("rejects names that fail ENSIP-15 normalization", () => {
    const result = normalizeEthNameInput("name_with_underscore");

    assert.equal(result.isValid, false);
    if (!result.isValid) assert.equal(result.error.code, "invalid-name");
  });

  it("rejects non-.eth names", () => {
    const result = normalizeEthNameInput("vitalik.xyz");

    assert.equal(result.isValid, false);
    if (!result.isValid) assert.equal(result.error.code, "unsupported-tld");
  });

  it("rejects subnames", () => {
    const result = normalizeEthNameInput("sub.vitalik.eth");

    assert.equal(result.isValid, false);
    if (!result.isValid) {
      assert.equal(result.error.code, "subname-not-supported");
    }
  });

  it("enforces the registry's 255-byte label limit", () => {
    const maximumLabel = "a".repeat(255);
    assert.equal(normalizeEthNameInput(maximumLabel).isValid, true);

    const result = normalizeEthNameInput("a".repeat(256));
    assert.equal(result.isValid, false);
    if (!result.isValid) assert.equal(result.error.code, "label-too-long");
  });
});
