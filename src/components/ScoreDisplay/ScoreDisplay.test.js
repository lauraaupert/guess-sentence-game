import ScoreDisplay from "./index";
import { render } from "@testing-library/react";

describe("ScoreDisplay", () => {
  describe("render", () => {
    it("should render a container", () => {
      const container = render(<ScoreDisplay score={0} />);
      expect(container).toBeDefined();
    });
  });
  describe("display score", () => {
    it("should display the correct score", () => {
      const score = ScoreDisplay({ score: 0 });
      expect(score.props.children[0]).toBe("Score: ");
      expect(score.props.children[1]).toBe(0);
    });
  });
});
