import "./shared/config/exceptions"
import express, {  type Express,type Request,type Response } from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { configDotenv } from "dotenv"
import { securityMiddleware } from "./shared/config/security"

configDotenv()
const app :Express = express()
app.use(cors({"origin":"*"}))
app.use(express.json())
app.use(cookieParser())
app.use(securityMiddleware)
app.listen(process.env.PORT ,()=> console.log(`listenning on port: ${process.env.PORT}`))
