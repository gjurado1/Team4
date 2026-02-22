import os from "node:os";
import fs from "node:fs";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { loadWindowState, saveWindowState, DEFAULT_STATE } from "../src/main/windowState.cjs";

describe("windowState", () => {
  let tempDir;

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "cc-window-state-"));
  });

  afterEach(() => {
    fs.rmSync(tempDir, { recursive: true, force: true });
  });

  it("returns defaults when no state exists", () => {
    const state = loadWindowState(tempDir);
    expect(state.width).toBe(DEFAULT_STATE.width);
    expect(state.height).toBe(DEFAULT_STATE.height);
  });

  it("persists and restores valid bounds", () => {
    saveWindowState(tempDir, { x: 10, y: 20, width: 1600, height: 1000 });
    const state = loadWindowState(tempDir);
    expect(state).toEqual({ x: 10, y: 20, width: 1600, height: 1000 });
  });
});
