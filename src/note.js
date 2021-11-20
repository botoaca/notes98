const fs = require('fs');

window.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const path = params.get('path');
    if (path) {
        fs.readFile(path, (err, data) => {
            if (err) throw err;
            document.getElementById('note-content').value = data;
        });
    }

    document.getElementById('save-btn').addEventListener('click', () => {
        let content = document.getElementById('note-content').value;
        ipc.send('saveNote', content);
    });
});