import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectDB from './config/db.js'
import userRouter from './routes/userRoutes.js'
import workdayRouter from './routes/workdayRoutes.js'
import taskRouter from './routes/taskRoutes.js'

const app = express()
await connectDB()

app.use(cors())
app.use(express.json())

app.get('/',(req,res)=>{
    res.send("Backend is working")
})

app.use('/api/user', userRouter)
app.use('/api/workday', workdayRouter)
app.use('/api/task', taskRouter)

const port = process.env.PORT || 3000

app.listen(port, ()=>{
    console.log("Backend running on port",port)
})

export default app