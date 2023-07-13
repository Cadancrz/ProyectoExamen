const express = require('express');
const app = express();

// Configuración de rutas y middleware

// Puerto de escucha
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor Express.js en funcionamiento en http://localhost:${port}`);
});

app.get('/', (req, res) => {
  res.send('PROYECTO 2 upnfm');
});
