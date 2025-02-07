// pages/Reservation/[id]/page.js
"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import Menu from "@/app/components/Menu";
import dayjs from "dayjs";
import { useParams } from "next/navigation";
import useFetchData from "@/lib/useFetchData";
import { Form, Button } from "antd";
import PassengerForm from "../../components/Passenger";
import Paiement from "../../components/Paiement";
import { Card, Alert } from "antd";
import Link from "next/link";
import "@/app/css/style.css";

const ReservationDetail = () => {
  const [passengers, setPassengers] = useState([{}]);
  const [passengerData, setPassengerData] = useState([]);
  const [showPayment, setShowPayment] = useState(false);
  const [validateReservation, setValidateReservation] = useState(false);

  // 1-Récupération du travel en fonction de l'url
  const route = "travels";
  const { id } = useParams();
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/${process.env.NEXT_PUBLIC_VERSION}/${route}/${id}`;
  const queryKey = [route, id];
  const { isPending, error, data } = useFetchData(url, queryKey);
  const { data: session } = useSession();

  const travel = data.travels || [];
  const flights = travel.flights || [];
  const company = travel.company || {};

  // 2-Ajout d'un passager
  const addPassenger = async () => {
    setPassengers([...passengers, {}]);
  };

  // 2-Suppression d'un passager
  const removePassenger = (index) => {
    const updatedPassengers = passengers.filter((_, i) => i !== index);
    setPassengers(updatedPassengers);
  };

  // 3-Validation des passagers et affichage du paiement
  const onFinish = (values) => {
    setPassengerData(values.passengers);
    setShowPayment(true);
    console.log("Formulaire soumis:", values);
  };

  // 4- Récupération de l'id_user de l'utilisateur connecté (Le mieux aurait été de récupérer directement session.user.id_user mais je n'y arrive pas avec authJS )
  const getUserIdByEmail = async (email) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users?email/${email}`
      );
      console.log(
        "Réponse de l'API pour l'ID de l'utilisateur:",
        response.data
      ); // Affiche la réponse complète
      return response.data.users[0].id_user;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération de l'ID de l'utilisateur:",
        error
      );
      throw error;
    }
  };
  // 5- Après validation du paiement ajout des passagers en db
  const handlePaymentFinish = async (values) => {
    const userId = await getUserIdByEmail(session.user.email);
    const passengers = values.passengers;
    const travelId = values.travel.id_travel;
    const companyId = values.travel.company.id_company;
    try {
      for (const passenger of passengers) {
        // Créer le passager dans la table Passenger
        const passengerResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/${process.env.NEXT_PUBLIC_VERSION}/passengers`,
          {
            first_name: passenger.first_name,
            last_name: passenger.last_name,
            DOB: passenger.DOB.toISOString(), // obliger de formatter la date car dans antd la date est un objet
            mail: passenger.mail,
            userId: userId, // récupération de l'id_user connecté pour associer les passagers à l'user enregistré
          }
        );

        // Créer les entrées dans la table réservation
        const passengerId = passengerResponse.data.passengers.id_passenger; // récupère l'id_passager que l'on vient de créer
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/${process.env.NEXT_PUBLIC_VERSION}/reservations`,
          {
            id_travel: travelId,
            id_company: companyId,
            id_user: userId,
            id_passenger: passengerId,
            status_reservation: "Confirmed",
          }
        );
      }
      setValidateReservation(true);
    } catch (error) {
      console.error("Erreur lors de l'envoi des passagers:", error);
    }
    console.log("Paiement validé:", values);
  };

  if (isPending) return "Chargement...";
  if (error) return "Une erreur est survenue: " + error.message;
  if (!data || !data.travels) return "Aucun voyage trouvé.";

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
                Départ le{" "}
                <b>
                  {dayjs(flight.departure_day_time).format("DD/MM/YYYY HH:mm")}
                </b>{" "}
                de la station{" "}
                <b>{flight.departure_station?.station_name || "Unknown"}</b>
                <br />
                Arrivée le{" "}
                <b>
                  {dayjs(flight.arrival_day_time).format("DD/MM/YYYY HH:mm")}
                </b>{" "}
                sur la station{" "}
                <b>{flight.arrival_station?.station_name || "Unknown"}</b>
                <br />
                Plus que <b>{flight.seats}</b> places
              </div>
            </div>
          ))}
          {!validateReservation ? (
            <>
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
                {!showPayment && (
                  <Form.Item>
                    <Button
                      className="login-button"
                      type="primary"
                      htmlType="submit"
                    >
                      Accéder au paiement
                    </Button>
                  </Form.Item>
                )}
              </Form>

              {showPayment && (
                <Paiement
                  onFinish={handlePaymentFinish}
                  travel={travel}
                  passengers={passengerData}
                />
              )}
            </>
          ) : (
            <>
              <Card>
                <Alert
                  message="Réservation validée"
                  description="Vous recevrez les cartes d'embarquement par mail"
                  type="success"
                />
                <br />
              <Link
                      className="login-button reserve"
                      href={`/Flight`}
                    >
                      Réserver un autre vol</Link>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReservationDetail;
