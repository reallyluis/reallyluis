import { describe, expect, test } from "@jest/globals";
import { capitalizeWord, getContent } from "@utils/index";

describe("utils methods", () => {
  describe("capitalizeWord", () => {
    test("returns word capitalized", () => {
      expect(capitalizeWord("hello")).toEqual("Hello");
    });
  });

  describe("getContent", () => {
    test("returns an IntersectionObserver", async () => {
      const contentAPI = "http://localhost";
      const { abouts, skills, works } = await getContent(contentAPI);

      expect(abouts).toEqual({});
      expect(skills).toEqual({});
      expect(works).toEqual({});
    });
  });
});
