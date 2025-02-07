// pages/Flight.js
import React, { useState }  from "react";
import Menu from "../../components/Menu";
import "../../css/style.css";
import { Button, Space, DatePicker, version } from 'antd';
import Passenger from "../components/Passenger"; 

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
      <Form
        onFinish={onFinish}
        layout="vertical"
        initialValues={{ passengers }}
      >
        {passengers.map((_, index) => (
          <Passenger
            key={index}
            index={index}
            onRemove={() => removePassenger(index)}
          />
        ))}
        <Button type="primary" htmlType="submit" style={{ marginTop: "16px" }}>
          Réserver
        </Button>
        <Button
          type="dashed"
          onClick={addPassenger}
          style={{ marginTop: "8px", width: "100%" }}
        >
          Ajouter un passager
        </Button>
      </Form>
    </div>
  );
};

export default Reservation;
