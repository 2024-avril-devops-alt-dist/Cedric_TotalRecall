// src/prisma/dataProvider.ts
import { GetListResult, GetOneParams, GetManyParams, CreateParams, UpdateParams, DeleteParams, DeleteManyParams } from 'ra-core';
import axios from 'axios';

const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/${process.env.NEXT_PUBLIC_VERSION}`;

//---------------------------- Constants for my collections -------------------------------//
type ResourceType = keyof typeof idFields;
const idFields = {
    users: 'id_user',
    companies: 'id_company',
    stations: 'id_station',
    travels: 'id_travel',
    flights: 'id_flight',
    reservations: 'id_reservation',
    passengers: 'id_passenger'
  };
  interface ResourceItem {
    [key: string]: any;
  }
  interface Resource {
    name: string;
  }
//---------------------------- GETLIST  -------------------------------//
const dataProvider = {
  getList: async (resource: string, params : GetListResult) => {
    const url = `${apiUrl}/${resource}`;
    const { data } = await axios.get(url);

    const transformedData = data[resource].map((item: ResourceItem) => ({
      ...item,
      id: item.id_company || item.id_station || item.id_travel || item.id_flight || item.id_reservation,
    }));

    return {
      data: transformedData,
      total: transformedData.length,
    };
  },

//----------------------------  GETONE -------------------------------//
  getOne: async (resource: string, params : GetOneParams) => {
    const url = `${apiUrl}/${resource}/${params.id}`;
    const { data } = await axios.get(url);

    const transformedData = {
      ...data[resource],
      id: data[resource].id_company || data[resource].id_station || data[resource].id_travel || data[resource].id_flight || data[resource].id_reservation,
    };

    return {
      data: transformedData,
    };
  },

//----------------------------  GETMANY -------------------------------//
  getMany: async (resource: string, params: GetManyParams) => {
    const url = `${apiUrl}/${resource}`;
    const { ids } = params;

    const { data: responseData } = await axios.get(url, {
      params: { ids: ids.join(',') },
    });

    const transformedData = responseData[resource as ResourceType].map((item: ResourceItem) => ({
      ...item,
      id: item[idFields[resource as ResourceType]],
    }));

    return {
      data: transformedData,
    };
  },

//----------------------------  CREATE -------------------------------//
  create: async (resource: string, params : CreateParams) => {
    const url = `${apiUrl}/${resource}`;
    const data = { ...params.data };

    // Transformer les dates en format ISO-8601
    if (data.departure_day_time) {
      data.departure_day_time = new Date(data.departure_day_time).toISOString();
    }
    if (data.arrival_day_time) {
      data.arrival_day_time = new Date(data.arrival_day_time).toISOString();
    }

    // Transformer le champ `seats` en entier
    if (data.seats) {
      data.seats = parseInt(data.seats, 10);
    }

    console.log('CREATE request for resource:', resource);
    console.log('Data to create:', data);

    const { data: responseData } = await axios.post(url, data);

    console.log('Response data:', responseData);

    const transformedData = {
      ...responseData[resource],
      id: responseData[resource][idFields[resource as ResourceType]],
    };

    return {
      data: transformedData,
    };
  },

//---------------------------- UPDATE  -------------------------------//
  update: async (resource: string, params : UpdateParams) => {
    const url = `${apiUrl}/${resource}`;
    const { id, ...data } = params.data; // Extraire l'ID pour la mise à jour
  
    // Transformer les dates en format ISO-8601
    if (data.departure_day_time) {
      data.departure_day_time = new Date(data.departure_day_time).toISOString();
    }
    if (data.arrival_day_time) {
      data.arrival_day_time = new Date(data.arrival_day_time).toISOString();
    }
  
    // Transformer le champ `seats` en entier
    if (data.seats) {
      data.seats = parseInt(data.seats, 10);
    }
  
    // Ajouter l'ID dans les données à envoyer uniquement pour les ressources qui en ont besoin
    if (resource === 'flights') {
      data.id_flight = id;
    }
  
    console.log('UPDATE request for resource:', resource);
    console.log('Data to update:', data);
  
    const { data: responseData } = await axios.put(url, data);
  
    console.log('Response data:', responseData);
  
    const transformedData = {
      ...responseData[resource],
      id: responseData[resource][idFields[resource as ResourceType]],
    };
  
    return {
      data: transformedData,
    };
  },
  
  
//---------------------------- DELETE  -------------------------------//
  delete: async (resource: string, params : DeleteParams) => {
    const url = `${apiUrl}/${resource}`;
    const id_collection = idFields[resource as ResourceType];

    if (!id_collection) {
      throw new Error(`Unknown resource: ${resource}`);
    }

    const id = params.id;
    const { data: responseData } = await axios.delete(url, { data: { [id_collection]: id } });
    console.log('Response data:', responseData);

    return {
      data: responseData[resource],
    };
  },

//----------------------------  DELETEMANY -------------------------------//
  deleteMany: async (resource: string, params : DeleteManyParams) => {
    const url = `${apiUrl}/${resource}`;
    const id_collection = idFields[resource as ResourceType];
  
    if (!id_collection) {
      throw new Error(`Unknown resource: ${resource}`);
    }
  
    const { ids } = params;
    console.log('DELETE MANY request for resource:', resource);
    console.log('IDs to delete:', ids);
  
    const { data: responseData } = await axios.delete(url, { data: { ids, id_collection } });
    console.log('Response data:', responseData);
  
    return {
      data: responseData[resource],
    };
  },

  
};

export default dataProvider;
