const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const fs = require('fs');
const ipc = ipcMain;

const createWindow = () => {
    const win = new BrowserWindow({
      width:                500,
      height:               700,
      frame:                false,
      transparent:          (process.platform != 'linux'),
      webPreferences: {
        nodeIntegration:    true,
        contextIsolation:   false,
        enableRemoteModule: true
      }
    });
  
    win.setResizable(false);
    win.loadFile('src/menu.html');

    ipc.on('minimizeApp', () => win.minimize());
    ipc.on('closeApp', () => win.close());

    ipc.on('saveNote', (event, content) => {
        dialog.showSaveDialog({
            title: 'Save Note',
            defaultPath: `note-${Date.now()}.txt`
        }).then(result => {
            fs.writeFile(result.filePath, content, (err) => {
                if (err) throw err;
            })
        })
    });

    ipc.on('loadNote', () => {
        dialog.showOpenDialog({
            title: 'Load Note',
            properties: ['openFile'],
            filters: [
                { name: 'Text Files', extensions: ['txt'] }
            ]
        }).then(result => {
            win.webContents.send('loadNoteBack', result.filePaths[0]);
        }).catch(err => {
            console.log(err);
        });
    })
};

app.whenReady().then(() => {
    createWindow();
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});