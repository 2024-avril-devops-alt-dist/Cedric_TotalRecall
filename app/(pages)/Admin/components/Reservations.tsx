// src/components/Reservations.tsx
import React from 'react';
import { Reservations } from '../../../../lib/Types'
import { useGetList } from 'react-admin';
import { List, Datagrid, TextField, Edit, Create, SimpleForm, TextInput, ReferenceInput, ReferenceArrayInput, 
  SelectInput, SelectArrayInput, useRecordContext, ReferenceField, CheckboxGroupInput } from 'react-admin';

/*----------------------------- CONSTANTS --------------------------------*/
const id_collection = "id_reservation"

/*----------------------------- TYPES --------------------------------*/
interface ReservationListProps {
  data: Reservations[];
}


// Composant personnalisé pour afficher le prénom et le nom
const FullNameField = () => {
  const record = useRecordContext();
  return (
    <span>
      {record.first_name} {record.last_name}
    </span>
  );
};

/*----------------------------- CRUDS --------------------------------*/
export const ReservationList = (props : ReservationListProps) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id_reservation" label="id_reservation" />
       <ReferenceField source="id_travel" reference="travels" label="Nom du voyage">
         <TextField source="travel_name" />
       </ReferenceField>          
       <ReferenceField source="id_user" reference="users" label="Réservé par">
         <TextField source="email" />
       </ReferenceField>     
       <ReferenceField source="id_passenger" reference="passengers" label="Passager">
        <FullNameField />
       </ReferenceField>     

    </Datagrid>
  </List>
);

export const ReservationCreate = (props: ReservationListProps) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="travel_name" label="Nom du voyage" />
      <TextInput source="status_travel" label="Statut du voyage" />
      <ReferenceInput source="company_id" reference="companies">
        <SelectInput optionText="company_name" label="Compagnie" />
      </ReferenceInput>
      <ReferenceArrayInput source="id_flight" reference="flights">
        <SelectArrayInput
          optionText={(record) => {
            const departureName = record.departure_station ? record.departure_station.station_name : 'Inconnu';
            const arrivalName = record.arrival_station ? record.arrival_station.station_name : 'Inconnu';
            return `${departureName} - ${arrivalName}`;
          }}
          label="Choisir 1 ou plusieurs vol pour de ce voyage"
        />
      </ReferenceArrayInput>
    </SimpleForm>
  </Create>
);

export const ReservationEdit = (props: any) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="travel_name" label="Nom du voyage" />
    </SimpleForm>
  </Edit>
);


