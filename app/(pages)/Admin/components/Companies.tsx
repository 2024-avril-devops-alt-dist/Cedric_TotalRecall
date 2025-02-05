// src/components/Companies.tsx
import React from 'react';
import { List, Datagrid, TextField, Edit, Create, SimpleForm, TextInput, EditButton, ReferenceInput } from 'react-admin';

const label = "Nom de la compagnie";
const id_collection = "id_company"
const name_collection = "company_name"

const postFilters = [
    <TextInput source={name_collection} label="Recherche" alwaysOn />,
];

export const CompanyList = (props) => (
  <List filters={postFilters} {...props}>
    <Datagrid rowClick="edit">
      <TextField source={id_collection} label="ID" />
      <TextField source={name_collection} label={label} />
       <EditButton />
    </Datagrid>
  </List>
);

export const CompanyCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source={name_collection} label={label} />
    </SimpleForm>
  </Create>
);

export const CompanyEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source={name_collection} label={label} />
    </SimpleForm>
  </Edit>
);
