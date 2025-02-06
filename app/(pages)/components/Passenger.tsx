import React from "react";
import { Form, Input, Select, Card, DatePicker, Button  } from "antd";

const { Option } = Select;

const PassengerForm = ({  index, onAdd, onRemove }) => {
  return (
    <>
    <Card>
    <div className="passenger-form">
      <h3>Passager {index + 1}</h3>
      <Form.Item name={["passengers", index, "civility"]} label="Civilité">
        <Select placeholder="Civilité" allowClear>
          <Option value="M.">M.</Option>
          <Option value="Mme">Mme</Option>
          <Option value="None">Non renseigné</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name={["passengers", index, "firstName"]}
        label="Prénom"
        rules={[{ required: true, message: "Le prénom est obligatoire" }]}
      >
        <Input placeholder="Prénom" />
      </Form.Item>
      <Form.Item
        name={["passengers", index, "lastName"]}
        label="Nom"
        rules={[{ required: true, message: "Le nom est obligatoire" }]}
      >
        <Input placeholder="Nom" />
      </Form.Item>
      <Form.Item
        name={["passengers", index, "birthdate"]}
        label="Date de naissance"
        rules={[{ required: true, message: "La date de naissance est obligatoire" }]}
      >
        <DatePicker placeholder="Date de naissance" style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item
        name={["passengers", index, "email"]}
        label="Email"
        rules={[
          { required: true, message: "L'email est obligatoire" },
          { type: "email", message: "L'email n'est pas valide" },
        ]}
      >
        <Input placeholder="Email" />
      </Form.Item>
      
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px" }}>
        {index > 0 && (
          <Button type="link" onClick={() => onRemove(index)} style={{ marginRight: "8px" }}>
            Supprimer ce passager
          </Button>
        )}
        <Button type="dashed" onClick={onAdd} style={{ width: "100%" }}>
          Ajouter un passager
        </Button>
      </div>
    </div>
    </Card>
                <hr />
                </>
  );
};

export default PassengerForm;
