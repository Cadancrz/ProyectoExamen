const express = require('express');
const mysql = require('mysql');
const bodyParser = require("body-parser");
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));



const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Upnfm1234',
    database: 'proyectocarrera'
});

db.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
      }
      console.log('Conexión exitosa a la base de datos');
});

// ----------------------------------------------------------------
app.post('/adduser', (req, res) => {
    let data = req.body;
    console.log(data);

    const consultaSQL = 'INSERT INTO usuarios VALUES (NULL, "'+ data.nombre +'", "'+data.email+'", "'+data.password+'", "'+data.rol+'")';

   db.query(consultaSQL, (err,result)=>{
        if(err){
            throw err;
        }
        res.send('Registro guardado con exito');
   }); 
});

//----------------------------------------------------------------

// login route handler
app.post('/login', (req, res) => {
    const { email, password } = req.body;
  
    // Consultar la base de datos para verificar si el nombre de usuario y contraseña coinciden con un registro de usuario
    db.query('SELECT rol FROM usuarios WHERE email = ? AND password = ?', [email, password], (error, results) => {
      if (error) {
        console.error(error);
        return res.redirect('/error'); // Manejar el error de la consulta a la base de datos
      }
  
      if (results.length === 0) {
        console.log('Usuario no encontrado');
        return res.redirect('/error'); // Manejar el caso de usuario no encontrado
      }
  
      const user = results[0];
    
      // Check the role and redirect to the corresponding menu page
      if (user.rol === 'docente') {
        res.redirect('/menudocente');
      } else if (user.rol === 'estudiante') {
        res.redirect('/menuestudiante');
      } else {
        console.log(user.rol);
      }
    });
  });
  
  
  app.get('/menudocente', (req, res) => {
    // Render the menudocente.html file
    res.sendFile(__dirname + '/views/menudocente.html');
  });
  
  app.get('/menuestudiante', (req, res) => {
    // Render the menuestudiante.html file
    res.sendFile(__dirname + '/views/menuestudiante.html');
  });
  
//----------------------------------------------------------------

app.use(express.static(path.join(__dirname, 'static')));
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/login.html'));
  });
  
  app.get('/addUserForm', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/addUserForm.html'));
  });

app.use(express.static('statics'))
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/login.html');
});


app.listen(4200, () => {
    console.log('listening on port 4200');

});