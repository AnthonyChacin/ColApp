require('dotenv').config({ path: 'variables.env'});
const Client = require('../config/db');

const controller = {};

var Pasajero;

//Conexión con la base de datos para guardar en DB la base de datos como tal,
//de ésta manera la podremos reutilizar el objeto de la base de datos en los controladores de solicitud
Client.connect(err => {

	if(err){
		console.log('Error, no se pudo establecer conexión');
	}

	Pasajero = Client.db(`${process.env.DB_NAME}`).collection('Pasajero');
})


controller.insertPasajero = async function (data, callback) {
	var result = ''
	try{
		let request = await Pasajero.findOne(data)

		if(!!request){
			console.log(data.email + ' ya existe');
			result = 'ok'
			callback(null, result)
		}else{
			let response = await Pasajero.insertOne(data);
			
			if(response.insertedCount == 1 && !!response.insertedId){
				result = 'ok'
				callback(null, result)
			}else{
				result = 'error'
				callback(null, result)
			}
		}

	}catch(error){
		callback(error, null)
	}
}

module.exports = controller;
