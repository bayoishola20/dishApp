const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cons = require('consolidate');
const dust = require('dustjs-helpers');
const pg = require('pg');


//app init
const app = express();

//Database connection
const db = "postgres://bayoishola20:bayoishola20@localhost/dishApp";



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
app.get('/', function(req, res) {
   pg.connect(db, function(err, client, done){
    if(err) {
        return console.error('error fetching client from pool', err);
    }
    client.query('SELECT * FROM dishes', function(err, result){
        if(err) {
            return console.error('error running query', err);;
        }
        res.render('index', { dishes: result.rows })
        done();
    });
   });
});

//Add post
app.post('/add', function(req, res){
   pg.connect(db, function(err, client, done){
    if(err) {
        return console.error('error fetching client from pool', err);
    }
    client.query('INSERT INTO dishes(name, ingredients, directions, time) VALUES($1, $2, $3, $4)', [req.body.name, req.body.ingredients, req.body.directions, req.body.time]);

    done();
    res.redirect('/');
   }); 
});

//Server
app.set('port', (process.env.PORT || 3333));
app.listen(app.get('port'), function(){
    console.log('Server started on port ' +app.get('port'));
});