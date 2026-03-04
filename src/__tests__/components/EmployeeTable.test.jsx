/* eslint-disable no-undef */

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import EmployeeTable from "../../components/EmployeeTable";

// Mock employee data
const employees = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    mobile: "1234567890",
    countryId: 1,
  },
];

// Mock functions
const mockEdit = jest.fn();
const mockDelete = jest.fn();
const mockCountry = () => "USA";

describe("EmployeeTable", () => {

  // 1️⃣ Test: Render employee data
  test("renders employee information", () => {

    // Arrange
    render(
      <EmployeeTable
        employees={employees}
        getCountryName={mockCountry}
        onEdit={mockEdit}
        onDelete={mockDelete}
      />
    );

    // Assert
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("john@example.com")).toBeInTheDocument();
  });


  // 2️⃣ Test: Empty state
  test("shows message when no employees exist", () => {

    // Arrange
    render(
      <EmployeeTable
        employees={[]}
        getCountryName={mockCountry}
        onEdit={mockEdit}
        onDelete={mockDelete}
      />
    );

    // Assert
    expect(screen.getByText(/No Employees/i)).toBeInTheDocument();
  });


  // 3️⃣ Test: Edit button click
  test("calls onEdit when edit button clicked", async () => {

    // Arrange
    const user = userEvent.setup();

    render(
      <EmployeeTable
        employees={employees}
        getCountryName={mockCountry}
        onEdit={mockEdit}
        onDelete={mockDelete}
      />
    );

    // Act
    const editButton = screen.getAllByRole("button")[0];
    await user.click(editButton);

    // Assert
    expect(mockEdit).toHaveBeenCalledWith(1);
  });


  // 4️⃣ Test: Delete button click
  test("calls onDelete when delete button clicked and confirmed", async () => {
    // Arrange
    const user = userEvent.setup();

    render(
      <EmployeeTable
        employees={employees}
        getCountryName={mockCountry}
        onEdit={mockEdit}
        onDelete={mockDelete}
      />
    );

    // Act - Click delete button
    const deleteButton = screen.getAllByRole("button")[1];
    await user.click(deleteButton);

    // Wait for dialog to appear
    await waitFor(() => {
      expect(screen.getByText("Confirm Delete")).toBeInTheDocument();
    });

    // Get all buttons and find the Delete confirmation button in the dialog
    const allButtons = screen.getAllByRole("button");
    const deleteConfirmBtn = allButtons.find(
      (btn) =>
        btn.textContent === "Delete" && btn.closest('[role="dialog"]')
    );

    // Click the Delete confirmation button
    if (deleteConfirmBtn) {
      await user.click(deleteConfirmBtn);
    }

    // Assert
    expect(mockDelete).toHaveBeenCalled();
  });

});