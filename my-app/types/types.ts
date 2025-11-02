export type LoginResponse = {
  message: string;
  location: {
    id: string;
    name: string;
  };
  token: string;
  error: string | null;
};

export type Entrance = {
  id: number;
  locationId: number;
  name: string;
  location?: any;
};
