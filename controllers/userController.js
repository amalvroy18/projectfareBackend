const users = require('../model/userModel')
const jwt = require('jsonwebtoken')
//register
exports.registerController =async(req,res)=>{
    //logic
    const{username ,email ,password}=req.body
    console.log(username,email,password);
    

    try{
        const existingUser = await users.findOne({email})
        if(existingUser){
        res.status(406).json('Account already exist')
        }
        else{
            const newUser = new users({
                username,
                email,
                password,
                github:"",
                linkedIn:"",
                profile:""
            })
            await newUser.save()
            res.status(200).json(newUser)
        } 
    }catch (error){
        res.status(401).json(error)
    }
      
}
//login
exports.loginController = async(req,res)=>{
    const {email, password}=req.body
    console.log(email,password);

    try {
        const existingUser =await users.findOne({email, password})
        if(existingUser){
            const token =jwt.sign({userId:existingUser._id},"supersecretekey")
            res.status(200).json({existingUser,token})
        }
        else{
            res.status(406).json('Account does not exist')
        }
    }catch(error){
        res.status(401).json(error)
    }
     
}

//update profile
exports.updateProfileController = async(req,res)=>{
    const userId = req.payload
    const profileImg = req.file? req.file.filename:profile

    try{
        const existingUser = await users.findByIdAndUpdate({_id:id},{username,email,password,github,password,github,linkedIn,profile},{new:true})
        await existingUser.save()
        res.status(200).json(existingUser)

    }catch(error){
        res.status(401).json(error)
    }
}
