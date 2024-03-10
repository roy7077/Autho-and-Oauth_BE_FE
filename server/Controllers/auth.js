const User=require('../Models/User');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
require('dotenv').config();

exports.signup=async (req,res)=>{
    try{
        const {name,email,password,role}=req.body;
        
        //checking that user exist or not
        const check=await User.findOne({email});
        if(check)
        {
            return res.status(400).json({
                success:false,
                message:"User already exist with is email"
            })
        }

        //hashing password
        let hashPassword;
        try{
            hashPassword=await bcrypt.hash(password,10);
        }
        catch(error)
        {
            return res.status(500).json({
                success:false,
                message:"Error while hashing password",
            })
        }

        // creating user in db
        const response=await User.create({name,email,password:hashPassword,role});
        return res.status(200).json({
            success:true,
            message:"Created succesfuly",
            data:response,
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"User cannot be created",
        })
    }
}


exports.login=async (req,res)=>{
    
    try{
        // validation
        const {password,email}=req.body;
        if(!password || !email)
        {
            return res.status(400).json({
                success:false,
                message:"Please enter complete information"
            })
        }

        let user= await User.findOne({email});
        if(!user)
        {
            return res.status(400).json({
                success:false,
                message:"There is no user with this email id , signup first"
            })
        }
        
        const payload={
            email,
            id:user._id,
            role:user.role,
        }
        if (await bcrypt.compare(password, user.password)) {
            // Token generation
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "2h"
            });
        
            // Set user's token
            user=user.toObject();
            user.token = token;
        
            // Remove password from user object
            delete user.password;
        
            // Set cookies
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            };
        
            // Return response with token and user data
            return res.cookie('token', token, options).json({
                success: true,
                message: "Login successful",
                user: user, // Sending modified user object
                token: token,
            });
        } else {
            return res.status(400).json({
                success: false,
                message: "Password is incorrect"
            });
        }
        
    }
    catch(error){
        console.log(error);
        return res.status(400).json({
            success:false,
            message:"Error while login",
        })
    }
}