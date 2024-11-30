import { ipcRenderer, contextBridge, type IpcRendererEvent } from "electron";

console.log("start preload.", ipcRenderer);

const ipc = {
  invoke(...args: any[]) {
    return ipcRenderer.invoke("ipcTest", ...args);
  },
  on(channel: string, func: Function) {
    const f = (event: IpcRendererEvent, ...args: any[]) =>
      func(...[event, ...args]);
    console.debug("register listener", channel, f);
    ipcRenderer.on(channel, f);
    return () => {
      console.debug("remove listener", channel, f);
      ipcRenderer.removeListener(channel, f);
    };
  },
};

contextBridge.exposeInMainWorld("ipc", ipc);
