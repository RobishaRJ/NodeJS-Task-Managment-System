//IMPORTS
const Sequelize = require("sequelize");
const db = require("../config/db");

//Table Module
const Task = db.define("tasks_tables", {

    task_id:{
        type:Sequelize.STRING
    },
    title:{
        type:Sequelize.STRING
    }, 	
    description:{
        type:Sequelize.TEXT
    },			
    priority:{
        type:Sequelize.ENUM('low', 'medium', 'high')
    },			
    status:{
        type:Sequelize.ENUM('to do', 'in progress', 'done')	
    },	
    due_date:{
        type:Sequelize.DATE
    },	
    created_by:{
        type:Sequelize.STRING
    },	
    assigned_to:{
        type:Sequelize.STRING
    }
})
module.exports = Task