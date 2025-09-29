import jwt from 'jsonwebtoken'
import Users from "../models/Users.js"


export const login = async(req,res) =>{
    try {
        const {passkey} = req.body
        if(!passkey) {
            return res.json({success:false, message:"Missing field"})
        }
        const exists = await Users.findOne({passkey})
        if(exists) {
            const token = jwt.sign({ userid: exists._id }, process.env.JWT_SECRET);
            return res.json({success:true, token})
        }
        const user = await Users.create({passkey})
        const token = jwt.sign({ userid: user._id }, process.env.JWT_SECRET);
        return res.json({success:true, token})
    } catch (error) {
        res.json({success:false, message:error.message})
    }
}