import dotenv from "dotenv"
import app from "./app.js"

dotenv.config()

const PORT=process.env.PORT||8001

app.listen(PORT,()=>{
    console.log(`Server is running at PORT:${PORT}`);
})
