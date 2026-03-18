import React from "react";
import { fireEvent } from "@testing-library/react-native";

import { renderWithProviders } from "../test-utils/renderWithProviders";
import { ForgotPasswordScreen } from "./ForgotPasswordScreen";

const mockNavigate = jest.fn();

jest.mock("@react-navigation/native", () => ({
  ...jest.requireActual("@react-navigation/native"),
  useNavigation: () => ({
    navigate: mockNavigate,
    reset: jest.fn(),
    goBack: jest.fn(),
  }),
}));

describe("ForgotPasswordScreen", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it("shows a success message when the reset flow is submitted", () => {
    const { getByTestId, getByLabelText, getByText } = renderWithProviders(
      <ForgotPasswordScreen />
    );

    fireEvent(getByTestId("forgot-password-email"), "submitEditing");
    expect(getByText("Password reset link sent! Please check your inbox.")).toBeTruthy();

    fireEvent.press(getByLabelText("Send reset link"));
    expect(getByText("Password reset link sent! Please check your inbox.")).toBeTruthy();
  });

  it("navigates back to login", () => {
    const { getByLabelText } = renderWithProviders(<ForgotPasswordScreen />);

    fireEvent.press(getByLabelText("Back to Login"));

    expect(mockNavigate).toHaveBeenCalledWith("Login");
  });
});
