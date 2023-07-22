const db = require('./../bd');
const session = require('express-session');




 exports.listarTemas=(req, res)=>{
  const userId = req.session.user;
  // Consulta para obtener los temas
  db.query('SELECT * FROM verTemas WHERE docente_id = ?', [userId.id], (errorTemas, resultadosTemas) => {
    if (errorTemas) {
      console.error(errorTemas);
      return res.redirect('menudocente');
    }
    // Obtener el ID del usuario almacenado en la sesión


    // Consulta para obtener los docentes filtrando por el id del usuario
    db.query('SELECT * FROM usuarios WHERE id = ?', [userId.id], (errorDocentes, resultadosDocentes) => {
      if (errorDocentes) {
        console.error(errorDocentes);
        return res.redirect('menudocente');
      }

      // Renderizar la vista "formulario.ejs" y pasar los resultados de las consultas como variables
      res.render('tabladetemas', { temas: resultadosTemas, usuarios: resultadosDocentes });
    });
  });
};

 exports.inserttema = (req, res) => {
    const { nombre, descripcion, iddocente } = req.body;
    db.query(
      'INSERT INTO temas VALUES (NULL, ?, ?, ?)',
      [nombre, descripcion, iddocente],
      (error, results) => {
        if (error) {
          console.error(error);
          return res.redirect('/error');
        }
        return this.listarTemas(req, res);
      }
    );
  };