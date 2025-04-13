import express from "express"
import cors from "cors"



const app=express()
app.use(cors())
app.use(express.json())

app.get("/ping",(req,res)=>{
    res.send("<h1>PONG!! HELLO THERE</h1>")
})

export default app;