import { getFlightsRepository } from "../repositories/flights.repository.js"

export async function getFlightId(req, res){
    const {id} = req.params
 
    try {
     const cityId = await getFlightsRepository(id)
     if (cityId.rowCount === 0) return res.send("No Flights avaiable for this destination").status(404)
     res.send(cityId.rows)
    }catch (err) {
     res.status(500).send(err.message)
   }
 }