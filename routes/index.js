const express = require('express');
const router = express.Router();
require('dotenv').config({ path: 'variables.env'});
const Client = require('../config/db');

var DB;
var pasajero = {};

//Conexión con la base de datos para guardar en DB la base de datos como tal,
//de ésta manera la podremos reutilizar el objeto de la base de datos en los controladores de solicitud
Client.connect(err => {

	if(err){
		console.log('Error, no se pudo establecer conexión');
	}

	DB = Client.db(`${process.env.DB_NAME}`);
})



//rutas establecidas para la ejecución de los métodos POST y GET
router.post('/iniciarPasajero', (req, res) => {

	if(!!req.body){

		//objeto que estoy recibiendo por la ruta
		var objeto = {email: `${req.body.email}`}

		DB.collection('Pasajero').findOne(objeto, (err, result) => {

			if(err) console.log(err)
			
			else{
				if(!!result){

					console.log('El pasajero ya existe')

					pasajero._id = `${result._id}`,
					pasajero.email = `${result.email}`

					console.log(result)

				}else{
					console.log('No se encontró ningún pasajero con el email: ' + req.body.email)

					DB.collection('Pasajero').insertOne(objeto, (err, resu) => {
						if(err){
							console.log('Se produjo un error al insertar pasajero' + err);
						}else{
							console.log(resu + ', un documento insertado')
						}
					})

				}
			}
		})
	}
})

module.exports = router;