const express = require('express');
const router = express.Router();
const colaController = require('../controllers/colaController');

require('dotenv').config({ path: 'variables.env'});

//rutas establecidas para la ejecución de los métodos POST y GET

router.get('/verColasPedidas', (req, res) => {
	
	colaController.getColasPedidas((err, colas) => {
		if(err){
			console.log(err)
			res.json({
				success: false,
				data: 'No-Data'
			})
		}else{
			
			res.json({
				success: true,
				data: colas
			});
		}
	})
})

module.exports = router;