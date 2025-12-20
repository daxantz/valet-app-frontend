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

export type Car = {
  id: number;
  ticket: string;
  phoneNumber: string;
  createdAt: string;
  make: string;
  color: string;
  images: { carId: number; url: string[]; createdAt: string }[];
};
