const { app, BrowserWindow, globalShortcut } = require('electron')
const config = require('./config')

let win

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    titleBarStyle: 'hidden',
    title: config.url,
    //alwaysOnTop: true,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true
    }
  })

  //  app.dock.hide();
  // "floating" + 1 is higher than all regular windows, but still behind things 
  // like spotlight or the screen saver
  win.setAlwaysOnTop(true, "floating", 1);
  // allows the window to show over a fullscreen window
  win.setVisibleOnAllWorkspaces(true);
  //win.setAlwaysOnTop(true)
  win.loadURL(config.url)
}

const toggleDevTools = () => win.webContents.toggleDevTools()

const createShortCuts = () => globalShortcut.register('CmdOrCtrl+J', toggleDevTools)

app.whenReady()
  .then(createWindow)
  .then(createShortCuts)

app.on('window-all-closed', () => (process.platform !== 'darwin') ? app.quit() : false)

app.on('activate', () => (BrowserWindow.getAllWindows().length === 0) ? createWindow() : false)


// avoid "Electron Security Warning"
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

