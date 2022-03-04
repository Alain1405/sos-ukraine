const config = require('config');
const { Sequelize, Model, DataTypes } = require('sequelize');
// const { sequelize } = require('./utils');

const sequelize = new Sequelize(config.get('db.url'), config.get('db.options')) // Example for postgre
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

module.exports = {
    PickupRequest: PickupRequest,
    sequelize: sequelize
}