const User=require('../Models/User');
const bcrypt=require('bcrypt');

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
