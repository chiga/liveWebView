const { app, BrowserWindow, globalShortcut } = require('electron')
const config = require('./config')

let win

function createWindow() {
  // Cria uma janela de navegação.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    //titleBarStyle: 'hidden',
    alwaysOnTop: true,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // e carrega o arquivo index.html do seu aplicativo.
  //win.loadFile('index.html')
  win.loadURL(config.url)

  // Abrir o DevTools (aba de ferramentas para desenvolvedores).
  //win.webContents.openDevTools()
}

function toggleDevTools() {
  win.webContents.toggleDevTools()
}

function createShortCuts() {
  globalShortcut.register('CmdOrCtrl+J', toggleDevTools)
}

// Este método será chamado quando Electron terminar de inicializar
// e também estiver pronto para criar novas janelas do navegador.
// Algumas APIs podem ser usadas somente depois que este evento ocorre.
app.whenReady()
  .then(createWindow)
  .then(createShortCuts)

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// Nesse arquivo, você pode incluir o resto do código principal
// de processos do seu aplicativo.
// Você também pode colocar eles em arquivos separados e requeridos-as aqui.
