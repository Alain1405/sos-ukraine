const { Model, DataTypes } = require('sequelize');
const { db } = require('./index');

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
    },
    case_manager_1: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    },
    case_manager_2: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    }
}, { sequelize: db.sequelize, modelName: 'pickup_request' });

module.exports = { PickupRequest }