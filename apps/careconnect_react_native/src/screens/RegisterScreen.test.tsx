import React from "react";
import { fireEvent, waitFor } from "@testing-library/react-native";

import { renderWithProviders } from "../test-utils/renderWithProviders";
import { RegisterScreen } from "./RegisterScreen";

const mockNavigate = jest.fn();
const mockCreateUser = jest.fn();

jest.mock("@react-navigation/native", () => ({
  ...jest.requireActual("@react-navigation/native"),
  useNavigation: () => ({
    navigate: mockNavigate,
    reset: jest.fn(),
    goBack: jest.fn(),
  }),
}));

jest.mock("../services/database", () => ({
  createUser: (...args: unknown[]) => mockCreateUser(...args),
  login: jest.fn(),
}));

describe("RegisterScreen", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    mockCreateUser.mockReset();
    mockCreateUser.mockResolvedValue(1);
  });

  it("shows an error when username or password is missing", () => {
    const { getByLabelText, getByText } = renderWithProviders(<RegisterScreen />);

    fireEvent.press(getByLabelText("Create Account"));

    expect(getByText("Please enter a username and password.")).toBeTruthy();
    expect(mockCreateUser).not.toHaveBeenCalled();
  });

  it("shows an error when the password is too short", () => {
    const { getByTestId, getByLabelText, getByText } = renderWithProviders(
      <RegisterScreen />
    );

    fireEvent.changeText(getByTestId("register-username"), "alice");
    fireEvent.changeText(getByTestId("register-password"), "123");
    fireEvent.changeText(getByTestId("register-confirm-password"), "123");
    fireEvent.press(getByLabelText("Create Account"));

    expect(getByText("Password must be at least 6 characters.")).toBeTruthy();
    expect(mockCreateUser).not.toHaveBeenCalled();
  });

  it("shows an error when the passwords do not match", () => {
    const { getByTestId, getByLabelText, getByText } = renderWithProviders(
      <RegisterScreen />
    );

    fireEvent.changeText(getByTestId("register-username"), "alice");
    fireEvent.changeText(getByTestId("register-password"), "password1");
    fireEvent.changeText(getByTestId("register-confirm-password"), "password2");
    fireEvent.press(getByLabelText("Create Account"));

    expect(getByText("Passwords do not match.")).toBeTruthy();
    expect(mockCreateUser).not.toHaveBeenCalled();
  });

  it("creates a user with trimmed credentials and clears the form", async () => {
    const { getByTestId, getByLabelText, getByText } = renderWithProviders(
      <RegisterScreen />
    );

    fireEvent.changeText(getByTestId("register-username"), "  alice  ");
    fireEvent.changeText(getByTestId("register-password"), "  secret1  ");
    fireEvent.changeText(getByTestId("register-confirm-password"), "  secret1  ");
    fireEvent.press(getByLabelText("Create Account"));

    await waitFor(() => {
      expect(mockCreateUser).toHaveBeenCalledWith({
        username: "alice",
        password: "secret1",
      });
    });

    expect(getByText("Account created. You can now sign in.")).toBeTruthy();
    expect(getByTestId("register-username").props.value).toBe("");
    expect(getByTestId("register-password").props.value).toBe("");
    expect(getByTestId("register-confirm-password").props.value).toBe("");
  });

  it("navigates back to the login screen", () => {
    const { getByLabelText } = renderWithProviders(<RegisterScreen />);

    fireEvent.press(getByLabelText("Back to Login"));

    expect(mockNavigate).toHaveBeenCalledWith("Login");
  });
});
