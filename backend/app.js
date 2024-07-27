const express = require('express');
const mongoose = require('mongoose');
const app=express();
const cors = require("cors");
const bodyParser = require("body-parser");

const UserRouter = require('./src/routes/userRoutes');


app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb+srv://prabhuvamsi:MknZp0p0JOzbNPeM@cluster0.enb7uoz.mongodb.net/Cluster0?retryWrites=true&w=majority')

.then(() => app.listen(5000))
.then(() =>
console.log("Connected to Database & Listening to localhost 3001")
)
.catch((err) => console.log(err));


//Routes
app.use('/',UserRouter);
