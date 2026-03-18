import React from "react";
import { fireEvent, waitFor } from "@testing-library/react-native";

import { renderWithProviders } from "../test-utils/renderWithProviders";
import { LoginScreen } from "./LoginScreen";

const mockNavigate = jest.fn();
const mockReset = jest.fn();
const mockLogin = jest.fn();
const mockDbLogin = jest.fn();

jest.mock("@react-navigation/native", () => ({
  ...jest.requireActual("@react-navigation/native"),
  useNavigation: () => ({
    navigate: mockNavigate,
    reset: mockReset,
    goBack: jest.fn(),
  }),
}));

jest.mock("../context/AuthContext", () => ({
  useAuth: () => ({
    role: null,
    login: mockLogin,
    logout: jest.fn(),
  }),
}));

jest.mock("../services/database", () => ({
  login: (...args: unknown[]) => mockDbLogin(...args),
  createUser: jest.fn(),
}));

describe("LoginScreen", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    mockReset.mockClear();
    mockLogin.mockReset();
    mockLogin.mockResolvedValue(undefined);
    mockDbLogin.mockReset();
  });

  it("shows error when missing fields", () => {
    const { getByLabelText, getByTestId, getByText } = renderWithProviders(<LoginScreen />);

    fireEvent.press(getByLabelText("Sign In"));

    expect(getByTestId("app-alert-error")).toBeTruthy();
    expect(getByText("Please enter both username and password.")).toBeTruthy();
  });

  it("shows an error when credentials are invalid", async () => {
    mockDbLogin.mockResolvedValue(null);

    const { getByTestId, getByLabelText, getByText } = renderWithProviders(<LoginScreen />);

    fireEvent.changeText(getByTestId("login-username"), "alice");
    fireEvent.changeText(getByTestId("login-password"), "wrongpass");
    fireEvent.press(getByLabelText("Sign In"));

    await waitFor(() => {
      expect(mockDbLogin).toHaveBeenCalledWith("alice", "wrongpass");
    });

    expect(getByText("Invalid username or password. Please try again.")).toBeTruthy();
    expect(mockLogin).not.toHaveBeenCalled();
  });

  it("logs in caregivers and resets to the caregiver dashboard", async () => {
    mockDbLogin.mockResolvedValue({ username: "caregiverUser" });

    const { getByTestId, getByLabelText } = renderWithProviders(<LoginScreen />);

    fireEvent.changeText(getByTestId("login-username"), "caregiverUser");
    fireEvent.changeText(getByTestId("login-password"), "secret123");
    fireEvent.press(getByLabelText("Sign In"));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        username: "caregiverUser",
        role: "caregiver",
      });
    });

    expect(mockReset).toHaveBeenCalledWith({
      index: 0,
      routes: [{ name: "CaregiverDashboard" }],
    });
  });

  it("logs in patients and resets to the patient dashboard", async () => {
    mockDbLogin.mockResolvedValue({ username: "testpatient" });

    const { getByTestId, getByLabelText } = renderWithProviders(<LoginScreen />);

    fireEvent.changeText(getByTestId("login-username"), "testpatient");
    fireEvent.changeText(getByTestId("login-password"), "secret123");
    fireEvent.press(getByLabelText("Sign In"));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        username: "testpatient",
        role: "patient",
      });
    });

    expect(mockReset).toHaveBeenCalledWith({
      index: 0,
      routes: [{ name: "PatientDashboard" }],
    });
  });

  it("navigates to Register", () => {
    const { getByLabelText } = renderWithProviders(<LoginScreen />);

    fireEvent.press(getByLabelText("Create Account"));
    expect(mockNavigate).toHaveBeenCalledWith("Register");
  });

  it("navigates to ForgotPassword", () => {
    const { getByLabelText } = renderWithProviders(<LoginScreen />);

    fireEvent.press(getByLabelText("Forgot Password?"));
    expect(mockNavigate).toHaveBeenCalledWith("ForgotPassword");
  });

  it("supports demo account shortcuts and accessibility settings navigation", async () => {
    const { getByLabelText, getByText } = renderWithProviders(<LoginScreen />);

    fireEvent.press(getByText(/Patient Account/));
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        username: "testpatient",
        role: "patient",
      });
    });

    expect(mockReset).toHaveBeenCalledWith({
      index: 0,
      routes: [{ name: "PatientDashboard" }],
    });

    mockLogin.mockClear();
    mockReset.mockClear();

    fireEvent.press(getByText(/Caregiver Account/));
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        username: "demo",
        role: "caregiver",
      });
    });

    expect(mockReset).toHaveBeenCalledWith({
      index: 0,
      routes: [{ name: "CaregiverDashboard" }],
    });

    fireEvent.press(getByLabelText("Accessibility Settings"));
    expect(mockNavigate).toHaveBeenCalledWith("Settings");
  });
});
