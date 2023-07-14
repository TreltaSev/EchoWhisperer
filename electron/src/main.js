const {BrowserWindow, app} = require("electron");
const path = require('path');

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        resizable: false,
        webPreferences: {
            preload: path.join(__dirname, './src/preload.js')
        }
    });

    win.loadFile("index.html");
};

app.whenReady().then(() => {
    createWindow();
});