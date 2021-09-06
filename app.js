let express = require('express');
let router  = require('./config/routes');  // llamo el archivo de rutas
let cors    = require('cors');
let myconn  = require('express-myconnection');
let app     = express();
let mysql   = require('mysql'); 

require('dotenv').config() // leer datos de archivo .env

const { ...dbOptions } = require('./config/database') // Conexion con base de datos 

app.use(cors());
app.use(express.json());
app.use(myconn(mysql, dbOptions, 'request'))
app.use('/api', router); 	// declaro el uso de mis rutas

const PORT = process.env.APP_PORT || 3050; // puerto declarado en archivo .env

app.listen(PORT, ()=> {
	console.log(`http://localhost:${PORT}/`)// retorno url con puerto

}); 