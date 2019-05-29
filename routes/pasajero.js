const express = require('express');
const router = express.Router();
const colaController = require('../controllers/colaController');

require('dotenv').config({ path: 'variables.env'});

//rutas establecidas para la ejecución de los métodos POST y GET

router.post('/pedirCola', (req, res) => {
	if(!!req.body){
		
		console.log(req.body)

		colaController.pedirCola(req.body, (err) => {
			if(err){
				res.json({
					success: false,
					cola: 'error'
				});
			}else{
				res.json({
					success: true,
					cola: "ok" 
				});
			}
		})
	}
})

module.exports = router;