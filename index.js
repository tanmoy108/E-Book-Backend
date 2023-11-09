const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
require("dotenv").config();
const UserRoute = require("./route/User")
const app = express();

app.use(cors())
app.use(express.json())

app.use("/",UserRoute.routes)



main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(process.env.DB);
    console.log("database connected on "+process.env.DB)
}

app.listen(process.env.PORT,()=>{
    console.log("server connected on "+process.env.PORT)
})