const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cons = require('consolidate');
const dust = require('dustjs-helpers');
const pg = require('pg');

//app init
const app = express();

//Database connection
const db = "postgres://postgres: @localhost/dishApp";



//Set dust engine to dust files
app.engine('dust', cons.dust);

//Set default extension for dust
app.set('view engine', 'dust');
app.set('views', __dirname + '/views');

//Set public folder
app.use(express.static(path.join(__dirname, 'public')));

//Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Home page route
app.get('/', (req, res) => {
    res.render('index');
})

//Server
app.set('port', (process.env.PORT || 3333));
app.listen(app.get('port'), function(){
    console.log('Server started on port ' +app.get('port'));
});