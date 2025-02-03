
/*------------------- FROM SCHEMA PRISMA -----------*/
export interface Travels {
    company_name: string;
    id_travel: number;
    id_flights: number;
    flights: Flights[];
    flight: string;
    station_name: string;
  }
  
  export interface Flights {
    id_flight: number;
    flight: string;
    departure_station: Station;
    arrival_station: Station;
    station_name: string;
    departure_day_time: Date;
    arrival_day_time: Date;
  }
  export interface Station {
    id_station: string;
    station_name: string;
  }
  