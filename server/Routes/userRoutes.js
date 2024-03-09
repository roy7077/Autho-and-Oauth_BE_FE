const express=require('express');
const router=express.Router();
const {signup,login}=require('../Controllers/auth');

router.post('/signup',signup);

module.exports=router;