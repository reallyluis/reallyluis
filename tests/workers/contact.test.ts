import expect from "expect";
import { corsHeaders } from "../../workers/contact/src/index";

describe("corsHeaders", () => {
  test("have cors headers", () => {
    expect(corsHeaders["Access-Control-Allow-Origin"]).toEqual("*");
  });
});
