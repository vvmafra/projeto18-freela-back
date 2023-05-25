import { db } from "../database/database.connection.js"

export async function getFlightsRepository(id) {
    return db.query(`SELECT * FROM flights WHERE "idCityTo"=$1;`, [id])
}

export async function getFlightsDetailsRepository(id) {
    return db.query(`SELECT * FROM flights WHERE id=$1`, [id])
}