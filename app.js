const express = require('express');
const mysql = require('mysql');
const bodyParser = require("body-parser");

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



app.get('/', (req, res) => {
    res.sendFile(__dirname + '/view/index.html');
});


app.listen(4200, () => {
    console.log('listening on port 4200');

});