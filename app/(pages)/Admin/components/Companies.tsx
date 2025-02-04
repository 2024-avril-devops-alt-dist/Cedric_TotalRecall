// src/components/companies/Companies.tsx
import React from 'react';
import { List, Datagrid, TextField, Edit, Create, SimpleForm, TextInput } from 'react-admin';

// Liste des compagnies
export const CompanyList = (props) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id_company" label="ID" />
      <TextField source="company_name" label="Nom de la compagnie" />
      {/* Ajoutez d'autres champs si nécessaire */}
    </Datagrid>
  </List>
);

// Créer une nouvelle compagnie
export const CompanyCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="company_name" label="Nom de la compagnie" />
    </SimpleForm>
  </Create>
);

// Editer une compagnie
export const CompanyEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="company_name" label="Nom de la compagnie" />
    </SimpleForm>
  </Edit>
);
