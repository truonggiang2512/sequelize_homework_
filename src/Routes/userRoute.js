import express from "express"
import { getLikeUser, getRateUser, postUserLike, postUserRate, userOrder } from "../controllers/userControllers.js"
const userRoute = express.Router()

userRoute.get("/get-like-user/:id", getLikeUser)
userRoute.post("/like-res/:userId/like/:resId", postUserLike)
userRoute.post("/order-food", userOrder)
userRoute.post("/rate-restaurant", postUserRate)
userRoute.get("/get-rate-user/:id", getRateUser)

export default userRoute