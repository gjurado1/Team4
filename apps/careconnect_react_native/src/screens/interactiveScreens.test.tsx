import React from "react";
import { act, fireEvent, waitFor } from "@testing-library/react-native";

import { renderWithProviders } from "../test-utils/renderWithProviders";
import { CaregiverDashboardScreen } from "./CaregiverDashboardScreen";
import { MedicationsScreen } from "./MedicationsScreen";
import { PatientCheckInScreen } from "./PatientCheckInScreen";
import { PatientDashboardScreen } from "./PatientDashboardScreen";
import { ProfileScreen } from "./ProfileScreen";
import { SymptomsScreen } from "./SymptomsScreen";

const mockNavigate = jest.fn();
const mockReset = jest.fn();
const mockLogout = jest.fn();
let mockRole: "caregiver" | "patient" | null = "patient";

jest.mock("@react-navigation/native", () => ({
  ...jest.requireActual("@react-navigation/native"),
  useNavigation: () => ({
    navigate: mockNavigate,
    reset: mockReset,
    goBack: jest.fn(),
  }),
}));

jest.mock("../components/navigation/AppLayout", () => ({
  AppLayout: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

jest.mock("../context/AuthContext", () => ({
  useAuth: () => ({
    role: mockRole,
    login: jest.fn(),
    logout: mockLogout,
  }),
}));

describe("interactive screens", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    mockReset.mockClear();
    mockLogout.mockReset();
    mockLogout.mockResolvedValue(undefined);
    mockRole = "patient";
  });

  it("adds symptoms with severity and ignores blank entries", () => {
    const nowSpy = jest.spyOn(Date, "now").mockReturnValue(12345);
    const { getAllByLabelText, getByLabelText, getByText } = renderWithProviders(
      <SymptomsScreen />
    );

    fireEvent.changeText(getByLabelText("Symptom"), "   ");
    fireEvent.press(getByLabelText("Add"));
    expect(getAllByLabelText(/LOW|MEDIUM/)).toHaveLength(2);

    fireEvent.press(getByLabelText("High"));
    fireEvent.changeText(getByLabelText("Symptom"), "Nausea");
    fireEvent.press(getByLabelText("Add"));

    expect(getByText("Nausea")).toBeTruthy();
    expect(getByLabelText("HIGH")).toBeTruthy();
    expect(getByLabelText("Symptom").props.value).toBe("");

    nowSpy.mockRestore();
  });

  it("updates medication toggle state", () => {
    const { getAllByLabelText } = renderWithProviders(
      <MedicationsScreen />
    );

    fireEvent(getAllByLabelText("Mark as taken")[0], "valueChange", true);

    expect(getAllByLabelText("Mark as not taken")).toHaveLength(2);
  });

  it("handles patient dashboard actions", () => {
    const { getByLabelText } = renderWithProviders(<PatientDashboardScreen />);

    fireEvent.press(getByLabelText("Good"));
    expect(getByLabelText("Good").props.accessibilityState.selected).toBe(true);

    fireEvent.press(getByLabelText("Start Check-In"));
    fireEvent.press(getByLabelText("Symptoms"));
    fireEvent.press(getByLabelText("Medications"));

    expect(mockNavigate).toHaveBeenNthCalledWith(1, "PatientCheckIn");
    expect(mockNavigate).toHaveBeenNthCalledWith(2, "Symptoms");
    expect(mockNavigate).toHaveBeenNthCalledWith(3, "Medications");
  });

  it("handles patient check-in submission and back navigation", async () => {
    const { UNSAFE_getByProps, getByLabelText } = renderWithProviders(
      <PatientCheckInScreen />
    );
    const submitButton = UNSAFE_getByProps({ accessibilityLabel: "Submit Check-In" });

    await act(async () => {
      submitButton.props.onPress();
    });
    expect(mockReset).not.toHaveBeenCalled();

    fireEvent.press(getByLabelText("Great"));
    fireEvent.changeText(
      getByLabelText("Any symptoms or notes?"),
      "Feeling better after resting."
    );
    fireEvent.press(getByLabelText("Submit Check-In"));
    fireEvent.press(getByLabelText("Back"));

    expect(mockReset).toHaveBeenCalledWith({
      index: 0,
      routes: [{ name: "PatientDashboard" }],
    });
    expect(mockNavigate).toHaveBeenCalledWith("PatientDashboard");
  });

  it("handles caregiver dashboard shortcuts", () => {
    const { getByLabelText } = renderWithProviders(<CaregiverDashboardScreen />);

    fireEvent.press(getByLabelText("Schedule"));
    fireEvent.press(getByLabelText("All Patients"));
    fireEvent.press(getByLabelText("Open patient list for Sarah Johnson"));

    expect(mockNavigate).toHaveBeenNthCalledWith(1, "Schedule");
    expect(mockNavigate).toHaveBeenNthCalledWith(2, "PatientList");
    expect(mockNavigate).toHaveBeenNthCalledWith(3, "PatientList");
  });

  it("shows the current role and logs out from the profile screen", async () => {
    mockRole = "caregiver";
    const { getByLabelText, getByText } = renderWithProviders(<ProfileScreen />);

    expect(getByText("caregiver")).toBeTruthy();

    fireEvent.press(getByLabelText("Accessibility Settings"));
    fireEvent.press(getByLabelText("Logout"));

    expect(mockNavigate).toHaveBeenCalledWith("Settings");

    await waitFor(() => {
      expect(mockLogout).toHaveBeenCalled();
    });

    expect(mockReset).toHaveBeenCalledWith({
      index: 0,
      routes: [{ name: "Login" }],
    });
  });
});
