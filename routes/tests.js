const express = require('express');
const router = express.Router();

//rutas establecidas para la ejecución de las pruebas

router.get('/coordenadasLocationCP', (req, res) => {
    res.json({
        msg: "hola"
    })
})

module.exports = router;