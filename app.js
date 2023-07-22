const express = require('express');

const session = require("express-session");
const auth = require("./middlewares/autenticated");

const bodyParser = require("body-parser");
const userController = require("./controllers/userController");
const loginController = require("./controllers/loginController");
const temasController = require("./controllers/temasController"); 


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
app.post('/mdocente', auth,loginController.HomePostLogin);


app.post('/adduser',userController.adduser);  
app.get('/listarUSR',userController.listarUSR);

app.get('/listarTemas',temasController.listarTemas);
app.post('/inserttema', temasController.inserttema);
  
  app.get('/menudocente', (req, res) => {
    const user = req.session.user;
    res.render('menudocente',{ user }); // Renderizar la vista menudocente pasando los valores de nombre y rol
  });
  app.get('/menuestudiante', (req, res) => {
    const user = req.session.user;
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
    res.render('tablaestudiantes',{ user }); // Renderizar la vista menudocente pasando los valores de nombre y rol
  });
  app.get('/tablatemas', (req, res) => {
    const user = req.session.user;
    res.render('tabladetemas',{ user }); // Renderizar la vista menudocente pasando los valores de nombre y rol
  });

  // ---------------------------------------------------------------- GET DE INICIO ----------------------------------------------------------------
app.use(express.static('statics'))
app.get('/',(req,res)=>{res.render('login');}); // Enviar al archivo login.html al acceder a la ruta raíz



app.listen(4200, () => {
    console.log('listening on port 4200'); // Imprimir en la consola el mensaje 'listening on port 4200'
});
