import { Router } from "express"
import citiesRouter from "./cities.routes.js"

const router=Router()
router.use(citiesRouter)

export default router