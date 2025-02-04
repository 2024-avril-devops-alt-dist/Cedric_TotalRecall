// Admin/page.tsx
"use client";
import { Admin, Resource, ListGuesser } from 'react-admin';
import dataProvider from '../../../prisma/dataProvider';
import { CompanyCreate, CompanyEdit } from './components/Companies';

const AdminPanel = () => {
  return (
    <Admin dataProvider={dataProvider}>
      <Resource name="users" list={ListGuesser} />
      <Resource name="stations" list={ListGuesser} />
      <Resource name="companies" list={ListGuesser} create={CompanyCreate} edit={CompanyEdit} />
      <Resource name="travels" list={ListGuesser} />
      <Resource name="flights" list={ListGuesser} />
      <Resource name="reservations" list={ListGuesser} />
    </Admin>
  );
};

export default AdminPanel;
