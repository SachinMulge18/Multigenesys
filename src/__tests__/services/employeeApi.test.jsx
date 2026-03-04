/* eslint-disable no-undef */
import { employeeApi } from "../../services/employeeApi";

describe("employeeApi", () => {
  test("should have employee endpoints defined", () => {
    // Assert - Verify all expected endpoints exist
    expect(employeeApi.endpoints.getEmployee).toBeDefined();
    expect(employeeApi.endpoints.getEmployeeById).toBeDefined();
    expect(employeeApi.endpoints.createEmployee).toBeDefined();
    expect(employeeApi.endpoints.updateEmployee).toBeDefined();
    expect(employeeApi.endpoints.deleteEmployee).toBeDefined();
  });

  test("getEmployee endpoint should exist", () => {
    // Assert
    expect(employeeApi.endpoints.getEmployee).toBeDefined();
    expect(typeof employeeApi.endpoints.getEmployee.useQuery).toBe("function");
  });

  test("createEmployee endpoint should exist", () => {
    // Assert
    expect(employeeApi.endpoints.createEmployee).toBeDefined();
    expect(typeof employeeApi.endpoints.createEmployee.useMutation).toBe(
      "function"
    );
  });

  test("updateEmployee endpoint should exist", () => {
    // Assert
    expect(employeeApi.endpoints.updateEmployee).toBeDefined();
    expect(typeof employeeApi.endpoints.updateEmployee.useMutation).toBe(
      "function"
    );
  });

  test("deleteEmployee endpoint should exist", () => {
    // Assert
    expect(employeeApi.endpoints.deleteEmployee).toBeDefined();
    expect(typeof employeeApi.endpoints.deleteEmployee.useMutation).toBe(
      "function"
    );
  });
});