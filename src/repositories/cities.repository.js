import { db } from "../database/database.connection.js"

export async function getCitiesNamesRepository() {
    return db.query(`SELECT name FROM cities;`)
}

export async function getCitiesRepositoryId(id) {
    return db.query(`SELECT * FROM cities WHERE id=$1;`, [id])
}