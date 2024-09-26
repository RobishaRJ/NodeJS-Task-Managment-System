const express = require('express');
const Users = require('../Modules/Users');
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
router.get("/", jsonParser,auth,checkType('admin'),async (req, res) => {
    try {
        const users = await Users.findAll();
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json("Internal Server Error :" + error);
    }
});
//adding new admin 
router.post('/CreateUser',jsonParser,auth,checkType('admin'),async (req, res) => {
 //   const payload = req.auth;
    try {
        const Password = await hashing(req.body.password);
        const user = await Users.create({
            user_id: "user" + Id,
            name:req.body.name,
            email:req.body.email,
            password: Password,
            role:req.body.role
        })
        res.status(200).json("Created New Account For: " + user.name + " " + " As " + user.role);
    } catch (error) {
        res.status(500).json('Internal Error:' + error);
    }
})
//Update Product
router.patch('/UpdateUser/:id',jsonParser,auth,async (req, res) => {
    const identifier = { user_id:req.params.id };
    const Value = req.body;
    if ('role' in req.body || 'password' in req.body) {
        res.status(401).json("Forbidden: Editing Role Needs permissions")
        console.log('Password field is present');
    } else {
        try {
            const updatedRecord = await updateColumn(Users, identifier,Value);
            res.status(200).json("Updated Record");
        } catch (error) {
            res.status(500).json("Error Updating Product: " + error);
        }
    }
});
//! Forget Password
router.patch('/ForgetPassword/:id',jsonParser,async(req,res)=>{
    try {
      const email=req.body.email;
    //Password Generating
      const pass=uuidv4()
    //Finding User
    const user = await Users.findOne({where:{email:email}})
    //Hashing
    const Hpass=await hashing(pass)
    //Subject and Email
    const emailParams = await generatePasswordResetEmail(user.name, pass);
    try {
      const result = await SendEmail(user.email, emailParams.subject,emailParams.body);
      try {
        const Update = await Users.update(
          { Password: Hpass },
          { where: { email: email } }
        );
        if (Update.n === 0) {
          return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json("User Updated");
      } catch (databaseError) {
        // Handle database update error
        console.error("Error updating password:", databaseError);
        res.status(500).json("Error updating password");
      }
    } catch (error) {
      console.error("Error Resetting Password:", error);
      // Handle error
    }
    } catch (error) {
      res.status(500).json("internal Server Error: "+error);
    }
  })
//Delete Product 
router.delete("/DeleteUser/:id",jsonParser,auth,checkType('admin'),async(req, res) => {
    const Id = req.params.id;
    try {
        const record = await Users.findOne({ where: { user_id: Id } });
        if (!record) {
            return res.status(404).json({ message: "User not found" });
        }
        //Deleting the News
        await record.destroy();
        return res.status(200).json({ message: "User deleted successfully" });
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