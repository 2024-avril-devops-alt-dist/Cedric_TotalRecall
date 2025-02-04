// src/prisma/dataProvider.ts
import axios from 'axios';

const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/${process.env.NEXT_PUBLIC_VERSION}`;

const dataProvider = {
  getList: async (resource, params) => {
    const url = `${apiUrl}/${resource}`;
    const { data } = await axios.get(url);

    const transformedData = data[resource].map((item) => ({
      ...item,
      id: item.id_company || item.id_station || item.id_travel || item.id_flight || item.id_reservation,
    }));

    return {
      data: transformedData,
      total: transformedData.length,
    };
  },

  getOne: async (resource, params) => {
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

  create: async (resource, params) => {
    const url = `${apiUrl}/${resource}`;
    const { data } = await axios.post(url, params.data);

    const transformedData = {
      ...data[resource],
      id: data[resource].id_company || data[resource].id_station || data[resource].id_travel || data[resource].id_flight || data[resource].id_reservation,
    };

    return {
      data: transformedData,
    };
  },

  update: async (resource, params) => {
    const url = `${apiUrl}/${resource}`;
    const { id, ...data } = params.data; // obligé de supprimer l'id pour pouvoir mettre à jour
    const { data: responseData } = await axios.put(url, data);

    const transformedData = {
      ...responseData[resource],
      id: responseData[resource].id_company || responseData[resource].id_station || responseData[resource].id_travel || responseData[resource].id_flight || responseData[resource].id_reservation,
    };

    return {
      data: transformedData,
    };
  },


  delete: async (resource, params) => {
    const url = `${apiUrl}/${resource}`;
    const id_collection = resource === 'companies' ? 'id_company' : 'id'; 
    const { data } = await axios.delete(url, { data: { [id_collection]: params.id } });

    return {
      data: data[resource],
    };
  },
};

export default dataProvider;
