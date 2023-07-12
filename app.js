const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Configuración de body-parser para analizar los datos enviados por el formulario
app.use(bodyParser.urlencoded({ extended: true }));

// Configuración de la ruta principal
app.get('/', (req, res) => {
  res.send('¡Bienvenido al formulario de registro de usuarios!');
});

// Configuración de la ruta para mostrar el formulario AddUserForm
app.get('/addUser', (req, res) => {
  res.sendFile(__dirname + '/addUserForm.html');
});

// Configuración de la ruta para procesar el formulario y guardar la información en la base de datos
app.post('/guardarUsuario', (req, res) => {
  const { username, email, password, confirmPassword, role } = req.body;

  // Validación de contraseñas
  if (password !== confirmPassword) {
    res.send('Las contraseñas no coinciden');
  } else {
    // Aquí puedes agregar la lógica para guardar la información en la base de datos
    // y mostrar un mensaje de confirmación satisfactorio
    res.send('¡Usuario guardado satisfactoriamente!');
  }
});

// Puerto de escucha
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor Express.js en funcionamiento en http://localhost:${port}`);
});
