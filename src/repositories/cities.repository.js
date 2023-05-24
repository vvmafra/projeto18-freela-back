import { db } from "../database/database.connection.js"

export async function getCitiesNamesRepository() {
    return db.query(`SELECT * FROM cities;`)
}

