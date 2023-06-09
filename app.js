import express, { urlencoded } from "express"
import dotenv from "dotenv"
import {connectPassport} from "./utils/provider.js"
import cookieParser from "cookie-parser"
import session from "cookie-session"
import { errorMiddleware } from "./middelware/errorMiddelWare.js"
import passport from "passport" 
import cors from "cors"

const app = express()

export default app

dotenv.config({
    path:"./config/config.env"
})

//Using MiddleWares
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "production" ? None : false,
  },
}));


app.use(passport.authenticate("session"))
app.use(passport.initialize())
app.use(passport.session())
app.enable("trust proxy")
app.use(cookieParser())
app.use(express.json())
app.use(urlencoded({
    extended:true,
}))
app.use(cors({
    credentials:true,
    origin:process.env.FRONTEND_URL,
    methods:["GET", "POST", "PUT", "DELETE"]
}))
connectPassport()
//Importing Routes

import userRoute from "./routes/user.js" 
import orderRoute from "./routes/order.js"

app.use("/api/v1", userRoute)
app.use("/api/v1", orderRoute)

//Using error middelWare
app.use(errorMiddleware)
