import SentenceDisplay from "./index";
import { render } from "@testing-library/react";

describe("SentenceDisplay", () => {
  describe("render", () => {
    it("should render a container", () => {
      const container = render(
        <SentenceDisplay sentence="I like big books and I cannot lie" />
      );
      expect(container).toBeDefined();
    });
  });
  describe("scrambled sentence", () => {
    it("should return the scrambled sentence", () => {
      const testSentence = "I like big books and I cannot lie";
      const { queryByText } = render(
        <SentenceDisplay sentence={testSentence} />
      );
      const scrambledSentenceDiv = queryByText(/big/);
      expect(scrambledSentenceDiv).toBeTruthy();
      expect(scrambledSentenceDiv.textContent).not.toEqual(testSentence);
      expect(scrambledSentenceDiv.textContent.length).toEqual(
        testSentence.length
      );
    });
  });
});
