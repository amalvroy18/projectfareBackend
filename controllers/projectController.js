const projects = require('../model/projectModel')


exports.addProjectController =async(req,res)=>{
    console.log('inside addProjectController');
    const userId =req.payload
    console.log(userId);
    console.log(req.body);


    const{title , language,github,website,overview} = req.body
    console.log(title , language,github,website,overview);

    const projectImage = req.file.filename
    console.log(projectImage);

    try{
        const existingProject = await projects.findOne({github})
        if(existingProject){
            res.status(406).json('project already exist')
        }else{
            const newProject = new projects({
                title,
                language,
                github,
                website,
                overview,
                projectImage:projectImage,
                userId
            })
            await newProject.save()
            res.status(200).json(newProject)
           

        }    

    }catch(error) {
        res.status(401).json(error)
    }

    
    

    


    res.status(200).json('request received')
    

}

//get all project

exports.getAllProjectController = async(req,res)=>{

    const searchKey = req.query.searchKey
    console.log(searchKey);

    const query = {
        language:{
            
            $regex:searchKey,$options:'i'
        }
    }
    

    try{
        const allProject = await projects.find()
        res.status(200).json(allProject)
    }catch(error){
        res.status(401).json(error)
    }
}
//get home projects

exports.getHomeProjectController = async(req,res)=>{
    try {
        const homeproject = await projects.find().limit(3)
        res.status(200).json(homeproject)
    }catch (error){
        res.status(401).json(error)
    }
}

//get userproject

exports.getUserProjectController = async(req,res)=>{
    const userId =req.payload

    try {
        const userProject = await projects.find({userId})
        res.status(200).json(userProject)
    }
    catch{
        res.status(401).json(error)
    }
}

//delete project
exports.deleteUserProjectController =async(req,res)=>{
    /* const {id} = req */
}

//edit project controller
exports.editUserProjectController = async (req,res)=>{
    const {title , language , github , website , overview , projectImg} = req.body
    const projectimage =req.file?req.file.filename:projectImg
    console.log(projectimage);
    
    const id = req.params
    
    console.log(id);
    const userId = req.payload

    try {
        const existingProject = await projects.findByIdAndUpdate({_id:id},{
            title,
            language,
            github,
            website,
            overview,
            projectImage:projectimage,
            userId
    
        },{new:true})
        await existingProject.save()
        res.status(200).json(existingProject)
    } catch (error) {
        res.status(401).json(error)
    }
    
}