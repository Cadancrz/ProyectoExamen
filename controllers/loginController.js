const db = require('./../bd');
const session = require('express-session');

// Definir la función del controlador para la autenticación de inicio de sesión
const loginController = (req, res) => {
  const { email, password } = req.body;

  // Consultar la base de datos para verificar si el correo y contraseña coinciden con un registro en la base de datos
  db.query('SELECT nombre, rol FROM usuarios WHERE email = ? AND password = ?', [email, password], (error, results) => {
    if (error) {
      console.error(error);
      return res.redirect('/error'); // Manejar el error de la consulta a la base de datos
    }

    if (results.length === 0) {
      console.log('Usuario no encontrado');
      return res.redirect('/error'); // Manejar el caso de usuario no encontrado
    }

    const user = results[0]; // Tomar el registro de la posición 0 del conjunto de resultados

    // Verificar el rol y redirigir al formulario correspondiente
    if (user.rol === 'docente') {
      // Redirección a menudocente con los parámetros de nombre y rol
      res.redirect(`/menudocente?nombre=${encodeURIComponent(user.nombre)}&rol=${encodeURIComponent(user.rol)}`);
    } else if (user.rol === 'estudiante') {
      // Redirección a menuestudiante con los parámetros de nombre y rol
      res.redirect(`/menuestudiante?nombre=${encodeURIComponent(user.nombre)}&rol=${encodeURIComponent(user.rol)}`);
    } else {
      console.log(user.rol);
    }
  });
};

// Exportar el controlador para su uso en otros archivos
module.exports = loginController;
