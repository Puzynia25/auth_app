const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    // registred_at: { type: DataTypes.DATE },
    // login_at: { type: DataTypes.DATE },
    // status: { type: DataTypes.STRING, defaultValue: "active" },
    // role: { type: DataTypes.STRING, defaultValue: "ADMIN" },
});

module.exports = { User };
