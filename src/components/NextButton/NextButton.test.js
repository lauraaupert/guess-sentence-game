import NextButton from "./index";
import { fireEvent, render } from "@testing-library/react";
import DisplayContainer from "../Container";

describe("NextButton", () => {
  describe("render", () => {
    it("should render a button", () => {
      const button = render(<NextButton>Next</NextButton>);
      expect(button).toBeDefined();
    });
    describe("button text", () => {
      it("should display text and be in focus", () => {
        const button = NextButton();
        expect(button.props.children).toBe("Next");
      });
    });
    describe("button style", () => {
      it("should be in autofocus", () => {
        const button = NextButton();
        expect(button.props.autoFocus).toBe(true);
      });
      it("should be green", () => {
        const button = NextButton();
        expect(button.props.style.backgroundColor).toBe("#388e3c");
      });
    });
  });
});
