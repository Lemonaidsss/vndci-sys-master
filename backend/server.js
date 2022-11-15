const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoute = require("./routes/userRoute");
const itemRoute = require( "./routes/itemRoute");
const errorHandler = require("./middleWare/errorMiddleware.js");

const app = express();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());

//Routes Middleware
app.use("/api/users", userRoute);
app.use("/api/items", itemRoute);

// Routes
app.get("/",(req,res) =>{
    res.send("Home page");
});

//Error Middleware
app.use(errorHandler);

//connect to mongodb and start server
const PORT = process.env.PORT || 3000;

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
            app.listen(PORT, () => {
                console.log(`server Running on port ${PORT}`)
            })
        })
    .catch((err) => console.log (err))
