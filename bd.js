const mysql = require("mysql");
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Upnfm1234',
    database: 'proyectocarrera'
});

db.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err); // Error al conectar a la base de datos
        return;
      }
      console.log('Conexión exitosa a la base de datos'); // Conexión exitosa a la base de datos
});


module.exports = db;
