import express from 'express'
import { createTask, showTasks } from '../controllers/taskController.js'

const taskRouter = express.Router()

taskRouter.post('/create/:workdayid',createTask)
taskRouter.get('/show/:workdayid', showTasks)

export default taskRouter