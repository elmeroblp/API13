const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method === 'POST' && req.url === '/guardar') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        const filePath = path.join(__dirname, 'datos.txt');
        fs.appendFile(filePath, data.texto + '\n', (err) => {
          if (err) {
            res.writeHead(500);
            res.end('Error al guardar');
          } else {
            res.writeHead(200);
            res.end('Datos guardados');
          }
        });
      } catch (error) {
        res.writeHead(400);
        res.end('JSON no válido');
      }
    });
  } else {
    res.writeHead(404);
    res.end('No encontrado');
  }
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});