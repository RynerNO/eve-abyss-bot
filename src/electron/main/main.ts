import {join} from 'path';
import {app, BrowserWindow, ipcMain} from 'electron';
import {KeyListener} from 'node-native-win-utils';
import {uiBuildHangar} from './bot';
import {captureAndSaveWindow} from './imageMathing';
import {
  DEFAULT_WINDOW_CAPTURE_PATH,
  DEFAULT_WINDOW_CAPTURE_PATH_FOR_DRAW,
  DEFAULT_WINDOW_NAME,
} from './config';

import {imageToBase64} from './helper';
import logger from './logger';
import {jsonDB} from './db';
import {Inventory, SearchBar, Tabs} from './bot/Inventory';
import {Undock} from './bot/Undock';
const isDev = process.env.npm_lifecycle_event === 'app:dev' ? true : false;

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 600,
    frame: true,
    webPreferences: {
      preload: join(__dirname, '../preload/preload.js'),
    },
  });

  // and load the index.html of the app.
  if (isDev) {
    mainWindow.loadURL('http://localhost:5173'); // Open the DevTools.
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(join(__dirname, '../../index.html'));
  }
  return mainWindow;
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();
});
// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

const keyListener = new KeyListener();
keyListener.on('keyDown', key => {});

ipcMain.handle('uiBuildHangar', async (e, args) => {
  const inv = await uiBuildHangar();
  return drawPositions(inv);
});

ipcMain.handle('init', async (e, args) => {
  const data = await uiBuildHangar();

  return drawPositions(data);
});

function drawPositions(
  data: {
    inventory: Inventory;
    searchBar: SearchBar;
    tabs: Tabs;
    undock: Undock;
  } | null
) {
  if (!data) return;
  captureAndSaveWindow(
    DEFAULT_WINDOW_NAME,
    DEFAULT_WINDOW_CAPTURE_PATH_FOR_DRAW
  );
  if (data) {
    const {inventory, tabs, searchBar, undock} = data;
    undock.draw(DEFAULT_WINDOW_CAPTURE_PATH_FOR_DRAW);
    inventory.draw(DEFAULT_WINDOW_CAPTURE_PATH_FOR_DRAW);
    searchBar.draw(DEFAULT_WINDOW_CAPTURE_PATH_FOR_DRAW);
    tabs.draw(DEFAULT_WINDOW_CAPTURE_PATH_FOR_DRAW);
    const imageB64 = `data:image/png;base64,${imageToBase64(
      DEFAULT_WINDOW_CAPTURE_PATH_FOR_DRAW
    )}`;
    return imageB64;
  } else {
    const imageB64 = `data:image/png;base64,${imageToBase64(
      DEFAULT_WINDOW_CAPTURE_PATH
    )}`;
    return imageB64;
  }
}
