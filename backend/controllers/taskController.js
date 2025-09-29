import Tasks from "../models/Tasks.js"


export const createTask = async(req,res) =>{
    try {
        const {workdayid} = req.params
        const {maintask, subtasks} = req.body
        const {category} = req.body
        if(!maintask || !subtasks || !category) {
            return res.json({success: false, message: "Missing fields"})
        }
        const task = await Tasks.create({workday:workdayid,maintask:maintask, subtasks:subtasks, category:category})
        return res.json({success:true, task})
    } catch (error) {
        res.json({success:false, message:error.message})
    }
}
export const showTasks = async(req,res) => {
    try {
        const {workdayid} = req.params
        const tasks = await Tasks.find({workday:workdayid})
        res.json({success:true, tasks})
    } catch (error) {
        res.json({success:false, message:error.message})
    }
}