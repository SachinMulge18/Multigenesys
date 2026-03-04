/* eslint-disable no-undef */
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

describe("LoadingSpinner", () => {

  test("renders loading spinner with default message", () => {

    // Arrange
    render(<LoadingSpinner />);

    // Assert
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });


  test("renders custom message when provided", () => {

    // Arrange
    render(<LoadingSpinner message="Fetching data..." />);

    // Assert
    expect(screen.getByText("Fetching data...")).toBeInTheDocument();
  });


  test("renders circular progress indicator", () => {

    // Arrange
    render(<LoadingSpinner />);

    // Assert
    const spinner = screen.getByRole("progressbar");
    expect(spinner).toBeInTheDocument();
  });

});