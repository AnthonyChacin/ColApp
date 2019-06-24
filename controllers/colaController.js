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

		let query = {
			origen: data.origen,
			destino: data.destino,
			tarifa: data.tarifa,
			banco: data.banco,
			hora: data.hora,
			cantPasajeros: data.cantPasajeros,
			vehiculo: data.vehiculo,
			estado: data.estado,
			pasajero: data.pasajero,
			creacionCola: data.creacionCola
		}
		console.log(query)
		let request = await Cola.insertOne(query);
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

controller.llegadaPuntoEncuentro = async function (data, callback) {
	try{
		data.idCola = new ObjectID(data.idCola)

		let request = await Cola.updateOne({_id: data.idCola}, {$set: {estado: "LlegoConductor"}});

		if(request.modifiedCount == 1){
			callback(null)
		}else{
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
		let result = undefined
		let conductor;
		idPasajero = new ObjectID(idPasajero)
		console.log(horaLocal)
		let colas = await Cola.aggregate([
			{
				$match: {
					pasajero: idPasajero,
					$or: [
						{
							$and: [
								{hora: {$gte: `${horaLocal}`}},
								{estado: "Pedida"}
							]
						},
						{
							estado: "Aceptada"
						},
						{
							estado: "LlegoConductor"
						}
					]
				}
			},
			{
				$sort: {
					creacionCola: -1
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
			idCola = new ObjectID(colas[0]._id)
			if(colas[0].estado == 'Aceptada' || colas[0].estado == 'LlegoConductor'){
				conductor = await Cola.aggregate([
					{
						$match: {
							_id: idCola
						}
					},
					{
						$limit: 1
					},
					{
						$lookup: {
							from: 'User',
							localField: 'conductor',
							foreignField: '_id',
							as: 'c'
						}
					},{
						$unwind: '$c'
					},{
						$project: {
							_id: 1,
							'c._id': 1,
							'c.email': 1
						}
					}
				]).toArray();

				if(!!conductor[0]){
					result = {
						_id: colas[0]._id,
						origen: colas[0].origen,
						destino: colas[0].destino,
						tarifa: colas[0].tarifa,
						banco: colas[0].banco,
						hora: colas[0].hora,
						cantPasajeros: colas[0].cantPasajeros,
						vehiculo: colas[0].vehiculo,
						estado: colas[0].estado,
						p: {
							_id: colas[0].p._id,
							email: colas[0].p.email
						},
						c: {
							_id: conductor[0].c._id,
							email: conductor[0].c.email
						}
					}
				}else{
					result = colas[0]
				}
			}else{
				result = colas[0]
			}
		}else{
			console.log('No tiene colas pedidas')
		}

		callback(null, result)

	}catch(error){
		callback(error, null)
	}
}

module.exports = controller;