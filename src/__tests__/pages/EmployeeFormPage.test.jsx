/* eslint-disable no-undef */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

// Mock RTK Query hooks to avoid needing a Redux Provider
jest.mock("../../services/countryApi", () => ({
  useGetCountriesQuery: () => ({ data: [], isLoading: false }),
}));

jest.mock("../../services/employeeApi", () => ({
  useCreateEmployeeMutation: () => [jest.fn(), { isLoading: false }],
  useGetEmployeeByIdQuery: () => ({ data: null, isLoading: false }),
  useUpdateEmployeeMutation: () => [jest.fn(), { isLoading: false }],
}));

import EmployeeFormPage from "../../pages/EmployeeFormPage";
import { BrowserRouter } from "react-router-dom";

describe("EmployeeFormPage", () => {

  test("renders employee form fields", () => {

    // Arrange
    render(
      <BrowserRouter>
        <EmployeeFormPage />
      </BrowserRouter>
    );

    // Assert
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Mobile/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Country/i)).toBeInTheDocument();

  });


  test("shows validation error when submitting empty form", async () => {

    // Arrange
    const user = userEvent.setup();

    render(
      <BrowserRouter>
        <EmployeeFormPage />
      </BrowserRouter>
    );

    const submitBtn = screen.getByRole("button", { name: /(Save|Add Employee)/i });

    // Act
    await user.click(submitBtn);

    // Assert
    expect(await screen.findByText(/Name is Required/i)).toBeInTheDocument();

  });


  test("allows user to type into input fields", async () => {

    // Arrange
    const user = userEvent.setup();

    render(
      <BrowserRouter>
        <EmployeeFormPage />
      </BrowserRouter>
    );

    const nameInput = screen.getByLabelText(/Name/i);

    // Act
    await user.type(nameInput, "Sachin");

    // Assert
    expect(nameInput).toHaveValue("Sachin");

  });

});