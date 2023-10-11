import express from "express"
import resRoute from "./resRoute.js"
import userRoute from "./userRoute.js"
const rootRoute = express.Router()

rootRoute.use("/user", userRoute)
rootRoute.use("/res", resRoute)
export default rootRoute;