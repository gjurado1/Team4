const { Menu, shell } = require("electron");
const { IPC_CHANNELS } = require("./channels.cjs");

function sendMenuCommand(mainWindow, command) {
  if (!mainWindow || mainWindow.isDestroyed()) return;
  mainWindow.webContents.send(IPC_CHANNELS.MENU_COMMAND, command);
}

function buildMenuTemplate(mainWindow) {
  return [
    {
      label: "File",
      submenu: [
        {
          label: "New Care Plan",
          accelerator: "CmdOrCtrl+N",
          click: () => sendMenuCommand(mainWindow, "file:new-care-plan")
        },
        {
          label: "Open...",
          accelerator: "CmdOrCtrl+O",
          click: () => sendMenuCommand(mainWindow, "file:open")
        },
        {
          label: "Save",
          accelerator: "CmdOrCtrl+S",
          click: () => sendMenuCommand(mainWindow, "file:save")
        },
        { type: "separator" },
        {
          label: "Print",
          accelerator: "CmdOrCtrl+P",
          click: () => mainWindow.webContents.print({})
        },
        { type: "separator" },
        {
          label: "Logout",
          accelerator: "CmdOrCtrl+L",
          click: () => sendMenuCommand(mainWindow, "app:logout")
        },
        { type: "separator" },
        {
          label: "Exit",
          role: "quit",
          accelerator: process.platform === "darwin" ? "Cmd+Q" : "Alt+F4"
        }
      ]
    },
    {
      label: "Edit",
      submenu: [
        { role: "undo", accelerator: "CmdOrCtrl+Z" },
        { role: "redo", accelerator: "CmdOrCtrl+Y" },
        { type: "separator" },
        { role: "cut", accelerator: "CmdOrCtrl+X" },
        { role: "copy", accelerator: "CmdOrCtrl+C" },
        { role: "paste", accelerator: "CmdOrCtrl+V" },
        { role: "selectAll", accelerator: "CmdOrCtrl+A" },
        { type: "separator" },
        {
          label: "Find",
          accelerator: "CmdOrCtrl+F",
          click: () => sendMenuCommand(mainWindow, "edit:find")
        }
      ]
    },
    {
      label: "View",
      submenu: [
        {
          label: "Settings",
          accelerator: "CmdOrCtrl+,",
          click: () => sendMenuCommand(mainWindow, "view:settings")
        },
        {
          label: "Help",
          accelerator: "F1",
          click: () => sendMenuCommand(mainWindow, "help:docs")
        },
        {
          label: "Keyboard Shortcuts",
          accelerator: "CmdOrCtrl+/",
          click: () => sendMenuCommand(mainWindow, "help:shortcuts")
        },
        { type: "separator" },
        { role: "reload" },
        { role: "forceReload" },
        { role: "toggleDevTools", accelerator: "CmdOrCtrl+Shift+I" },
        { type: "separator" },
        { role: "resetZoom", accelerator: "CmdOrCtrl+0" },
        { role: "zoomIn", accelerator: "CmdOrCtrl+=" },
        { role: "zoomOut", accelerator: "CmdOrCtrl+-" },
        { type: "separator" },
        { role: "togglefullscreen", accelerator: "F11" }
      ]
    },
    {
      label: "Help",
      submenu: [
        {
          label: "CareConnect Docs",
          click: () => sendMenuCommand(mainWindow, "help:docs")
        },
        {
          label: "Open Project Repository",
          click: () => shell.openExternal("https://electronjs.org/")
        },
        { type: "separator" },
        {
          label: "About CareConnect",
          click: () => {
            sendMenuCommand(mainWindow, "help:about");
          }
        }
      ]
    }
  ];
}

function createAppMenu(mainWindow) {
  const template = buildMenuTemplate(mainWindow);
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
  return menu;
}

module.exports = {
  buildMenuTemplate,
  createAppMenu
};
