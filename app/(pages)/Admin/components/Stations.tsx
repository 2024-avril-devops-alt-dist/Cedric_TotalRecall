// src/components/Stations.tsx
import React from 'react';
import { List, Datagrid, TextField, Edit, Create, SimpleForm, TextInput } from 'react-admin';

const label = "Nom de la station";
const id_collection = "id_station"
const name_collection = "station_name"


export const StationList = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source={name_collection} label={label} />
    </Datagrid>
  </List>
);

export const StationCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source={name_collection} label={label} />
    </SimpleForm>
  </Create>
);

export const StationEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source={name_collection} label={label} />
    </SimpleForm>
  </Edit>
);

