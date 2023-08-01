import {channel} from 'diagnostics_channel';
import {contextBridge, ipcRenderer} from 'electron';

// Expose ipcRenderer to the client
contextBridge.exposeInMainWorld('ipcRenderer', {
  send: (channel: string, data: any) => {
    // whitelist channels
    ipcRenderer.send(channel, data);
  },
  receive: (channel: string, func: Function) => {
    // Deliberately strip event as it includes `sender`
    ipcRenderer.on(channel, (event, ...args) => func(...args));
  },
  invoke: (channel: string, args: any[]) => {
    return ipcRenderer.invoke(channel, ...args);
  },
}); // All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector: any, text: any) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const dependency of ['chrome', 'node', 'electron']) {
    replaceText(`${dependency}-version`, process.versions[dependency]);
  }
});
