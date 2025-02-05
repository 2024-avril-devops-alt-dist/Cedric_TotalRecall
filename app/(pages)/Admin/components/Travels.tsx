// src/components/Travels.tsx
import React from 'react';
import { Travels } from '../../../../lib/Types'
import { useGetList } from 'react-admin';
import { List, Datagrid, TextField, Edit, Create, SimpleForm, TextInput, ReferenceInput, ReferenceArrayInput, 
  SelectInput, SelectArrayInput, FunctionField, AutocompleteArrayInput, CheckboxGroupInput } from 'react-admin';

/*----------------------------- CONSTANTS --------------------------------*/
const label = "Nom du Travels";
const id_collection = "id_travel"
const name_collection = "flight_name" // A CHECKER

/*----------------------------- TYPES --------------------------------*/
interface TravelListProps {
  data: Travels[];
}

/*----------------------------- CASE obligatoire --------------------------------*/
  const obligatoire = (value) => {
    if (!value) {
      return 'Le champs est obligatoire';
    }
    return undefined;
  };

/*--------- REQUEST (pour afficher le nom des stations de départ et d'arrivée des vols) -----------------------*/
const FlightOption = ({ record }) => {
  const { data: departureStation, loading: departureLoading } = useGetList('stations', {
    filter: { id: record.departure_station_id },
    pagination: { page: 1, perPage: 1 },
  });

  const { data: arrivalStation, loading: arrivalLoading } = useGetList('stations', {
    filter: { id: record.arrival_station_id },
    pagination: { page: 1, perPage: 1 },
  });

  if (departureLoading || arrivalLoading) {
    return 'Chargement...';
  }

  const departureName = departureStation && departureStation.length > 0 ? departureStation[0].station_name : 'Inconnu';
  const arrivalName = arrivalStation && arrivalStation.length > 0 ? arrivalStation[0].station_name : 'Inconnu';

  return `${departureName} - ${arrivalName}`;
};


/*----------------------------- CRUDS --------------------------------*/
export const TravelList = (props : TravelListProps) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="travel_name" label="Nom du voyage" />
      <TextField source={id_collection} label="ID" />
      <TextField source="status_travel" label="Status" />
      <FunctionField
        label="Nombre de vols"
        render={(record: any) => record.flights ? record.flights.length : 0}
      />
    </Datagrid>
  </List>
);

export const TravelCreate = (props: TravelListProps) => (
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

export const TravelEdit = (props: any) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="travel_name" label="Nom du voyage" />
      <TextInput source="status_travel" label="Statut du voyage" />
      <ReferenceInput source="company_id" reference="companies">
        <SelectInput optionText="company_name" label="Compagnie" />
      </ReferenceInput>

      <FunctionField
        label="Vols sélectionnés"
        render={record =>
          record.flights?.map(flight =>
            `${flight.departure_station.station_name} - ${flight.arrival_station.station_name}`
          ).join(', ')
        }
      />

      <ReferenceArrayInput source="flights" reference="flights">
        <SelectArrayInput
          optionText={(record) => {
            const departureName = record.departure_station ? record.departure_station.station_name : 'Inconnu';
            const arrivalName = record.arrival_station ? record.arrival_station.station_name : 'Inconnu';
            return `${departureName} - ${arrivalName}`;
          }}
          label="Choisir 1 ou plusieurs vols pour ce voyage"
        />
      </ReferenceArrayInput>
    </SimpleForm>
  </Edit>
);


