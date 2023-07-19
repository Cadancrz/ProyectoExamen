const db = require('./../bd');
const session = require('express-session');


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

    const consultaSQL = 'SELECT  usr.Nombre_completo, usr.Correo, usr.Identidad, rol.Descripcion FROM usr left join  rol ON  usr.Rol_idRol = rol.idRol';

    db.query(consultaSQL,(err,result)=>{
        if(err){
            throw err
        }

      //console.log(result);
      
        res.render('obtenerUsr',{
            titulo:'USUARIOS:',
            data: result
        });
    })
};

exports.delete_usr=(req,res)=>{

    const id = req.query.ID;

    const consultaSQL = 'DELETE FROM usr WHERE idusr='+id+''; 

    db.query(consultaSQL,(err,result)=>{
            if (err) {
                throw err
            }
            res.status(200).send("Registro eliminado!!!");
    });  

};

exports.update_usr=(req,res)=>{

        const id = req.query.ID;
        const data = req.body;
        const consultaSQL = 'UPDATE USR SET Nombre_completo = "'+data.Nombre_completo+'", Correo = "'+data.Correo+'",Identidad ="'+data.Identidad+'",Rol_idRol='+data.Rol+' WHERE idusr ='+id+' ';


        db.query(consultaSQL,(err,resp)=>{
                if(err){
                    throw err
                }

                res.status(200).send("El usuario ha sido actualizado!!!");

        });

};