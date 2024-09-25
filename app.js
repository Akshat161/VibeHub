import express, { request } from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))
app.use(cookieParser())

//routes imports
import userRouter from './routes/user.routes.js'
import postRouter from './routes/post.routes.js'
import requestRouter from './routes/request.routes.js'
import profileRouter from './routes/profile.routes.js'
import feedRouter from './routes/feed.routes.js'

//routes declaration
app.use("/api/v1/users", userRouter)
app.use("/api/v1/posts", postRouter)
app.use("/api/v1/request", requestRouter)
app.use("/api/v1/profile", profileRouter)
app.use("/api/v1/feed", feedRouter)


export { app }
// /api/v1/users/register