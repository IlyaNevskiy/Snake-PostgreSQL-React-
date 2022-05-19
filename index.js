const express = require('express')
const userRouter = require('./routes/user.routes')
const scoreRouter = require('./routes/score.routes')
const cors = require ('cors');


const PORT = process.env.PORT || 5000

const app = express()

app.use(cors()) 
app.use(express.json())
app.use(express.json({ extended: true }))
app.use('/api', userRouter)
app.use('/api', scoreRouter)

app.listen(PORT, () => console.log(`server has been started on port: ${PORT}`) )