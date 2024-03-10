const express=require('express');
const router=express.Router();
const {signup,login}=require('../Controllers/auth');
const {authz,isStudent,isAdmin}=require('../Middlewares/authz');

router.post('/signup',signup);
router.post('/login',login);

router.get('/test',authz,(req,res)=>{
    return res.status(200).json({
        success:true,
        messgae:"Test success full",
    })
})

router.get('/student',authz,isStudent,(req,res)=>{
    return res.status(200).json({
        success:true,
        messgae:"Welcome to protected route for student",
    })
});

router.get('/admin',authz,isAdmin,(req,res)=>{
    return res.status(200).json({
        success:true,
        messgae:"Welcome to protected route for Admin",
    })
});

module.exports=router;