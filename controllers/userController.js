const db = require('./../bd');

exports.adduser=(req,res)=>{
    let data = req.body;
    console.log(data); // Imprimir los datos recibidos desde el formulario
    const consultaSQL = 'INSERT INTO usuarios VALUES (NULL, "'+ data.nombre +'", "'+data.email+'", "'+data.password+'", "'+data.rol+'")'; // Query para ingresar los datos del usuario que vienen desde el formulario de adduserform
   db.query(consultaSQL, (err,result)=>{
        if(err){
            throw err;// si ocurre un error en la consulta a la base de datos, el control se transferirá al bloque de manejo de errores global en Express.js 
        }
        res.sendFile(__dirname + '/views/login.html'); // Enviar respuesta al cliente indicando que el registro se guardó con éxito
   }); 
};   

exports.listarUSR=(req, res)=>{
   // Consulta a la base de datos para obtener los usuarios
   const query = 'SELECT * FROM usuarios WHERE rol="estudiante"';
   db.query(query,(err,result)=>{
    if(err){
        throw err
    }

  //console.log(result);
  
     const users = result;
     res.render('tablaestudiantes',{
        titulo:'USUARIOS:',
        users: result
    });// Renderiza la vista 'users' y pasa los datos de los usuarios
   });
};


 