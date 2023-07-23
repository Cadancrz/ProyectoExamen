const express = require('express');

const session = require("express-session");
const auth = require("./middlewares/autenticated");

const bodyParser = require("body-parser");
const userController = require("./controllers/userController");
const loginController = require("./controllers/loginController");
const temasController = require("./controllers/temasController"); 
const examenController = require("./controllers/examenController");


const mysql = require('mysql');
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');
 
app.use(session({
  secret:'clave-secret',
  resave:false,
  saveUninitialized:false 
}));

app.post('/login', loginController.HomePostLogin);
app.get('/mdocente', auth,loginController.HomePostLogin);


app.post('/adduser',userController.adduser);  
app.get('/listarUSR',userController.listarUSR);

app.get('/listarTemas',temasController.listarTemas);
app.post('/inserttema', temasController.inserttema);


app.get('/tablaExamenes', examenController.tablaExamenes);
app.post('/guardarExamen', examenController.guardarExamen);
app.get('/formularioCrearPreguntas', examenController.formularioCrearPreguntas);
app.get('/bancoPreguntas', examenController.bancoPreguntas);
app.post('/guardarPregunta', examenController.guardarPregunta);



app.get('/menudocente', (req, res) => {
  const user = req.session.user;

  // Verificar si el objeto 'user' está presente en la session
  if (!user || !user.nombre) {
    // Si el objeto 'user' no está presente o no tiene la propiedad 'nombre', redirige al login o muestra un mensaje de error.
    return res.redirect('/login'); // O puedes mostrar una página de error personalizada
  }

  res.render('menudocente', { user }); // Renderizar la vista menudocente pasando los valores de nombre y rol
});
  app.get('/menuestudiante', (req, res) => {
    const user = req.session.user;
    if (!user || !user.nombre) {
      // Si el objeto 'user' no está presente o no tiene la propiedad 'nombre', redirige al login o muestra un mensaje de error.
      return res.redirect('/login'); // O puedes mostrar una página de error personalizada
    }
    res.render('menuestudiante',{ user });  // Enviar el archivo menuestudiante.ejs
  });

  app.get('/home',auth,loginController.home);
  app.get('/salir',auth,loginController.salir);


//---------------------------------------------------------------- rutas de navegacion --------------------------------------------------------------

app.use(express.static(path.join(__dirname, 'static')));
app.get('/login', (req, res) => {
  res.render('login');// Enviar el archivo login.html
  });
  
  app.get('/tablaestudiantes', (req, res) => {
    const user = req.session.user;
    if (!user || !user.nombre) {
      // Si el objeto 'user' no está presente o no tiene la propiedad 'nombre', redirige al login o muestra un mensaje de error.
      return res.redirect('/login'); // O puedes mostrar una página de error personalizada
    }
    res.render('tablaestudiantes',{ user }); // Renderizar la vista menudocente pasando los valores de nombre y rol
  });
  app.get('/tablatemas', (req, res) => {
    const user = req.session.user;
    if (!user || !user.nombre) {
      // Si el objeto 'user' no está presente o no tiene la propiedad 'nombre', redirige al login o muestra un mensaje de error.
      return res.redirect('/login'); // O puedes mostrar una página de error personalizada
    }
    res.render('tabladetemas',{ user }); // Renderizar la vista menudocente pasando los valores de nombre y rol
  });

  app.get('/formularioCrearExamenes', (req, res) => {
    const user = req.session.user;
    if (!user || !user.nombre) {
      // Si el objeto 'user' no está presente o no tiene la propiedad 'nombre', redirige al login o muestra un mensaje de error.
      return res.redirect('/login'); // O puedes mostrar una página de error personalizada
    }
    res.render('formularioCrearExamenes',{ user }); // Renderizar la vista menudocente pasando los valores de nombre y rol
  });

  
  app.get('/formularioCrearPreguntas', (req, res) => {
    const user = req.session.user;
    if (!user || !user.nombre) {
      // Si el objeto 'user' no está presente o no tiene la propiedad 'nombre', redirige al login o muestra un mensaje de error.
      return res.redirect('/login'); // O puedes mostrar una página de error personalizada
    }
    res.render('formularioCrearPreguntas',{ user }); // Renderizar la vista menudocente pasando los valores de nombre y rol
  });

  app.get('/formularioBancoPreguntas', (req, res) => {
    const testId = req.query.testId;
    if (!user || !user.nombre) {
      // Si el objeto 'user' no está presente o no tiene la propiedad 'nombre', redirige al login o muestra un mensaje de error.
      return res.redirect('/login'); // O puedes mostrar una página de error personalizada
    }
    res.render('formularioBancoPreguntas',{ testId }); // Renderizar la vista menudocente pasando los valores de nombre y rol
  });

  // ---------------------------------------------------------------- GET DE INICIO ----------------------------------------------------------------
app.use(express.static('statics'))
app.get('/',(req,res)=>{res.render('login');}); // Enviar al archivo login.html al acceder a la ruta raíz



app.listen(4200, () => {
    console.log('listening on port 4200'); // Imprimir en la consola el mensaje 'listening on port 4200'
});
