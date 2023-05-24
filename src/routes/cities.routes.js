import { Router } from "express"
import { getCities } from "../controllers/cities.controllers.js"

const citiesRouter = Router()

citiesRouter.get("/cities", getCities)

export default citiesRouter