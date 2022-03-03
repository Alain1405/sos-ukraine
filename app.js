const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config()
const pug = require('pug');


REQUESTS_PASSWORD = process.env.REQUESTS_PASSWORD || 'sos'

// Sequelize
DATABASE_URL = process.env.DATABASE_URL
const { Sequelize, Model, DataTypes } = require('sequelize');
var dbOptions = {}
if (process.env.ENV != 'DEV') {
    dbOptions.dialectOptions = {
        ssl: {
            require: process.env.ENV != 'DEV',
            rejectUnauthorized: false
        }
    }
}
const sequelize = new Sequelize(DATABASE_URL, dbOptions) // Example for postgres

class PickupRequest extends Model { }
PickupRequest.init({
    lat: {
        type: DataTypes.FLOAT,
        allowNull: false,
        unique: false
    },
    lng: {
        type: DataTypes.FLOAT,
        allowNull: false,
        unique: false
    },
    num_people: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false
    },
    num_children: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false
    },
    phone_number: {
        type: DataTypes.STRING,
        allowNull: false
    },
    message: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    }
}, { sequelize, modelName: 'pickup_request' });


connect();
async function connect() {
    try {
        await sequelize.sync();
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

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
const port = process.env.PORT || 8000;

app.use(express.static('public'))
app.set('view engine', 'pug')

app.use(bodyParser.urlencoded({ extended: true }));
// sendFile will go here
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/requests', function (req, res) {
    PickupRequest.findAll().then((results) => {
        // results.forEach(element => {
        //     element.map_link = "https://www.google.com/maps/search/?api=1&query=" + element.lat + "," + element.lng;
        //     element.coordinates = "Lat:" + element.lat + "; Lng: " + element.lng;
        // });
        console.log(results)
        res.render('table', { title: 'Express', requests: results });

    })
});
app.post('/submitLocation', function (req, res) {
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
    console.log(id)
    console.log(req.body.status)
    try {
        PickupRequest.findByPk(id).then((pickup_request) => {
            console.log(pickup_request)
            pickup_request.status = req.body.status;
            pickup_request.save()
            res.status(200).send('Status updated')

        }).catch((error) => {

            res.status(400).send('Something went wrong: ', error)
        })
    } catch (error) {
    }

});

app.listen(port);
console.log('Server started at http://localhost:' + port);
