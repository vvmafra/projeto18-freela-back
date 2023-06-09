import { db } from "../database/database.connection.js"
import { getFlightsDetailsRepository, getFlightsRepository } from "../repositories/flights.repository.js"
import dayjs from "dayjs"
import flightsRouter from "../routes/flights.routes.js"

export async function getFlightCities(req, res){
    const {id} = req.params
 
    try {
     const flights = await getFlightsRepository(id)
     if (flights.rowCount === 0) return res.status(404).send("No Flights avaiable for this destination")

      const priceObj = await db.query(`SELECT 
        MIN(flights.price) AS "minPrice",
        MAX(flights.price) AS "maxPrice"
        FROM flights
        WHERE "idCityTo"=$1`, [id]);
        const minPrice = priceObj.rows[0].minPrice;
        const maxPrice = priceObj.rows[0].maxPrice;

      const flightsObj = await db.query(`SELECT 
      MIN(flights.price) AS "minPrice",
      MAX(flights.price) AS "maxPrice",
      flights.id AS id, 
      price, 
      city1.name AS "departureCity", 
      city2.name AS "arrivalCity",
      flights."departureTime"
      FROM flights
      JOIN cities city1 ON flights."idCityFrom" = city1.id
      JOIN cities city2 ON flights."idCityTo" = city2.id
      WHERE city2.id=$1
      GROUP BY flights.id, price, city1.name, city2.name`, [id])

      const flightsDetails = {
        minPrice,
        maxPrice,
        flights: flightsObj.rows.map(item => {
          const departureTime = dayjs(item.departureTime);
          const departureDay = departureTime.format('DD-MM-YYYY');
          const departureHour = departureTime.format('HH:mm');
        
          return { ...item, departureDay, departureHour };
        })
      };
      res.send(flightsDetails).status(200)

    } catch (err) {
     res.status(500).send(err.message)
   }
 }

 export async function getFlightId(req, res) {
    const {id} = req.params

    try {
    const flight = await getFlightsDetailsRepository(id)
    if (flight.rowCount === 0) return res.status(404).send("This Flight does not exist")

    const departureTime = flight.rows[0].departureTime
    const dateDeparture = dayjs(departureTime)
    const dayDeparture = dateDeparture.format('DD-MM-YYYY')
    const timeDeparture = dateDeparture.format('HH:mm')

    const arrivalTime = flight.rows[0].arrivalTime
    const dateArrival = dayjs(arrivalTime)
    const dayArrival = dateArrival.format('DD-MM-YYYY')
    const timeArrival = dateArrival.format('HH:mm')

    const flightDetails = await db.query(`SELECT flights.id as id, 
    price, 
    city1.name AS "departureCity", 
    city2.name AS "arrivalCity",
    airlines.name AS "airline"
    FROM flights
    JOIN cities city1 ON flights."idCityFrom" = city1.id
    JOIN cities city2 ON flights."idCityTo" = city2.id
    JOIN airlines ON flights."idAirline" = airlines.id
    WHERE flights.id=$1`, [id])

    console.log(flightDetails.rows)

    const flightObject = ({...flightDetails.rows[0], dayDeparture, timeDeparture, dayArrival, timeArrival})

    res.send(flightObject)
    } catch (err) {
        res.status(500).send(err.message)
      }
 }