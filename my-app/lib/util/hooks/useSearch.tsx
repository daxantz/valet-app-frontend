import { Car } from "@/types/types";
import { useState } from "react";

export default function useSearch(cars: Car[]) {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState("");
  function handleSearch(query: string) {
    setQuery(query);
  }
  function setBrand(brand: string) {
    setSelectedBrand(brand);
  }
  // filtered cars derived from query and selectedBrand states
  const filteredCars = (() => {
    // If searching by make
    if (selectedBrand) {
      return cars.filter(
        (car: Car) => car.make.toLowerCase() === selectedBrand.toLowerCase()
      );
    }

    // If searching by query (phone/ticket)
    if (query) {
      return cars.filter(
        (car: Car) =>
          car.phoneNumber.slice(-4).includes(query.slice(-4)) ||
          car.ticket.toLowerCase().includes(query.toLowerCase())
      );
    }

    // No filters active - return all cars
    return cars;
  })();
  function resetSearch() {
    setIsSearching(!isSearching);
    setQuery("");
    setSelectedBrand("");
  }

  return {
    handleSearch,
    query,
    setQuery,
    isSearching,
    setIsSearching,
    resetSearch,
    filteredCars,
    setBrand,
    selectedBrand,
  };
}
