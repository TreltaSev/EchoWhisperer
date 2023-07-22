const {BrowserWindow, app, Menu, ipcMain} = require("electron");
const path = require('path');
const os = require('os');
const fs = require("fs");
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
        width: 800,
        height: 600,
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
    win.webContents.openDevTools();
    listeners(win);
};

app.whenReady().then(() => {
    createWindow();
});