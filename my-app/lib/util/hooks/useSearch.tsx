import { Car } from "@/types/types";
import { useState } from "react";

export default function useSearch(cars: Car[]) {
  const [searchedCars, setSearchedCars] = useState<Car[]>([...cars]);
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  function handleSearch(query: string) {
    setQuery(query);
    // filters based on last 4 digits of phone number or ticket
    const filteredCars = cars.filter(
      (car: Car) =>
        car.phoneNumber.toLowerCase().includes(query.slice(-4).toLowerCase()) ||
        car.ticket.toLowerCase().includes(query.toLowerCase())
    );
    setSearchedCars(filteredCars);
  }
  function resetSearch() {
    setIsSearching(!isSearching);
    setQuery("");
    setSearchedCars([...cars]);
  }

  function searchByMake(make: string) {
    const filteredCars = cars.filter(
      (car: Car) => car.make.toLowerCase() === make.toLowerCase()
    );
    setSearchedCars(filteredCars);
  }

  return {
    searchedCars,
    handleSearch,
    query,
    setQuery,
    setSearchedCars,
    isSearching,
    setIsSearching,
    resetSearch,
    searchByMake,
  };
}
