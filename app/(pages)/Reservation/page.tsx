// pages/Flight.js
"use client";
import React from 'react';
import Menu from "@/app/components/Menu";
import useFetchData from "@/lib/useFetchData";
import "@/app/css/style.css";
import { Station } from '@prisma/client';

const Reservation = () => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/${process.env.NEXT_PUBLIC_VERSION}/travels`;
  const { isPending, error, data, isFetching } = useFetchData(url);
  if (isPending) return "Chargement...";
  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="container">
      <Menu background="mars2.jpg"/>
      <div className="content">
      <div className="box">
        <h1>Destinations</h1>
        
        {data.travels.map((station: Station) => (
              <div key={station.id_station}>
                <h3>{station.station_name}</h3>
              </div>
            ))}
      </div>
      </div>
    </div>
  );
};

export default Reservation;
