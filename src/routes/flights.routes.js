import { Router } from "express"
import { getFlightId } from "../controllers/flights.controllers.js"

const flightsRouter = Router()

flightsRouter.get("/flights/:id", getFlightId)

export default flightsRouter