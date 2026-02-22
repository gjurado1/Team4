import { describe, it, expect } from "vitest";
import { IPC_CHANNELS } from "../src/main/channels.cjs";

describe("IPC channel contract", () => {
  it("exposes stable channel names", () => {
    expect(IPC_CHANNELS.APP_INFO).toBe("app:info");
    expect(IPC_CHANNELS.FILE_OPEN).toBe("file:open");
    expect(IPC_CHANNELS.FILE_SAVE).toBe("file:save");
    expect(IPC_CHANNELS.MENU_COMMAND).toBe("app:menu-command");
    expect(IPC_CHANNELS.APP_NOTIFICATION).toBe("app:notify");
  });
});
