import { db } from "../database/database.connection.js"

export async function getAccommodationsRepository(id) {
    return db.query(`SELECT * FROM accommodations WHERE "idCity"=$1;`,[id])
}

export async function getAccommodationIdRepository(id) {
    return db.query(`SELECT * FROM accommodations WHERE "id"=$1;`,[id])
}