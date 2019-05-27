const express = require('express');
const router = express.Router();
const pasajeroController = require('../controllers/pasajeroController');

require('dotenv').config({ path: 'variables.env'});

//rutas establecidas para la ejecución de los métodos POST y GET

router.get('/pedirCola', (req, res) => {
	//var person = {origen:"Las Mercedes", destino:"UNIMET", tarifa:2500, hora: ''};
})

module.exports = router;