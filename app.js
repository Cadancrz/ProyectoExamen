const express = require("express");

const session = require("express-session");
const auth = require("./middlewares/autenticated");

const bodyParser = require("body-parser");
const userController = require("./controllers/userController");
const loginController = require("./controllers/loginController");

const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
 

// ---------------------------------------------------------------- CONEXION A LA BASE DE DATOS ----------------------------------------------------------------


// ---------------------------------------------------------------- API DE SIGN UP ----------------------------------------------------------------
app.post('/adduser', (req, res) => {
    let data = req.body;
    console.log(data); // Imprimir los datos recibidos desde el formulario

    const consultaSQL = 'INSERT INTO usuarios VALUES (NULL, "'+ data.nombre +'", "'+data.email+'", "'+data.password+'", "'+data.rol+'")'; // Query para ingresar los datos del usuario que vienen desde el formulario de adduserform

   db.query(consultaSQL, (err,result)=>{
        if(err){
            throw err;// si ocurre un error en la consulta a la base de datos, el control se transferirá al bloque de manejo de errores global en Express.js 
        }
        res.sendFile(__dirname + '/views/login.html'); // Enviar respuesta al cliente indicando que el registro se guardó con éxito
   }); 
});

//---------------------------------------------------------------- API DE SIGN IN ----------------------------------------------------------------

// login route handler
app.post('/login', loginController);


  app.get('/menudocente', (req, res) => {
    const { nombre, rol } = req.query;
    res.render('menudocente', { nombre, rol }); // Renderizar la vista menudocente pasando los valores de nombre y rol
  });
  
  
  
  app.get('/menuestudiante', (req, res) => {
    const { nombre, rol } = req.query;
    res.render('menuestudiante', { nombre, rol });  // Enviar el archivo menuestudiante.ejs
  });
  


// ---------------------------------------------------------------- API PARA CARGAR LA TABLA DE CUENTAS DE ESTUDIANTES----------------------------------------------------------------

// Ruta para mostrar la tabla de usuarios
app.get('/tablaestudiantes', (req, res) => {
  // Consulta a la base de datos para obtener los usuarios
  const query = 'SELECT * FROM usuarios WHERE rol="estudiante"';
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error al obtener los usuarios');
    }
    const users = results;
    res.render('tablaestudiantes', { users }); // Renderiza la vista 'users' y pasa los datos de los usuarios
  });
});

//---------------------------------------------------------------- rutas de navegacion --------------------------------------------------------------

app.use(express.static(path.join(__dirname, 'static')));
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/login.html')); // Enviar el archivo login.html
  });
  
  app.get('/addUserForm', (req, res) => {
    res.render('addUserForm'); // Enviar el archivo addUserForm.ejs
  });




  app.get('/tablaestudiantes', (req, res) => {
    res.render('tablaestudiantes'); // Renderizar la vista menudocente pasando los valores de nombre y rol
  });

  // ---------------------------------------------------------------- GET DE INICIO ----------------------------------------------------------------
app.use(express.static('statics'))
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/login.html'); // Enviar al archivo login.html al acceder a la ruta raíz
});


app.listen(4200, () => {
    console.log('listening on port 4200'); // Imprimir en la consola el mensaje 'listening on port 4200'
});
