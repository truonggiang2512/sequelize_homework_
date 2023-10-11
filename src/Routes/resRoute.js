import express from "express"
import { getLikeRes, getRateRes } from "../controllers/resControllers.js"
const resRoute = express.Router()

resRoute.get("/get-res-like/:id", getLikeRes)
resRoute.get("/get-res-rate/:id", getRateRes)



export default resRoute