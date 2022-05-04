// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
	handleBackground: (callback: any) => {
		return ipcRenderer.on('update-background', callback);
	},
	updatePositionX: (callback: any) =>
		ipcRenderer.on('update-position-x', callback),
	gameSwitch: (callback: any) => ipcRenderer.on('game-switch', callback),
	gameRandom: (callback: any) => ipcRenderer.on('game-random', callback),
	colorRandom: (callback: any) => ipcRenderer.on('color-random', callback),
});
