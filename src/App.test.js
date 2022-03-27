import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";

test("renders", () => {
  render(<App />);
  const textElement = screen.getByText(/Loading/i);
  expect(textElement).toBeInTheDocument();
});
