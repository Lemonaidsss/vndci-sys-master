const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

const registerUser = asyncHandler( async (req, res) => {
   const {name, email, password, isAdmin} =req.body

   //Validation
    if(!name || !email || !password || !isAdmin){
        res.status(400)
        throw new Error("Please fill in all required fields");
    }
    if(password.length < 6){
        res.status(400)
        throw new Error("Password must be atleast 6 characters");
    }

    //check if user email already exists
     const userExists = await User.findOne({email})

     if (userExists){
        res.status(400)
        throw new Error("Email already in use");
     }
     // Encrypt password before saving to db

     const salt = await bcrypt.genSalt(10)
     const hashedPassword = await bcrypt.hash(password, salt)

     //Create new user
     const user = await User.create({
        name,
        email,
        password: hashedPassword,
        isAdmin
     });

     if(user) {
        const{_id, name, email, isAdmin}= user
        res.status(201).json({
            _id, name, email, isAdmin
        })
     } else {
        res.status(400)
        throw new Error("invalid user data");
     }
    
});

module.exports = {
    registerUser,
};



