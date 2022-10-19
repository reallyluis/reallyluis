import expect from "expect";
import { buildThresholdList } from "@utils/index";

describe("buildThresholdList", () => {
  test("returns array of threshold values", () => {
    expect(buildThresholdList()).toEqual([
      0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1,
    ]);
  });
});
