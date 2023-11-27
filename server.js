const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    // Lida com solicitações HTTP
    const filePath = req.url === '/' ? 'index.html' : req.url.slice(1);
    const fileExt = path.extname(filePath);
    const contentType = getContentType(fileExt);

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            return res.end('404 Not Found');
        }

        res.writeHead(200, { 'Content-Type': contentType });
        res.write(data);
        res.end();
    });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

function getContentType(ext) {
    const contentTypeMap = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'text/javascript',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
    };

    return contentTypeMap[ext] || 'application/octet-stream';
}
