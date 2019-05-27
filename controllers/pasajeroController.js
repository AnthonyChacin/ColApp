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

			result = {id: request._id, email: request.email}

			callback(null, result)
		}else{
			let response = await Pasajero.insertOne(data);
			
			if(response.insertedCount == 1 && !!response.insertedId){
				
				result = {id: response.insertedId, email: data.email}

				callback(null, result)
			}else{
				
				callback(null, null)
			}
		}

	}catch(error){
		callback(error, null)
	}
}

module.exports = controller;
