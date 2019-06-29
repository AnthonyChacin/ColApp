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

router.post('/terminarCola', (req, res) => {
	if(!!req.body){
		
		console.log(req.body)

		colaController.terminarCola(req.body, (err) => {
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
	if (!!req.params.id1 && !!req.params.id2) {
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

router.get('/verHistorial/:id', (req, res) => {
	if (!!req.params.id) {
		colaController.getColasTerminadas(req.params.id, (err, historial) => {
			if (err) {
				console.log(err)
				res.json({
					success: false,
					data: 'No-Data'
				})
			} else {
				res.json({
					success: true,
					data: historial
				});
			}
		})
	}
})

module.exports = router;