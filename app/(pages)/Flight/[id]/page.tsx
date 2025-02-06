// pages/Flight/[id]/page.js
"use client";
import React, { useEffect, useState } from "react";
import Menu from "@/app/components/Menu";
import dayjs from "dayjs";
import { useParams } from 'next/navigation';
import useFetchData from "@/lib/useFetchData";
import Link from "next/link";
import "@/app/css/style.css";

const FlightDetail = () => {
  const { id } = useParams();
  const route = "travels";
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/${process.env.NEXT_PUBLIC_VERSION}/${route}/${id}`;
  const queryKey = [route, id]; 
  const { isPending, error, data } = useFetchData(url, queryKey);
  const flightDetail = data || null;

  if (isPending) return "Chargement...";
  if (error) return "Une erreur est survenue: " + error.message;



  const travel = data.travels; // Le travel spécifique
  const flights = travel.flights || [];
  const company = travel.company || {};

  const firstFlight = flights[0];
  const lastFlight = flights[flights.length - 1];

  const firstStation = firstFlight?.departure_station?.station_name || "Unknown";
  const lastStation = lastFlight?.arrival_station?.station_name || "Unknown";

  const departureTime = firstFlight
    ? dayjs(firstFlight.departure_day_time).format("DD/MM/YYYY HH:mm")
    : "Unknown";
  const arrivalTime = lastFlight
    ? dayjs(lastFlight.arrival_day_time).format("DD/MM/YYYY HH:mm")
    : "Unknown";


  console.log("----------------", flightDetail);
  return (
    <div className="container">
      <Menu background="mars3.jpg" />
      <div className="content">
        <div className="box">
          <h1>Détails du voyage</h1>
          <div className="travel">
            <h2>
              De {firstStation} vers {lastStation} ({flights.length} vols)
            </h2>
            <p>Départ le {departureTime}</p>
            <p>Arrivée le {arrivalTime}</p>

            {flights.map((flight) => {
            const flightDepartureTime = dayjs(flight.departure_day_time).format("DD/MM/YYYY HH:mm");
            const flightArrivalTime = dayjs(flight.arrival_day_time).format("DD/MM/YYYY HH:mm");

            return (
              <div key={flight.id_flight} className="flight">
                <hr />
                <div>
                  Départ le <b>{flightDepartureTime}</b> de la station{" "}
                  <b>{flight.departure_station?.station_name || "Unknown"}</b>
                  <br />
                  Arrivée le <b>{flightArrivalTime}</b> sur{" "}
                  <b>{flight.arrival_station?.station_name || "Unknown"}</b>
                  <br />
                  Sièges disponibles: <b>{flight.seats}</b>
                </div>
              </div>
            );
          })}
                    <Link
                      className="login-button reserve"
                      href={`/Reservation/${travel.id_travel}`}
                      key={travel.id_travel}
                    >
                      Réserver
                    </Link>
                    <br />
                    <p className="blank">&nbsp;</p>
          </div>
        </div>
      </div>
    </div>
  );
};


export default FlightDetail;
