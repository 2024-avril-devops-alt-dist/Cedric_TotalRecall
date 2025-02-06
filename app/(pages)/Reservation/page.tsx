// pages/Flight.js
import React, { useState }  from "react";
import Menu from "../../components/Menu";
import "../../css/style.css";
import { Button, Space, DatePicker, version } from 'antd';

const Reservation = () => {
  const [passengers, setPassengers] = useState([{}]); // Tableau de passagers

  // Ajouter un passager
  const addPassenger = () => {
    setPassengers([...passengers, {}]);
  };

  // Supprimer un passager
  const removePassenger = (index) => {
    const updatedPassengers = passengers.filter((_, i) => i !== index);
    setPassengers(updatedPassengers);
  };

  // Soumettre le formulaire
  const onFinish = (values) => {
    console.log("Formulaire soumis:", values);
  };

  return (
    <div className="container">
      <Menu background="mars3.jpg" />
    <Space>
      <DatePicker />
      <Button type="primary">Primary Button</Button>
    </Space>
    </div>
  );
};

export default Reservation;
