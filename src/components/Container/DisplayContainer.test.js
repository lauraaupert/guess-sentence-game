import React from "react";
import DisplayContainer from "./index";
import "@testing-library/jest-dom/extend-expect";
import { SentenceProvider } from "../../utils/sentenceContext";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";

describe("DisplayContainer", () => {
  describe("render", () => {
    it("should render a container", async () => {
      const container = render(
        <SentenceProvider>
          <DisplayContainer />
        </SentenceProvider>
      );
      await screen.findByText(/Score/);
      expect(container).toBeDefined();
    });
  });

  describe("next button", () => {
    it("should increment score when clicked", async () => {
      const { queryByText, queryAllByTestId } = render(
        <SentenceProvider>
          <DisplayContainer />
        </SentenceProvider>
      );

      await screen.findByText(/Score/);
      const blocks = queryAllByTestId(/input-block/);
      blocks.forEach((block) => {
        fireEvent.change(block, {
          target: { value: block.name },
        });
      });
      const originalScore = queryByText(/Score/);
      expect(originalScore.textContent).toBe("Score: 0");
      const nextButton = queryByText(/Next/);
      expect(nextButton).toBeTruthy();

      fireEvent.click(nextButton);

      await waitFor(() => {
        const newScore = queryByText(/Score:/);
        expect(newScore.textContent).toBe("Score: 1");
      });
    });
    it("should make a new API call with the currentSentence counter incremented when clicked", async () => {
      const { queryByText, queryByTestId, queryAllByTestId } = render(
        <SentenceProvider>
          <DisplayContainer />
        </SentenceProvider>
      );

      await screen.findByText(/Score/);
      const firstScrambledSentence = queryByTestId(/scrambled-sentence/)
        .textContent[0];
      const blocks = queryAllByTestId(/input-block/);
      blocks.forEach((block) => {
        fireEvent.change(block, {
          target: { value: block.name },
        });
      });
      const nextButton = queryByText(/Next/);
      expect(nextButton).toBeTruthy();
      fireEvent.click(nextButton);

      await waitFor(() => {
        const newScrambledSentence = queryByTestId(/scrambled-sentence/)
          .textContent[0];
        expect(newScrambledSentence).not.toBe(undefined);
        expect(newScrambledSentence).not.toBe(firstScrambledSentence);
      });
    });
  });

  describe("container", () => {
    it("should make API call and pass the same response to SentenceDisplay and TypingSection components as props", async () => {
      const { queryByTestId, queryAllByTestId } = render(
        <SentenceProvider>
          <DisplayContainer />
        </SentenceProvider>
      );

      await screen.findByTestId(/scrambled-sentence/);
      const blocks = queryAllByTestId(/input-block/);
      const sortedScrambledLetters = queryByTestId(/scrambled-sentence/)
        .textContent.split("")
        .sort();
      const sortedBlockLetters = queryAllByTestId(/input-block/)
        .map((a) => a.name)
        .sort();
      sortedBlockLetters.forEach((letter, index) => {
        expect(letter).toBe(sortedScrambledLetters[index]);
      });
      expect(blocks.length).toBe(
        queryByTestId(/scrambled-sentence/).textContent.length
      );
    });
    it("should render 'Loading...' if the API call has not been made yet", async () => {
      const { queryByText } = render(
        <SentenceProvider>
          <DisplayContainer />
        </SentenceProvider>
      );
      expect(queryByText(/Loading/)).toBeInTheDocument();
    });
  });
});
