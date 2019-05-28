const express = require('express');
const router = express.Router();
const colaController = require('../controllers/colaController');

require('dotenv').config({ path: 'variables.env'});

//rutas establecidas para la ejecución de los métodos POST y GET

router.get('/pedirCola', (req, res) => {

	let cola = {origen:"Las Mercedes", destino:"UNIMET", tarifa:2500, hora: new Date(), vehiculo: "Carro", cantPasajeros: 1, banco: "Mercantil", estado: "Pedida", pasajero: "222222222222222222222222"};
	console.log(cola)
	colaController.pedirCola(cola, (err) => {
		if(err){
			res.send(err)
		}else{
			res.send('Ok')
		}
	})

})

module.exports = router;