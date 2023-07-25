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

    ipcMain.on("get:isPackaged", (event) => {
        event.returnValue = app.isPackaged;
    })
}

const createWindow = () => {
    const win = new BrowserWindow({
        backgroundColor: "#212121",
        width: 800,
        minWidth: 400,
        height: 600,
        minHeight: 300,
        frame: false,
        title: "Echo Whisperer",
        icon: path.join(__dirname, './icon.ico'),
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            preload: path.join(__dirname, './preload.js')
        }
    });

    Menu.setApplicationMenu(null);
    win.loadFile("index.html");
    // win.webContents.openDevTools();
    listeners(win);
};

app.whenReady().then(() => {
    createWindow();
});