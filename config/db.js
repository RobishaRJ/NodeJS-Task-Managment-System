const Sequelize = require("sequelize");
require("dotenv").config();

const {
  DataBase_Name,
  DataBase_User,
  DataBase_Password,
  DataBase_host,
  DataBase_dialect,
  DataBase_port,
} = process.env;
const sequelize = new Sequelize(
  DataBase_Name,
  DataBase_User,
  DataBase_Password,
  {
    host: DataBase_host,
    port: DataBase_port,
    dialect: DataBase_dialect,
    //operatorsAliases: false,
  }
);
module.exports = sequelize;