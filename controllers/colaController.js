require('dotenv').config({ path: 'variables.env'});
const Client = require('../config/db');
const ObjectID = require('mongodb').ObjectID;

const controller = {};

var Cola;

//Conexión con la base de datos para guardar en DB la base de datos como tal,
//de ésta manera la podremos reutilizar el objeto de la base de datos en los controladores de solicitud
Client.connect(err => {

	if(err){
		console.log(err);
	}

	Cola = Client.db(`${process.env.DB_NAME}`).collection('Cola');
})

//Pedir cola

controller.pedirCola = async function (data, callback) {
	try{
		data.pasajero = new ObjectID(data.pasajero)
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

controller.darCola = async function (data, callback) {
	try{
		data.idConductor = new ObjectID(data.idConductor)
		data.idCola = new ObjectID(data.idCola)

		let request = await Cola.updateOne({_id: data.idCola}, {$set: {conductor: data.idConductor, estado: "Aceptada"}});
		console.log(request)

		if(request.modifiedCount == 1){
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
			{
				$match: {estado: "Pedida"}
			},{
				$lookup: {
					from: 'User',
					localField: 'pasajero',
					foreignField: '_id',
					as: 'p'
				}
			},{
				$unwind: '$p'
			},{
				$project: {
					_id: 1,
					origen: 1,
		            destino: 1,
		            tarifa: 1,
		            banco: 1,
		            hora: 1,
		            cantPasajeros: 1,
		            vehiculo: 1,
		            estado: 1,
		            'p._id': 1,
		            'p.email': 1
				}
			}
		]).toArray();
			
		console.log(colas)

		if(!!colas){
			console.log(colas)
		}else{
			console.log('No hay Colas')
		}

		callback(null, colas)

	}catch(error){
		callback(error, null)
	}
}

controller.getColasAceptadas = async function (idConductor, callback){
	try{

		idConductor = new ObjectID(idConductor)

		let colas = await Cola.aggregate([
			{
				$match: {
					conductor: idConductor,
					estado: "Aceptada"
				}
			},{
				$lookup: {
					from: 'User',
					localField: 'pasajero',
					foreignField: '_id',
					as: 'p'
				}
			},{
				$unwind: '$p'
			},{
				$project: {
					_id: 1,
					origen: 1,
		            destino: 1,
		            tarifa: 1,
		            banco: 1,
		            hora: 1,
		            cantPasajeros: 1,
		            vehiculo: 1,
		            estado: 1,
		            'p._id': 1,
		            'p.email': 1
				}
			}
		]).toArray();
			
		console.log(colas)

		if(!!colas){
			console.log(colas)
		}else{
			console.log('No tiene colas aceptadas')
		}

		callback(null, colas)

	}catch(error){
		callback(error, null)
	}
}

controller.getColasEnCurso = async function (idPasajero, horaLocal, callback){
	try{
		idPasajero = new ObjectID(idPasajero)
		console.log(horaLocal)
		let colas = await Cola.aggregate([
			{
				$match: {
					pasajero: idPasajero,
					hora: {$gte: horaLocal}
				}
			},
			{
				$sort: {
					hora: -1
				}
			},
			{
				$limit: 1
			},
			{
				$lookup: {
					from: 'User',
					localField: 'pasajero',
					foreignField: '_id',
					as: 'p'
				}
			},{
				$unwind: '$p'
			},{
				$project: {
					_id: 1,
					origen: 1,
		            destino: 1,
		            tarifa: 1,
		            banco: 1,
		            hora: 1,
		            cantPasajeros: 1,
		            vehiculo: 1,
		            estado: 1,
		            'p._id': 1,
		            'p.email': 1
				}
			}
		]).toArray();

		if(!!colas[0]){
			console.log(colas[0])
		}else{
			console.log('No tiene colas pedidas')
		}

		callback(null, colas[0])

	}catch(error){
		callback(error, null)
	}
}

module.exports = controller;