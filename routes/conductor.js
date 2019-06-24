const express = require('express');
const router = express.Router();
const colaController = require('../controllers/colaController');

require('dotenv').config({ path: 'variables.env' });

//rutas establecidas para la ejecución de los métodos POST y GET

router.get('/verColasPedidas', (req, res) => {

	colaController.getColasPedidas((err, colas) => {
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
})

router.post('/darCola', (req, res) => {
	if (!!req.body) {
		colaController.darCola(req.body, (err) => {
			if (err) {
				console.log(err)
				res.json({
					success: false
				})
			} else {
				res.json({
					success: true
				});
			}
		})
	}
})

router.get('/verColasAceptadas/:id', (req, res) => {
	if (!!req.params.id) {
		colaController.getColasAceptadas(req.params.id, (err, colas) => {
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

router.post('/llegadaPuntoEncuentro/', (req, res) => {
	if (!!req.body) {
		colaController.llegarPuntoEncuentro(req.body, (err) => {
			if (err) {
				console.log(err)
				res.json({
					success: false,
					data: 'fallo al actualizar estado de la BD'
				})
			} else {
				res.json({
					success: true,
					data: 'ok'
				});
			}
		})
	}
})

module.exports = router;