import { Router } from "express"
import { getAccommodationId, getAccommodations } from "../controllers/accommodations.controllers.js"

const accommodationsRouter = Router()

accommodationsRouter.get("/accommodations/:id", getAccommodations)
accommodationsRouter.get("/accommodation/:id", getAccommodationId)


export default accommodationsRouter