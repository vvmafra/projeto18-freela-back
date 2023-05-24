import { Router } from "express"
import citiesRouter from "./cities.routes.js"
import flightsRouter from "./flights.routes.js"

const router=Router()
router.use(citiesRouter)
router.use(flightsRouter)

export default router