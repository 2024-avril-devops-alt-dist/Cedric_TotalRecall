"use client";
import { Admin, Resource, ListGuesser } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';

const AdminPanel = () => {
  return (
    <Admin dataProvider={simpleRestProvider('/api/v1')}>
      <Resource name="users" list={ListGuesser} />
      <Resource name="companies" list={ListGuesser} />
    </Admin>
  );
};

export default AdminPanel;
