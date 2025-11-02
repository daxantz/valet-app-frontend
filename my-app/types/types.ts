export type LoginResponse = {
  message: string;
  location: {
    id: string;
    name: string;
  };
  token: string;
};
