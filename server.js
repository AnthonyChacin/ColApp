require('dotenv').config({ path: 'variables.env'});
const express = require('express');

const bodyParser = require('body-parser');
const path = require('path');

const Client = require('./config/db');

var DB;

//Routes
const index = require("./routes/index");
const pasajero = require("./routes/pasajero");
const conductor = require("./routes/conductor");

const app = express();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//Asignación de path a las rutas
app.use('/', index);
app.use('/pasajero/', pasajero);
app.use('/conductor/', conductor);


Client.connect(err => {

	if(err){
		console.log(err);
	}

	DB = Client.db(`${process.env.DB_NAME}`);
	const testCollection = DB.collection('testConnection');
	
	testCollection.find({}).toArray((err, result) => {
		if(err){
			console.log(err);
		}else{
			console.log(result[0].msg + ' to DataBase ' + process.env.DB_NAME);
		}
	})

	app.set('port', process.env.PORT || 8080);

	const server = app.listen(app.get('port'), () => {
	    console.log(`Express running → PORT ${server.address().port} 🔥`);
	})
})
