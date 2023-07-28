export interface Window {
  ipcRenderer: ipcRenderer;
}

export interface ipcRenderer {
  send: (channel: string, data?: any) => void;
  receive: (channel: string, func: Function) => void;
}

declare global {
  interface Window {
    ipcRenderer: ipcRenderer;
  }
}
