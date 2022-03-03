const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config()

// Sequelize
DATABASE_URL = process.env.DATABASE_URL
const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize(DATABASE_URL, {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
}) // Example for postgres

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
    phone_number: {
        type: DataTypes.STRING,
        allowNull: false
    },
    message: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    },
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
    });
}
// EXPRESS
const app = express();
const port = process.env.PORT || 8000;

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }));

// sendFile will go here
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});
app.post('/submitLocation', function (req, res) {
    console.log(req.body);
    reqData = {
        message: req.body.message,
        phone_number: req.body.tel,
        lat: parseFloat(req.body.lat),
        lng: parseFloat(req.body.lng),
    }
    addRequest(reqData);
    res.send('We will try to contact you shortly')
});

app.listen(port);
console.log('Server started at http://localhost:' + port);
