//IMPORTS
const Sequelize = require("sequelize");
const db = require("../config/db");

//Table Module
const User = db.define("users_tables", {
    user_id:{
        type:Sequelize.STRING
    },		
	name:{
        type:Sequelize.STRING
    },
    email:{
        type:Sequelize.STRING
    },		
	password:{
        type:Sequelize.STRING
    },	
	role:{
        type:Sequelize.ENUM('admin', 'user')
    }
})
module.exports = User