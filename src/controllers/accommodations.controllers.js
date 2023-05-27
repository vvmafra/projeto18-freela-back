import { db } from "../database/database.connection.js";
import { getAccommodationIdRepository, getAccommodationsRepository } from "../repositories/accommodatiions.repository.js";


export async function getAccommodations(req, res){
    const {id} = req.params
    const cityAccommodations = await getAccommodationsRepository(id)

    if (cityAccommodations.rowCount === 0) return res.status(404).send("No Accommodations avaiable for this destination")

    try {

        const priceObj = await db.query(`SELECT
        MIN("pricePerDay") AS "minPrice",
        MAX("pricePerDay") AS "maxPrice"
        FROM accommodations
        `)

        const minPrice = priceObj.rows[0].minPrice;
        const maxPrice = priceObj.rows[0].maxPrice;

        
        const accommodationsObj = await db.query(`SELECT accommodations.id, 
        accommodations.name as name, 
        "pricePerDay",
        description,
        cities.name as city
        FROM accommodations
        JOIN cities ON cities.id = accommodations."idCity"
        WHERE cities.id=$1
        GROUP BY accommodations.id, cities.name
        `, [id])

        const accommodationDetails = {minPrice, maxPrice,
        accommodations: accommodationsObj.rows}

        console.log(accommodationDetails)

        res.send(accommodationDetails)
    } catch (err) {
        res.status(500).send(err.message)
      }
}

export async function getAccommodationId(req, res){
    const {id} = req.params
    const accommodation = getAccommodationIdRepository(id)

    if (accommodation.rowCount === 0) return res.status(404).send("This Accommodation does not exist")

    try {
        const photos = await db.query(`SELECT photos.id, photos.url
        FROM photos 
        WHERE photos."idAccommodation"=$1`,[id])

        const facilities = await db.query(`SELECT facilities.id, facilities.name
        FROM facilities
        WHERE facilities."idAccommodation"=$1`, [id])

        const accommodationDetails = await db.query(`SELECT accommodations.id, 
        accommodations.name, 
        accommodations."pricePerDay",
        cities.name,
        accommodations.description
        FROM accommodations
        JOIN cities ON cities.id = accommodations."idCity"
        WHERE accommodations.id=$1`,[id])

        const photosRows = photos.rows
        const facilitiesRows = facilities.rows
        const accommodationDetailsRows = accommodationDetails.rows[0]
        
        const accommodationInfos = ({...accommodationDetailsRows, photosRows, facilitiesRows})

        res.send(accommodationInfos)
    } catch (err) {
        res.status(500).send(err.message)
      }

}