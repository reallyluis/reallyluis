import { describe, expect, test } from "@jest/globals";
import { corsHeaders } from "../../workers/contact/src/index";

describe("corsHeaders", () => {
  test("have cors headers", () => {
    expect(corsHeaders["Access-Control-Allow-Origin"]).toEqual("*");
  });
});
