const express = require("express");
const app = express();

const connectToDatabase = require("./startup/db");
const setupRoutes = require("./startup/routes");

const port=4000;

connectToDatabase();
setupRoutes(app);

app.listen(port,()=>{
    console.log(`server is running on ${port}`)
})
