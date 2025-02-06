// components/Paiement.tsx
import React from "react";
import { Card, Form, Input, Button, Col, Row } from "antd";

const Paiement = ({ onFinish, travel, passengers }) => {
    return (
      <Card title="Payer votre voyage" style={{ marginTop: "24px" }}>
        <Form
          layout="vertical"
          onFinish={() => onFinish({ travel, passengers })}
        >
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label="Numéro de carte" name="cardNumber">
              <Input placeholder="1234 5678 9012 3456" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Date d'expiration" name="expirationDate">
              <Input placeholder="MM/AA" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="CVV" name="cvv">
              <Input placeholder="123" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-button">
                Valider ma réservation et payer
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default Paiement;
