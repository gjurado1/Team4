const { contextBridge, ipcRenderer } = require("electron");
const { IPC_CHANNELS } = require("./channels.cjs");

contextBridge.exposeInMainWorld("electronAPI", {
  getAppInfo: () => ipcRenderer.invoke(IPC_CHANNELS.APP_INFO),
  openFile: () => ipcRenderer.invoke(IPC_CHANNELS.FILE_OPEN),
  saveFile: (content) => ipcRenderer.invoke(IPC_CHANNELS.FILE_SAVE, { content }),
  notify: (title, body) => ipcRenderer.invoke(IPC_CHANNELS.APP_NOTIFICATION, { title, body }),
  onMenuCommand: (callback) => {
    const listener = (_event, command) => callback(command);
    ipcRenderer.on(IPC_CHANNELS.MENU_COMMAND, listener);
    return () => ipcRenderer.removeListener(IPC_CHANNELS.MENU_COMMAND, listener);
  }
});
