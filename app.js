const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config()
const config = require('config');
var {authRouter, ensureAuthenticated} = require('./routes/auth');
var passport = require('passport');
var session = require('express-session');
var SQLiteStore = require('connect-sqlite3')(session);

const { PickupRequest } = require("./models")

const Sentry = require("@sentry/node");

const { connectDb, initSentry } = require("./utils");

connectDb();

async function addRequest(rd) {
    const result = await PickupRequest.create({
        lat: rd.lat,
        lng: rd.lng,
        phone_number: rd.phone_number,
        message: rd.message,
        num_people: rd.num_people,
        num_children: rd.num_children,
        address: rd.address,
        status: "New"
    });
}
// EXPRESS
const app = express();
const port = config.get('app_port') || 8000;

app.use(express.static('public'))

app.use(session({
  secret: config.get("auth.secret"),
  resave: false,
  saveUninitialized: false,
  store: new SQLiteStore()
}));

app.use(passport.authenticate('session'));

initSentry(app)

app.set('view engine', 'pug')
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', authRouter);

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/requests', ensureAuthenticated, function (req, res) {
    PickupRequest.findAll().then((results) => {
        // results.forEach(element => {
        //     element.map_link = "https://www.google.com/maps/search/?api=1&query=" + element.lat + "," + element.lng;
        //     element.coordinates = "Lat:" + element.lat + "; Lng: " + element.lng;
        // });
        res.render('table', { title: 'Express', requests: results });

    })
});

app.post('/submitLocation', function (req, res) {
    console.log('Submitting request: ')
    console.log(req.body);

    try {
        reqData = {
            message: req.body.message,
            phone_number: req.body.phoneNumber,
            address: req.body.address,
            address: req.body.address,
            lat: parseFloat(req.body.lat),
            lng: parseFloat(req.body.lng),
            num_people: parseFloat(req.body.numPeople),
            num_children: parseFloat(req.body.numChildren),
        }
        addRequest(reqData);
        res.status(200).send('We will try to contact you shortly')
    } catch (error) {
        res.status(400).send('Something went wrong: ', error)
    }
});
app.post('/changeStatus/:id', function (req, res) {
    const id = req.params.id; // '1'
    try {
        PickupRequest.findByPk(id).then((pickup_request) => {
            pickup_request.status = req.body.status;
            pickup_request.save()
            res.status(200).send('Status updated')

        }).catch((error) => {

            res.status(400).send('Something went wrong: ', error)
        })
    } catch (error) {
    }

});

// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

// Optional fallthrough error handler
app.use(function onError(err, req, res, next) {
    // The error id is attached to `res.sentry` to be returned
    // and optionally displayed to the user for support.
    res.statusCode = 500;
    console.log(err)
    res.end("Error: " + err + "Code: " + res.sentry + "\n");
});


app.listen(port);
console.log('Server started at http://localhost:' + port);
