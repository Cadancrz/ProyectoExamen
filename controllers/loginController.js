
const db = require('./../bd');
const session = require('express-session');

exports.HomePostLogin=(req,res)=>{
  const { email, password } = req.body;
  
  // Consultar la base de datos para verificar si el correo y contraseña coinciden con un registro en la base de datos
  db.query('SELECT id, nombre, email, rol FROM usuarios WHERE email = ? AND password = ?', [email, password], (error, results) => {
    if (error) {
      console.error(error);
      return res.redirect('/error'); // Manejar el error de la consulta a la base de datos
    }

    if (results.length === 0) {
      console.log('Usuario no encontrado');
      return res.redirect('/'); // Manejar el caso de usuario no encontrado
    }

    const user = results[0]; // toma el registro de la posicion 0 del dataset
    req.session.user = user;
    // Check el rol y redirige al formulario correspondiente
    if (user.rol === 'docente') {
      // Redirección a menudocente con los parámetros de nombre y rol
       res.redirect(`/menudocente`); 

    } else if (user.rol === 'estudiante') {
       // Redirección a menuestudiante con los parámetros de nombre y rol
      res.redirect(`/menuestudiante`); 
    } else {
      console.log(user.rol);
    }
  });
}; 


exports.home = (req, res)=>{
  res.render('index');
};

exports.mdocente = (req, res)=>{
  const user = req.session.user;
  res.render('menudocente',{ user });
};

exports.salir = (req, res)=>{
  delete req.session.loggedIn;
  res.redirect('/');
};