if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config({ path: 'variables.env' });
}

const express = require('express');

const bodyParser = require('body-parser');
const path = require('path');

const Client = require('./config/db');

//real time
const socketio = require('socket.io');

var DB;

//Routes
const index = require("./routes/index");
const pasajero = require("./routes/pasajero");
const conductor = require("./routes/conductor");
const tests = require("./routes/tests");

const app = express();

app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.urlencoded({ extended: true }));


//Asignación de path a las rutas
app.use('/', index);
app.use('/pasajero/', pasajero);
app.use('/conductor/', conductor);
app.use('/tests/', tests);

app.set('port', process.env.PORT || 8080);

const server = app.listen(app.get('port'), () => {
	console.log(`ColApp running → PORT ${server.address().port} 🔥`);
})

const io = socketio(server);

io.of('/colapedida').on('connection', socket => {

	socket.on('Cola Pedida', (obj) => {
		if (obj.success && !!obj.data) {
			socket.broadcast.emit('Cola Pedida', {success: true, data: obj.data})
		}
	})
})

io.of('/colaaceptada').on('connection', socket => {

	socket.on('Cola Aceptada', (obj) => {
		
	})
})


Client.connect((err) => {

	if (err) {
		console.log(err);
	} else {
		DB = Client.db(`${process.env.DB_NAME}`);
		const testCollection = DB.collection('testConnection');

		testCollection.find({}).toArray((err, result) => {
			if (err) {
				console.log(err);
			} else {
				console.log(result[0].msg + ' to DataBase! ' + process.env.DB_NAME);
			}
		})
	}
})

