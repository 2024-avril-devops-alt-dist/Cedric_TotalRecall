// pages/Flight.js
"use client";
import React, { useState } from "react";
import Menu from "@/app/components/Menu";
import dayjs from "dayjs";
import useFetchData from "@/lib/useFetchData";
import { Travels, Flights, Station } from "@/lib/Types";
import Search, { normalizeAndIncludes } from "@/app/components/Search";
import Link from "next/link";
import "@/app/css/style.css";

const Flight = () => {
  const [search, setSearch] = useState("");
  const [expandedTravelId, setExpandedTravelId] = useState<string | null>(null);
  const route = "travels";
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/${process.env.NEXT_PUBLIC_VERSION}/${route}`;
  const queryKey = [route];
  const { isPending, error, data } = useFetchData(url, queryKey);

  if (isPending) return "Chargement...";
  if (error) return "An error has occurred: " + error.message;

  const filtered = data.travels.filter((travel: Travels) =>
    travel.flights.some((flight: Flights) =>
      normalizeAndIncludes(
        `${flight.departure_station?.station_name}, ${flight.arrival_station?.station_name}`,
        search
      )
    )
  );

  const toggleDetails = (travelId: string) => {
    setExpandedTravelId(expandedTravelId === travelId ? null : travelId);
  };

  return (
    <div className="container">
      <Menu background="venus.jpg" />
      <div className="content">
        <div className="box">
          <h1>Voyages intergalactiques ({data.travels.length})</h1>
          <Search
            search={search}
            setSearch={setSearch}
            placeholder="Un départ, une destination..."
          />
          {filtered.map((travel: Travels) => {
            const flights = travel.flights || [];
            const firstFlight = flights[0];
            const lastFlight = flights[flights.length - 1];

            const firstStation =
              firstFlight?.departure_station?.station_name || "Unknown";
            const lastStation =
              lastFlight?.arrival_station?.station_name || "Unknown";

            const departureTime = firstFlight
              ? dayjs(firstFlight.departure_day_time).format("DD/MM/YYYY HH:mm")
              : "Unknown";
            const arrivalTime = lastFlight
              ? dayjs(lastFlight.arrival_day_time).format("DD/MM/YYYY HH:mm")
              : "Unknown";

            return (
              <div key={travel.id_travel} className="travel ">
                <div
                  className="pointer"
                  onClick={() => toggleDetails(travel.id_travel)}
                >
                  <h2>
                    De {firstStation} vers {lastStation} ({flights.length} )
                  </h2>
                  <p>Départ le {departureTime} </p>
                </div>
                {expandedTravelId === travel.id_travel && (
                  <div className="travel-details">
                    {flights.map((flight: Flights) => {
                      const flightDepartureTime = dayjs(
                        flight.departure_day_time
                      ).format("DD/MM/YYYY HH:mm");
                      const flightArrivalTime = dayjs(
                        flight.arrival_day_time
                      ).format("DD/MM/YYYY HH:mm");

                      return (
                        <>
                          <hr />
                          <div key={flight.id_flight} className="flight">
                            Départ le <b>{flightDepartureTime}</b> de la station{" "}
                            <b>
                              {flight.departure_station?.station_name ||
                                "Unknown"}
                            </b>{" "}
                            <br />
                            Arrivée le <b>{flightArrivalTime}</b> sur{" "}
                            <b>
                              {flight.arrival_station?.station_name ||
                                "Unknown"}
                            </b>{" "}
                            <br />
                          </div>
                        </>
                      );
                    })}

                    <Link
                      className="login-button reserve"
                      href={`/Reservation/${travel.id_travel}`}
                      key={travel.id_travel}
                    >
                      Réserver
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Flight;
