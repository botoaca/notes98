window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('load-btn').addEventListener('click', () => {
        ipc.send("loadNote");
        ipc.on('loadNoteBack', (event, data) => {
            window.location.href = `note.html?path=${data}`;
        })
    });
});