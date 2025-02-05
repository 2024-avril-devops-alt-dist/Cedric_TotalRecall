// src/components/Flights.tsx
import React from 'react';
import { Flights } from '../../../../lib/Types'
import { List, Datagrid, TextField, Edit, Create, SimpleForm, TextInput, ReferenceField, ReferenceInput, SelectInput, DateTimeInput, DateField  } from 'react-admin';

interface FlightListProps {
  data: Flights[];
}

export const FlightList = (props : FlightListProps) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <ReferenceField source="travel_id" reference="travels" label="Nom du voyage">
        <TextField source="travel_name" />
      </ReferenceField>
      <ReferenceField source="departure_station_id" reference="stations" label="Station de départ">
        <TextField source="station_name" />
      </ReferenceField>
      <ReferenceField source="arrival_station_id" reference="stations" label="Station d'arrivée">
        <TextField source="station_name" />
      </ReferenceField>
      <DateField source="departure_day_time" label="Heure de départ" />
      <DateField source="arrival_day_time" label="Heure d'arrivée" />
      <TextField source="seats" label="Nombre de sièges" />

    </Datagrid>
  </List>
);

export const FlightCreate = (props : FlightListProps) => (
  <Create {...props}>
    <SimpleForm>
      <ReferenceInput source="departure_station_id" reference="stations" label="Station de départ">
        <SelectInput optionText="station_name" />
      </ReferenceInput>
      <ReferenceInput source="arrival_station_id" reference="stations" label="Station d'arrivée">
        <SelectInput optionText="station_name" />
      </ReferenceInput>
      <ReferenceInput source="travel_id" reference="travels" label="Voyage">
        <SelectInput optionText="id_travel" />
      </ReferenceInput>
      <DateTimeInput source="departure_day_time" label="Heure de départ" />
      <DateTimeInput source="arrival_day_time" label="Heure d'arrivée" />
      <TextInput source="seats" label="Nombre de sièges"  type="number" />
    </SimpleForm>
  </Create>
);

export const FlightEdit = (props : FlightListProps) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="id_flight" label="ID" disabled />
      <ReferenceInput source="departure_station_id" reference="stations" label="Station de départ">
        <SelectInput optionText="station_name" />
      </ReferenceInput>
      <ReferenceInput source="arrival_station_id" reference="stations" label="Station d'arrivée">
        <SelectInput optionText="station_name" />
      </ReferenceInput>
      <ReferenceInput source="travel_id" reference="travels" label="Voyage">
        <SelectInput optionText="id_travel" />
      </ReferenceInput>
      <DateTimeInput source="departure_day_time" label="Heure de départ" />
      <DateTimeInput source="arrival_day_time" label="Heure d'arrivée" />
      <TextInput source="seats" label="Nombre de sièges" type="number" />
    </SimpleForm>
  </Edit>
);

