import { Router } from "express"
import { getFlightCities, getFlightId } from "../controllers/flights.controllers.js"

const flightsRouter = Router()

flightsRouter.get("/flights/:id", getFlightCities)
flightsRouter.get("/flight/:id", getFlightId)

export default flightsRouter