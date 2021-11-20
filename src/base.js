const { ipcRenderer } = require('electron');
const ipc = ipcRenderer;

window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('minimize-btn').addEventListener('click', () => {
        ipc.send("minimizeApp");
    });

    document.getElementById('close-btn').addEventListener('click', () => {
        ipc.send("closeApp");
    });
});