/* eslint-disable no-undef */
import { countryApi } from "../../services/countryApi";

describe("countryApi", () => {
  test("should have getCountries endpoint", () => {
    // Assert
    expect(countryApi.endpoints.getCountries).toBeDefined();
  });

  test("getCountries endpoint should have useQuery hook", () => {
    // Assert
    expect(typeof countryApi.endpoints.getCountries.useQuery).toBe(
      "function"
    );
  });

  test("countryApi should be defined and have endpoints", () => {
    // Assert
    expect(countryApi).toBeDefined();
    expect(countryApi.endpoints).toBeDefined();
    expect(countryApi.reducerPath).toBeDefined();
  });
});