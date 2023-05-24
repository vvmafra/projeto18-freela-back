import { getCitiesNamesRepository } from "../repositories/cities.repository.js";

export async function getCities(req, res){
    try {
    const cityNames = await getCitiesNamesRepository()

    res.send(cityNames.rows)

    } catch (err) {
        res.status(500).send(err.message)
      }
}