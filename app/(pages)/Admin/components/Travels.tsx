// src/components/Travels.tsx
import React from 'react';
import { Travels } from '../../../../lib/Types'
import { List, Datagrid, TextField, Edit, Create, SimpleForm, TextInput, ReferenceInput, SelectInput } from 'react-admin';

interface TravelListProps {
  data: Travels[];
}

const label = "Nom du Travels";
const id_collection = "id_travel"
const name_collection = "flight_name" // A CHECKER

export const TravelList = (props : TravelListProps) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="travel_name" label="Nom du voyage" />
      <TextField source={id_collection} label="ID" />
      <TextField source="status_travel" label="Status" />
    </Datagrid>
  </List>
);

export const TravelCreate = (props: TravelListProps) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="travel_name" label="Nom du voyage" />
      <TextInput source="status_travel" label="Statut du voyage" />

      <ReferenceInput source="company_id" reference="companies">
        <SelectInput optionText="company_name"  label="Compagnie"/>
      </ReferenceInput>
      
      <ReferenceInput source="id_user" reference="users">
        <SelectInput optionText="id_user" label="Utilisateur" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);

export const TravelEdit = (props : TravelListProps) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source={id_collection} label={label} />
    </SimpleForm>
  </Edit>
);
