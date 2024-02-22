import assert from "node:assert";
import { describe, it } from "node:test";
import { buildHooksSystem } from "@css-hooks/core";
import { basic } from "./index.js";

type CSSProperties = {
  background?: string;
  color?: string;
};

const createHooks = buildHooksSystem<CSSProperties>();

const { css } = createHooks({
  hooks: {
    "&:enabled": "&:enabled",
    "&:hover": "&:hover",
    "&:active": "&:active",
  },
});

describe("basic(css) function", () => {
  it("given a simple rule returns the same value as the css function", () => {
    assert.deepStrictEqual(
      basic(css)({ background: "black", color: "white" }),
      css({ background: "black", color: "white" }),
    );
  });

  it("given a rule with a single condition returns the same value as the css function", () => {
    assert.deepStrictEqual(
      basic(css)({
        color: "black",
        "&:hover": {
          color: "blue",
        },
      }),
      css({
        color: "black",
        on: $ => [
          $("&:hover", {
            color: "blue",
          }),
        ],
      }),
    );
  });

  it("given a rule with nested conditions returns the same value as the css function", () => {
    assert.deepStrictEqual(
      basic(css)({
        color: "black",
        "&:enabled": {
          "&:hover": {
            color: "blue",
          },
        },
      }),
      css({
        color: "black",
        on: ($, { and }) => [
          $(and("&:enabled", "&:hover"), {
            color: "blue",
          }),
        ],
      }),
    );
  });

  it("given a rule with multiple conditions returns the same value as the css function", () => {
    assert.deepStrictEqual(
      basic(css)({
        color: "black",
        "&:hover": {
          color: "blue",
        },
        "&:active": {
          color: "red",
        },
      }),
      css({
        color: "black",
        on: $ => [
          $("&:hover", {
            color: "blue",
          }),
          $("&:active", {
            color: "red",
          }),
        ],
      }),
    );
  });

  it("given a rule with multiple nested conditions returns the same value as the css function", () => {
    assert.deepStrictEqual(
      basic(css)({
        color: "black",
        "&:enabled": {
          "&:hover": {
            color: "blue",
          },
          "&:active": {
            color: "red",
          },
        },
      }),
      css({
        color: "black",
        on: ($, { and }) => [
          $(and("&:enabled", "&:hover"), {
            color: "blue",
          }),
          $(and("&:enabled", "&:active"), {
            color: "red",
          }),
        ],
      }),
    );
  });

  it("accepts multiple rules", () => {
    assert.deepStrictEqual(
      basic(css)(
        {
          color: "black",
          "&:enabled": {
            "&:hover": {
              color: "blue",
            },
          },
        },
        {
          color: "black",
          "&:hover": {
            color: "blue",
          },
          "&:active": {
            color: "red",
          },
        },
      ),
      css(
        {
          color: "black",
          on: ($, { and }) => [
            $(and("&:enabled", "&:hover"), {
              color: "blue",
            }),
          ],
        },
        {
          color: "black",
          on: $ => [
            $("&:hover", {
              color: "blue",
            }),
            $("&:active", {
              color: "red",
            }),
          ],
        },
      ),
    );
  });

  it("allows subsequent rules to be undefined", () => {
    assert.deepStrictEqual(
      basic(css)({ color: "black" }, undefined),
      css({ color: "black" }, undefined),
    );
  });
});
