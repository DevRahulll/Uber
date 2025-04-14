const express=require('express')
const cors=require("cors")
const morgan=require("morgan")
const router=require("./routes/user.routes.js")
const cookieParser = require('cookie-parser')


const app=express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use(morgan('dev'))

app.use("/api/v1/users",router)

app.get("/ping",(req,res)=>{
    res.send("<h1>PONG!! HELLO THERE</h1>")
})

module.exports=app;