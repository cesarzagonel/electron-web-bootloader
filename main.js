const electron = require('electron');
const package = require('./package.json');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow;
const createMainWindow = function(){
    mainWindow = new BrowserWindow({width: 800, height: 600});
    mainWindow.loadURL(package.entrypoint);
    mainWindow.on('closed', () => mainWindow = null);
};

app.on('ready', createMainWindow);

app.on('window-all-closed', function(){
    /**
     * On OS X it is common for applications and their menu bar
     * to stay active until the user quits explicitly with Cmd + Q
     */
    if(process.platform !== 'darwin'){
        app.quit()
    }
});

app.on('activate', function () {
    /**
     * On OS X it's common to re-create a window in the app when the
     * dock icon is clicked and there are no other windows open.
     */
    if(mainWindow === null) {
        createMainWindow();
    }
});
