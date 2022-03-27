import TextDisplay from "./index";
import { render } from "@testing-library/react";

describe("TextDisplay", () => {
  describe("render", () => {
    it("should render a container", () => {
      const container = render(
        <TextDisplay textOne="Hello" textTwo="Goodbye" />
      );
      expect(container).toBeDefined();
    });
  });
  describe("text display", () => {
    it("should return props text", () => {
      const { queryByText } = render(
        <TextDisplay textOne="Hello" textTwo="Goodbye" />
      );
      expect(queryByText(/Hello/)).toBeInTheDocument();
    });
  });
});
