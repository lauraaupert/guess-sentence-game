import TypingSection from "./index";
import { fireEvent, render } from "@testing-library/react";
import { SentenceProvider } from "../../utils/sentenceContext";

describe("TypingSection", () => {
  describe("render", () => {
    it("should render a container", () => {
      const container = render(
        <SentenceProvider>
          <TypingSection sentence="I like big books and I cannot lie" />
        </SentenceProvider>
      );
      expect(container).toBeDefined();
    });
  });

  describe("Typing Blocks", () => {
    it("should have as many blocks as the sentence length", () => {
      const testSentence = "I like big books and I cannot lie";
      const { queryAllByTestId } = render(
        <SentenceProvider>
          <TypingSection sentence={testSentence} />
        </SentenceProvider>
      );
      const blocks = queryAllByTestId(/input-block/);
      expect(blocks.length).toEqual(testSentence.length);
    });

    it("should have the same id as its position in the string", () => {
      const testSentence = "I like big books and I cannot lie";
      const { queryAllByTestId } = render(
        <SentenceProvider>
          <TypingSection sentence={testSentence} />{" "}
        </SentenceProvider>
      );
      const blocks = queryAllByTestId(/input-block/);
      blocks.forEach((block, index) => {
        expect(block.id).toEqual(index.toString());
      });
    });
    it("should have the same name as the letter it is associated with", () => {
      const testSentence = "I like big books and I cannot lie";
      const { queryAllByTestId } = render(
        <SentenceProvider>
          <TypingSection sentence={testSentence} />{" "}
        </SentenceProvider>
      );
      const blocks = queryAllByTestId(/input-block/);
      blocks.forEach((block, index) => {
        expect(block.name).toEqual(testSentence[index].toLowerCase());
      });
    });
    it("should be yellow if it is a space", () => {
      const testSentence = "I like big books and I cannot lie";
      const { queryAllByTestId } = render(
        <SentenceProvider>
          <TypingSection sentence={testSentence} />{" "}
        </SentenceProvider>
      );
      const blocks = queryAllByTestId(/input-block/);
      blocks.forEach((block) => {
        if (block.name === " ") {
          expect(block.style.backgroundColor).toBe("rgb(255, 183, 77)");
        }
      });
    });
    it("should be light grey if it is a letter", () => {
      const testSentence = "I like big books and I cannot lie";
      const { queryAllByTestId } = render(
        <SentenceProvider>
          <TypingSection sentence={testSentence} />{" "}
        </SentenceProvider>
      );
      const blocks = queryAllByTestId(/input-block/);
      blocks.forEach((block) => {
        if (block.name !== " ") {
          expect(block.style.backgroundColor).toBe("rgb(225, 225, 225)");
        }
      });
    });
    it("should change to green if user input is correct", () => {
      const testSentence = "I like big books and I cannot lie";
      const { queryAllByTestId } = render(
        <SentenceProvider>
          <TypingSection sentence={testSentence} />{" "}
        </SentenceProvider>
      );
      const blocks = queryAllByTestId(/input-block/);
      blocks.forEach((block, index) => {
        if (block.name === " ") {
          expect(block.style.backgroundColor).toBe("rgb(255, 183, 77)");
        } else {
          expect(block.style.backgroundColor).toBe("rgb(225, 225, 225)");
        }
        fireEvent.change(block, { target: { value: testSentence[index] } });
        expect(block.style.backgroundColor).toBe("rgb(76, 175, 80)");
      });
    });
    it("should shift focus to next typing block once maxLength is reached", () => {
      const testSentence = "I like big books and I cannot lie";
      const { queryAllByTestId } = render(
        <SentenceProvider>
          <TypingSection sentence={testSentence} />{" "}
        </SentenceProvider>
      );
      const blocks = queryAllByTestId(/input-block/);
      blocks.forEach((block, index) => {
        expect(block).toBe(document.activeElement);
        fireEvent.change(block, { target: { value: testSentence[index] } });
        if (index < blocks.length - 1) {
          expect(block === document.activeElement).toBe(false);
          expect(blocks[index + 1]).toBe(document.activeElement);
        }
      });
    });
  });

  describe("next button", () => {
    it("should not appear if user input is incomplete", () => {
      const testSentence = "I like big books and I cannot lie";
      const { queryByText } = render(
        <SentenceProvider>
          <TypingSection sentence={testSentence} />{" "}
        </SentenceProvider>
      );
      const button = queryByText(/Next/);
      expect(button).not.toBeInTheDocument();
    });
    it("should not appear if the sentence is not correct", () => {
      const testSentence = "I like big books and I cannot lie";
      const incorrectInput = "Do not mess with my flying carpets";
      const { queryAllByTestId, queryByText } = render(
        <SentenceProvider>
          <TypingSection sentence={testSentence} />{" "}
        </SentenceProvider>
      );
      const blocks = queryAllByTestId(/input-block/);
      blocks.forEach((block, index) => {
        fireEvent.change(block, { target: { value: incorrectInput[index] } });
        if (index === testSentence.length - 1) {
          const button = queryByText(/Next/);
          expect(button).not.toBeInTheDocument();
        }
      });
    });
    it("should appear if the sentence is an empty string", () => {
      const testSentence = "";
      const { queryByText } = render(
        <SentenceProvider>
          <TypingSection sentence={testSentence} />{" "}
        </SentenceProvider>
      );
      const button = queryByText(/Next/);
      expect(button).toBeTruthy();
    });
    it("should appear if all the typing blocks' input is correct", () => {
      const testSentence = "I like big books and I cannot lie";
      const { queryAllByTestId, queryByText } = render(
        <SentenceProvider>
          <TypingSection sentence={testSentence} />{" "}
        </SentenceProvider>
      );
      const blocks = queryAllByTestId(/input-block/);
      blocks.forEach((block, index) => {
        fireEvent.change(block, { target: { value: testSentence[index] } });
        if (index === testSentence.length - 1) {
          const button = queryByText(/Next/);
          expect(button).toBeTruthy();
        }
      });
    });
  });
});
