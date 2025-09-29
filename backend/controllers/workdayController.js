import Tasks from "../models/Tasks.js";
import Workdays from "../models/Workdays.js";


export const createWorkday = async(req,res) =>{
    try {
        const userid = req.userid
        const {date} = req.body
        if(!date) {
            return res.json({success:false, message:"Missing field"})
        }
        const exists = await Workdays.findOne({user:userid, date})
        if(exists) {
            return res.json({success:false, message:"Workday already exists"})
        }
        const workday = await Workdays.create({user:userid, date})
        return res.json({success:true, workday})
    } catch (error) {
        res.json({success:false, message:error.message})
    }
}
export const deleteWorkday = async(req,res) =>{
    try {
        const {workdayid} = req.params
        const workday = await Workdays.findById(workdayid)
        if(!workday) {
            return res.json({success:false,message:"Workday doesn't exist"})
        }
        await workday.deleteOne()
        await Tasks.deleteMany({ workday: workdayid });
        return res.json({success:true, message:"Workday has been deleted"})
    } catch (error) {
        res.json({success:false, message:error.message})
    }
}

export const showWorkdays = async(req,res) =>{
    try {
        const userid = req.userid
        const workdays = await Workdays.find({user:userid})
        return res.json({success:true, workdays})
    } catch (error) {
        res.json({success:false, message:error.message})
    }
}