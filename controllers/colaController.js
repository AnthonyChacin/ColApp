require('dotenv').config({ path: 'variables.env'});
const Client = require('../config/db');

const controller = {};

var Cola;

//Conexión con la base de datos para guardar en DB la base de datos como tal,
//de ésta manera la podremos reutilizar el objeto de la base de datos en los controladores de solicitud
Client.connect(err => {

	if(err){
		console.log('Error, no se pudo establecer conexión');
	}

	Cola = Client.db(`${process.env.DB_NAME}`).collection('Cola');
})

//Pedir cola

controller.pedirCola = async function (data, callback) {
	try{
		let request = await Cola.insertOne(data);
		if(request.insertedCount == 1 && !!request.insertedId){
			console.log(request)
			callback(null)
		}else{
			console.log('error')
			var error = 'error'
			callback(error)
		}

	}catch(error){
		callback(error)
	}
}


//Obtener colas pedidas
controller.getColasPedidas = async function (callback) {
	try{

		let colas = await Cola.aggregate([
			{ $lookup:
				{
					from: 'Pasajero',
					localField: 'pasajero',
					foreignField: '_id',
					as: 'joinPasajero'
				}
			}
			]).toArray();
		
		if(!!colas){
			console.log(colas[0].joinPasajero)
		}else{
			console.log('No hay Colas')
		}

		callback(null, colas)

	}catch(error){
		callback(error, null)
	}
}

module.exports = controller;