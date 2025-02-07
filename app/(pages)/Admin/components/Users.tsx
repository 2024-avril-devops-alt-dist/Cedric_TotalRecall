// src/components/Users.tsx
import React from 'react';
import { List, Datagrid, TextField, Edit, Create, SimpleForm, TextInput, EditButton, EmailField } from 'react-admin';

const label = "Nom de l'utilisateur";
const id_collection = "id_user"
const name_collection = "user"

const postFilters = [
    <TextInput source={name_collection} label="Recherche" alwaysOn />,
];

export const UserList = (props) => (
  <List filters={postFilters} {...props}>
    <Datagrid rowClick="edit">
            <TextField source={id_collection} label="ID"  />
            <TextField source="name" />
            <TextField source="username" />
            <EmailField source="email" />
            <TextField source="phone" />
       <EditButton />
    </Datagrid>
  </List>
);

export const UserCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source={name_collection} label={label} />
    </SimpleForm>
  </Create>
);

export const UserEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source={name_collection} label={label} />
    </SimpleForm>
  </Edit>
);
