import { getCitiesNamesRepository } from "../repositories/cities.repository.js";

export async function getCities(req, res){
    try {
    const cityNames = await getCitiesNamesRepository()

    res.send(cityNames.rows)

    } catch (err) {
        res.status(500).send(err.message)
      }
}

export async function getCityId(req, res){
   const {id} = req.params

   try {
    const cityId = await getFlightsRepository(id)
    res.send(cityId.rows)
   }catch (err) {
    res.status(500).send(err.message)
  }
}