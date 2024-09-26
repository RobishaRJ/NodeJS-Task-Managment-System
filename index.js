//? LIBRARY IMPORT 
const express = require('express');
const db = require("./config/db");
const cors = require("cors");
//?Rout IMPORTS
const UsersRouter = require('./Routes/Users');
const LoginRouter = require('./Routes/Login');
const TasksRouter = require('./Routes/Tasks');
//?App 
const app = express();

//? Server Listening on Port 5000
app.use(cors())
const PORT = process.env.PORT || 5000;
 db.authenticate()
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Express server is running on port ${PORT}`);
    })
)
 .catch((err) => console.log("Error:" + err));

//?Routes Assigning 
app.use('/api/Users',UsersRouter);
app.use('/api/Login',LoginRouter);
app.use('/api/Tasks',TasksRouter);