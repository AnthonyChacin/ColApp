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

router.get('/verColasEnCurso/:id1-:id2', (req, res) => {
	if (!!req.params.id) {
		colaController.getColasEnCurso(req.params.id1, req.params.id2, (err, colas) => {
			if (err) {
				console.log(err)
				res.json({
					success: false,
					data: 'No-Data'
				})
			} else {
				res.json({
					success: true,
					data: colas
				});
			}
		})
	}
})

module.exports = router;