const db = require('./../bd');





 exports.listarTemas=(req, res)=>{
  // Consulta para obtener los temas
  db.query('SELECT * FROM temas', (errorTemas, resultadosTemas) => {
    if (errorTemas) {
      console.error(errorTemas);
      return res.redirect('menudocente');
    }

    // Consulta para obtener los docentes
    db.query('SELECT * FROM usuarios WHERE rol="docente"', (errorDocentes, resultadosDocentes) => {
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
        res.render('menudocente');
      }
    );
  };