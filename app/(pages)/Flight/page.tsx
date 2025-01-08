"use client"
import React, { useEffect, useState } from 'react';
import Image from "next/image";
import Menu from '../../components/Menu';
import '../../css/style.css';

const Flight = () => {
  const [travels, setTravels] = useState([]);
  console.log("-----", travels)
  
  useEffect(() => {
    async function fetchTravels() {
      try {
        const res = await fetch("http://localhost:3000/api/v1/travels");
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
    return <div>Loading...</div>;
    }
  return (
    <div className="container">
      <Menu />
      <div className="background">
        <Image src="/Images/venus.jpg" layout="fill" objectFit="cover" alt="Mars" />
      </div>
      <div className="content">
        <div className="box">
        <h1>Voyages intergalactique ({travels.length})</h1>

        <>
  {travels.map((travel) => {
    const flights = (travel.flights || []);
    const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };

    return (
      <div key={travel.id_travel} className="travel">
        <h3>Voyage avec {flights.length} escales</h3>
        {flights.map((flight) => {
          const departureTime = new Date(flight.departure_day_time).toLocaleString("fr-FR", options);
          const arrivalTime = new Date(flight.arrival_day_time).toLocaleString("fr-FR", options);

          return (
            <div key={flight.id_flight} className="flight">
              Départ le <b>{departureTime}</b> de la station <b>{flight.departure_station?.station_name || "Unknown"}</b> <br />
              Arrivée le <b>{arrivalTime}</b> sur <b>{flight.arrival_station?.station_name || "Unknown"}</b> <br />
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
