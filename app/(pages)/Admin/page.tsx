// Admin/page.tsx
"use client";
import { Admin, Resource, ListGuesser } from 'react-admin';
import dataProvider from '../../../prisma/dataProvider';
import { CompanyList, CompanyCreate, CompanyEdit } from './components/Companies';
import { StationList, StationCreate, StationEdit } from './components/Stations';
import { TravelList, TravelCreate, TravelEdit } from './components/Travels';
import { FlightList, FlightCreate, FlightEdit } from './components/Flights';

const AdminPanel = () => {
  return (
    <Admin dataProvider={dataProvider as any}>
      <Resource name="users" list={ListGuesser} />
      <Resource name="stations" list={StationList} create={StationCreate} edit={StationEdit}  />
      <Resource name="companies" list={CompanyList} create={CompanyCreate} edit={CompanyEdit} />
      <Resource name="travels" list={TravelList} create={TravelCreate} edit={TravelEdit} />
      <Resource name="flights" list={FlightList} create={FlightCreate} edit={FlightEdit} />
      <Resource name="reservations" list={ListGuesser} />
    </Admin>
  );
};

export default AdminPanel;
