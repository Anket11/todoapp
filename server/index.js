const express = require("express");
const app = express();
const cors = require('cors');
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
require("dotenv").config();
const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 5500;
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/todo");

const Todo = require("./Todo");

app.use("/", require("./routes/todoRoute"));
app.use("/api", require("./routes/todoRoute"));

// app.use('/api',require('./routes/todoroute'))

app.listen(PORT, () => console.log(`Server listening at port ${PORT}`));
