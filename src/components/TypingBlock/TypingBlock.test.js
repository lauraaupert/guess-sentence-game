import TypingBlock from "./index";
import { render } from "@testing-library/react";
import { SentenceProvider } from "../../utils/sentenceContext";

describe("TypingBlock", () => {
  describe("render", () => {
    it("should render a container", () => {
      const container = render(
        <SentenceProvider>
          <TypingBlock letter="a" index={0} />{" "}
        </SentenceProvider>
      );
      expect(container).toBeDefined();
    });
  });
  describe("block", () => {
    it("should have a max input length of 1", () => {
      const { getByTestId } = render(
        <SentenceProvider>
          <TypingBlock letter="a" index={0} />{" "}
        </SentenceProvider>
      );
      expect(getByTestId(/input-block/)).toHaveAttribute("maxLength");
      expect(getByTestId(/input-block/).maxLength).toBe(1);
    });
    it("should be in focus on load if index is 0", () => {
      const { queryByTestId } = render(
        <SentenceProvider>
          <TypingBlock letter="a" index={0} />{" "}
        </SentenceProvider>
      );
      expect(queryByTestId(/input-block/)).toBe(document.activeElement);
    });
  });
});
