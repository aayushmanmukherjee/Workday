import express from 'express'
import auth from '../middlewares/auth.js'
import { createWorkday, deleteWorkday, showWorkdays } from '../controllers/workdayController.js'

const workdayRouter = express.Router()

workdayRouter.post('/create', auth, createWorkday)
workdayRouter.delete('/delete/:workdayid', deleteWorkday)
workdayRouter.get('/show',auth,showWorkdays)

export default workdayRouter