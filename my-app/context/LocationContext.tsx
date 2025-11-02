// LocationContext.tsx
import React, { createContext, useState, ReactNode, useContext } from "react";

interface LocationContextProps {
  locationId: string | null;
  setLocationId: (id: string) => void;
  token: string | null;
  setToken: (token: string) => void;
  selectedEntrance: string | null;
  setSelectedEntrance: (name: string) => void;
}

const LocationContext = createContext<LocationContextProps | undefined>(
  undefined
);

export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const [locationId, setLocationId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [selectedEntrance, setSelectedEntrance] = useState<string | null>(null);

  return (
    <LocationContext.Provider
      value={{
        locationId,
        setLocationId,
        token,
        setToken,
        selectedEntrance,
        setSelectedEntrance,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

// Custom hook for easy access
export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
};
