
const db = require('./../bd');
const session = require('express-session');

exports.tablaExamenes = (req, res) => {
    // Verificar que req.session.user y req.session.user.id estén definidos
    if (!req.session.user || !req.session.user.id) {
      console.log(req.session.user.nombre);
        return res.redirect('/error1'); // Redirigir a una página de error o la página de inicio de sesión
    }
    const userId = req.session.user.id;
    db.query('SELECT * FROM verTemas WHERE docente_id = ?', [userId], (errorTemas, resultadoTemas) => {
      if (errorTemas) {
        console.error(errorTemas);
        return res.redirect('menudocente');
      }
      db.query('select * from verTest WHERE docente_id = ?', [userId], (errorexamenes, resultadoexamenes) => {
        if (errorexamenes) {
          console.error(errorexamenes);
          return res.redirect('menudocente');
        }
        res.render('formularioCrearExamenes', { temas: resultadoTemas , examenes: resultadoexamenes });
      });
    });
  };
  
exports.guardarExamen = (req, res) => {
    const { nombreExamen, temaExamen } = req.body;
  db.query('INSERT INTO tests VALUES (NULL, ?, ?)', [nombreExamen, temaExamen], (error, results) => {
    if (error) {
      console.error(error);
      return res.redirect('/error');
    }
    return this.tablaExamenes(req, res);
  });
  };

  exports.formularioCrearPreguntas = (req, res) => {
    const testId = req.query.testId;
    res.render('formularioCrearPreguntas', { testId: testId });
  };

  exports.guardarPregunta = (req, res) => {
    const { testId, pregunta, opcion1, opcion2, opcion3, opcion4, respuesta_correcta } = req.body;
    // Validar los datos ingresados antes de guardar en la base de datos
    db.query(
      'INSERT INTO preguntas VALUES (NULL, ?, ?, ?, ?, ?, ?, ?)',
      [pregunta, opcion1, opcion2, opcion3, opcion4, respuesta_correcta, testId],
      (error, results) => {
        if (error) {
          console.error(error);
          console.log(results);
          return res.redirect('/error');
        }
        // Redireccionar al formularioBancoPreguntas y pasar el testId para obtener las preguntas actualizadas
        res.redirect(`/bancoPreguntas?testId=${testId}`);
      }
    );
  };
  exports.bancoPreguntas = (req, res) => {
    const testId = req.query.testId; // Obtener el id del examen desde la URL o el formulario anterior
    // Consulta para obtener las preguntas del examen con el testId
    db.query('SELECT * FROM preguntas WHERE test_id = ?', [testId], (error, resultados) => {
      if (error) {
        console.error(error);
        return res.redirect('/error');
      }
      // Renderizar la vista que muestra el banco de preguntas del examen
      res.render('formularioBancoPreguntas', { preguntas: resultados, testId: testId });
    });
  };