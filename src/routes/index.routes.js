import { Router } from "express"
import citiesRouter from "./cities.routes.js"
import flightsRouter from "./flights.routes.js"
import accommodationsRouter from "./accommodations.routes.js"

const router=Router()
router.use(citiesRouter)
router.use(flightsRouter)
router.use(accommodationsRouter)

export default router