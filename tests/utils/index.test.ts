import { describe, expect, jest, test } from "@jest/globals";
import {
  buildThresholdList,
  capitalizeWord,
  debounce,
  getContent,
  getObserver,
  updateUrlHash,
} from "@utils/index";

describe("utils methods", () => {
  describe("buildThresholdList", () => {
    test("returns array of threshold values", () => {
      expect(buildThresholdList()).toEqual([
        0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1,
      ]);
    });
  });

  describe("capitalizeWord", () => {
    test("returns word capitalized", () => {
      expect(capitalizeWord("hello")).toEqual("Hello");
    });
  });

  describe("debounce", () => {
    test("call debounced function once", () => {
      jest.useFakeTimers();
      const func = jest.fn();
      const deFunc = debounce(func, 1000);

      deFunc();
      deFunc();
      deFunc();

      jest.runAllTimers();
      expect(func).toBeCalledTimes(1);
    });

    test("call function twice using immed", () => {
      jest.useFakeTimers();
      const func = jest.fn();
      const deFunc = debounce(func, 1000, true);

      deFunc();
      deFunc();
      deFunc();

      jest.runAllTimers();
      expect(func).toBeCalledTimes(2);
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

  describe("getObserver", () => {
    test("returns an IntersectionObserver", () => {
      const handleIntersect = jest.fn();
      const observer = getObserver(handleIntersect);

      expect(observer).toHaveProperty("observe");
    });
  });

  describe("updateUrlHash", () => {
    test("update url hash", () => {
      const newHash = "test";
      document.title = "Test Site - Home";

      updateUrlHash(newHash);

      expect(window.location.hash).toEqual("#test");
      expect(document.title).toEqual("Test Site - Test");
    });
  });
});
