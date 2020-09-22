const { app, BrowserWindow, globalShortcut } = require('electron')
const config = require('./config')

let win

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    titleBarStyle: 'hidden',
    //alwaysOnTop: true,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.setAlwaysOnTop(true)
  win.loadURL(config.url)
}

const toggleDevTools = () => win.webContents.toggleDevTools()

const createShortCuts = () => globalShortcut.register('CmdOrCtrl+J', toggleDevTools)

app.whenReady()
  .then(createWindow)
  .then(createShortCuts)

app.on('window-all-closed', () => (process.platform !== 'darwin') ? app.quit() : false)

app.on('activate', () => (BrowserWindow.getAllWindows().length === 0) ? createWindow() : false)

