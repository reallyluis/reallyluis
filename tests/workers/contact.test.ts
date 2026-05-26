import expect from "expect";
import { ALLOWED_ORIGIN, corsHeaders } from "../../workers/contact/src/index";

describe("corsHeaders", () => {
  test("restricts origin to the production domain", () => {
    expect(corsHeaders["Access-Control-Allow-Origin"]).toEqual(ALLOWED_ORIGIN);
    expect(corsHeaders["Access-Control-Allow-Origin"]).not.toEqual("*");
  });
});
