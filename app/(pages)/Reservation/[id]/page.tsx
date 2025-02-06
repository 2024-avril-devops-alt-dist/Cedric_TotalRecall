// pages/Reservation/[id]/page.js
"use client";
import React, { useEffect, useState } from "react";
import Menu from "@/app/components/Menu";
import dayjs from "dayjs";
import { useParams } from 'next/navigation';
import useFetchData from "@/lib/useFetchData";
import { Form, Input, Select, Button } from "antd";
import PassengerForm from "../../components/Passenger"; 
import "@/app/css/style.css";

const ReservationDetail = () => {
  const { id } = useParams();
  const route = "travels";
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/${process.env.NEXT_PUBLIC_VERSION}/${route}/${id}`;
  const queryKey = [route, id];
  const { isPending, error, data } = useFetchData(url, queryKey);

  const [passengers, setPassengers] = useState([{}]); 
  
  // Ajout d'un passager
  const addPassenger = () => {
    setPassengers([...passengers, {}]);
  };

  // Suppression d'un passager
  const removePassenger = (index) => {
    const updatedPassengers = passengers.filter((_, i) => i !== index);
    setPassengers(updatedPassengers);
  };


  // Fonction pour soumettre le formulaire
  const onFinish = (values) => {
    console.log("Formulaire soumis:", values);
  };

  if (isPending) return "Chargement...";
  if (error) return "Une erreur est survenue: " + error.message;
  if (!data || !data.travels) return "Aucun voyage trouvé.";

  const travel = data.travels;
  const flights = travel.flights || [];
  const company = travel.company || {};

  return (
    <div className="container">
      <Menu background="mars3.jpg" />
      <div className="content">
        <div className="box">
          <h1>Réservation pour</h1>
          <h2>{travel.travel_name}</h2>
          <p>Avec {company.company_name}</p>
          {flights.map((flight) => (
            <div key={flight.id_flight} className="flight">
              <hr />
              <div>
                Départ le <b>{dayjs(flight.departure_day_time).format("DD/MM/YYYY HH:mm")}</b> de la station{" "}
                <b>{flight.departure_station?.station_name || "Unknown"}</b>
                <br />
                Arrivée le <b>{dayjs(flight.arrival_day_time).format("DD/MM/YYYY HH:mm")}</b> sur la station{" "}
                <b>{flight.arrival_station?.station_name || "Unknown"}</b>
                <br />
                Plus que <b>{flight.seats}</b> places
              </div>
            </div>
          ))}

          {/* Formulaire de réservation */}
          <Form onFinish={onFinish}>
          {passengers.map((_, index) => (
              <PassengerForm
              key={index}
              index={index}
              onAdd={addPassenger}
              onRemove={removePassenger}
            />
            ))}
            
            <Form.Item>
              <Button className="login-button" type="primary" htmlType="submit">
                Valider ma réservation et accéder au paiement
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};


export default ReservationDetail;
