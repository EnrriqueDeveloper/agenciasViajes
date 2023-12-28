//const express = require('express'); forma comon
import express from 'express'; // forma import agregando "type": "module", en el package,json
import router from './routes/index.js';
import db from './config/db.js';

const app = express();

// Conectar la base de datos
db.authenticate()
    .then(() => console.log('base de datos conectada'))
    .catch(error =>console.error(error));


// Definir puerto
const port = process.env.PORT || 4000;

// Habilitar PUG
app.set('view engine', 'pug');

// Obtener el año actual
app.use((req, res, next)=>{
    const year = new Date();
    res.locals.actualYear =  year.getFullYear();
    res.locals.nombresitio = "Agencia de Viajes"
    next();
})

// Agregar body parser para leer los datos del formulario
app.use(express.urlencoded({extended: true}))

// definir la carpeta publica
app.use(express.static('public'));
// agregar Router
app.use('/', router) // use sorporta todos lo verbos de PUT, GET, DELETE, PAT, ETC
app.listen(port, () =>{
    console.log(`El servidor esta funcionando en el pueto ${port}`)
})