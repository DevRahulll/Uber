const http=require('http')
const app=require('./app.js')
const dotenv=require('dotenv')
const connToDB=require("./db/db.js")

dotenv.config()

const PORT=process.env.PORT||8001
const server=http.createServer(app)

connToDB() 


server.listen(PORT,()=>{
    console.log(`Server is running at PORT:${PORT}`);
})
