const express=require('express');
const dbConnect=require('./Config/database');
const userRoutes=require('./Routes/userRoutes');
const app=express();
require('dotenv').config();
app.use(express.json());

const PORT=process.env.PORT || 8080;

app.use('/api/v1',userRoutes);

app.get('/',(req,res)=>{
    res.send(`<h1> Welcome to home page </h1>`);
})

app.listen(PORT,()=>{
    console.log(`Server started at PORT ${PORT}`);
})

dbConnect();
