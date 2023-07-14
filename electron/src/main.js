const {BrowserWindow, app, Menu, ipcMain} = require("electron");
const path = require('path');
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = true;

const listeners = (window) => {
    ipcMain.on("window:close", () => {
        window.close();
    });

    ipcMain.on("window:minimize", () => {
        window.minimize();
    });
}

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        resizable: false,
        frame: false,
        title: "Echo Whisperer",
        icon: path.join(__dirname, './icon.ico'),
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
            preload: path.join(__dirname, './preload.js')
        }
    });

    Menu.setApplicationMenu(null);
    win.loadFile("index.html");
    win.webContents.openDevTools();
    listeners(win);
};

app.whenReady().then(() => {
    createWindow();
});