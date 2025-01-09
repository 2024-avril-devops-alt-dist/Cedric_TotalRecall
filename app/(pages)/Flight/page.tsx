"use client";
import React, { useEffect, useState } from "react";
import Menu from "../../components/Menu";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import "dayjs/locale/fr";
import "../../css/style.css";

interface Travels {
  company_name: string;
  id_travel: number;
  id_flights: number;
  flights: Flights[]; 
  flight: string;
  station_name: string;
}

interface Flights {
  id_flight: number;
  flight: string;
  departure_station: Station;
  arrival_station: Station;
  station_name: string;
  departure_day_time: Date;
  arrival_day_time: Date;
}
interface Station {
  id_station: string;
  station_name: string;
}

const Flight = () => {
  const [travels, setTravels] = useState([]);
  console.log("Travels", travels)
  dayjs.extend(localizedFormat);
  dayjs.locale("fr");

  useEffect(() => {
    async function fetchTravels() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/${process.env.NEXT_PUBLIC_VERSION}/travels`
        );
        const data = await res.json();
        setTravels(data.travels || []);
      } catch (error) {
        console.error("Failed to fetch travels:", error);
        setTravels([]);
      }
    }
    fetchTravels();
  }, []);

  if (!travels.length) {
    return <div>Chargement...</div>;
  }
  return (
    <div className="container">
      <Menu background="venus.jpg" />
      <div className="content">
        <div className="box">
          <h1>Voyages intergalactique ({travels.length})</h1>

          <>
            {travels.map((travel: Travels) => {
              const flights = travel.flights || [];

              return (
                <div key={travel.id_travel} className="travel">
                  <h3>Voyage avec {flights.length} escales</h3>
                  {flights.map((flight: Flights) => {
                    const departureTime = dayjs(
                      flight.departure_day_time
                    ).format("DD/MM/YYYY HH:mm");
                    const arrivalTime = dayjs(flight.arrival_day_time).format(
                      "DD/MM/YYYY HH:mm"
                    );

                    return (
                      <div key={flight.id_flight} className="flight">
                        Départ le <b>{departureTime}</b> de la station{" "}
                        <b>
                          {flight.departure_station?.station_name || "Unknown"}
                        </b>{" "}
                        <br />
                        Arrivée le <b>{arrivalTime}</b> sur{" "}
                        <b>
                          {flight.arrival_station?.station_name || "Unknown"}
                        </b>{" "}
                        <br />
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </>
        </div>
      </div>
    </div>
  );
};

export default Flight;
