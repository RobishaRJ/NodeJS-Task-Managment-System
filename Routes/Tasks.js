const express = require('express');
const Task = require('../Modules/Tasks');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const hashing = require('../config/Hashing')
const checkType = require('../config/CheckType');
const auth = require('../config/auth');
const SendEmail = require("../config/Email");
const  generatePasswordResetEmail= require("../config/ResetPasswordEmail")
const { v4: uuidv4 } = require('uuid');
const fullUUID = uuidv4()
const Id = fullUUID.replace(/-/g, '').slice(0, 12);

//Getting all Admin 
router.get("/", jsonParser,auth,async (req, res) => {
    try {
        const tasks = await Task.findAll();
        res.status(200).json(tasks);
    } catch (error) {
        console.log(error);
        res.status(500).json("Internal Server Error :" + error);
    }
});

router.post('/',jsonParser,auth,async(req,res)=>{
    try {
        const task = await Task.create({
            task_id:"task"+Id,
            title:req.body.title, 	
            description:req.body.description,			
            priority:req.body.priority,			
            status:req.body.status,	
            due_date:req.body.due_date,	
            created_by:req.body.created_by,	
            assigned_to:req.body.assigned_to
        });
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json("internal Server Error: "+error);
    }
})
router.patch('/:id',jsonParser,auth,async (req, res) => {
    const identifier = { task_id:req.params.id };
    const Value = req.body;
        try {
            const updatedRecord = await updateColumn(Task, identifier,Value);
            res.status(200).json("Updated Record");
        } catch (error) {
            res.status(500).json("Error Updating Product: " + error);
        }
});
//Delete Product 
router.delete("/:id",jsonParser,auth,async(req, res) => {
    const Id = req.params.id;
    try {
        const record = await Task.findOne({ where: { task_id: Id } });
        if (!record) {
            return res.status(404).json({ message: "Task not found" });
        }
        //Deleting the News
        await record.destroy();
        return res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error: "+ error });
    }
});
//?Update Function 
async function updateColumn(model, identifier,value) {
    try {
        // Perform the update operation
        const [updated] = await model.update(
            value,
            {
                where: identifier
            }
        );

        if (updated) {
            // Fetch and return the updated record
            const updatedRecord = await model.findOne({ where: identifier });
            return updatedRecord;
        } else {
            throw new Error('Record not found or no update needed');
        }
    } catch (error) {
        console.error('Error updating record:', error);
        throw error;
    }
}
module.exports = router