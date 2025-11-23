import { useLocation } from "@/context/LocationContext";
import { Car } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { Text, View } from "react-native";
import CarBox from "@/components/CarBox";
import Sidebar from "@/components/Sidebar";
import EditModal from "@/components/editModal";

import SidebarButton from "@/components/SidebarButton";
import { SafeAreaView } from "react-native-safe-area-context";
import Search from "@/components/Search";
import useSearch from "@/lib/util/hooks/useSearch";

async function fetchCars(locationId: string, entranceId: string) {
  try {
    const res = await fetch(
      `http://localhost:3000/v1/location/${locationId}/entrance/${entranceId}/car/`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch car data");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching cars", error);
    throw error;
  }
}

export default function Main() {
  const { selectedEntrance: entranceId, locationId } = useLocation();

  const [modalVisible, setModalVisible] = useState(false);
  const { data } = useQuery({
    queryKey: ["cars"],
    queryFn: () => fetchCars(locationId!, entranceId!),
  });
  const {
    searchedCars,
    handleSearch,
    query,
    isSearching,
    resetSearch,

    searchByMake,
  } = useSearch(data?.cars || []);
  const [selectedCar, setSelectedCar] = useState<Car | null>(data?.cars[0]);
  const sideBarPropsValid = selectedCar && locationId && entranceId;

  if (data?.cars.length === 0) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center">
        <Text className="text-4xl">No cars parked</Text>
      </SafeAreaView>
    );
  }
  console.log(searchedCars);
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="bg-white ">
        <View className=" w-1/4  flex-row self-end ">
          <SidebarButton text="Search" icon="search" onPress={resetSearch} />

          <SidebarButton
            text="Arrival"
            icon="arrival"
            onPress={() => console.log("pressed arrival")}
          />
        </View>
      </View>

      <View className="flex-row ">
        <View className="flex-1 flex-row gap-6 flex-wrap">
          {(isSearching && searchedCars ? searchedCars : data?.cars)?.map(
            (car: Car) => (
              <CarBox key={car.id} car={car} setSelectedCar={setSelectedCar} />
            )
          )}
        </View>

        <EditModal
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
        />

        {isSearching && (
          <Search
            query={query}
            setQuery={handleSearch}
            searchByMake={searchByMake}
          />
        )}
        {sideBarPropsValid && !isSearching ? (
          <Sidebar
            car={selectedCar}
            entranceId={entranceId}
            locationId={locationId}
            setModalVisible={setModalVisible}
            setSelectedCar={setSelectedCar}
          />
        ) : (
          !selectedCar &&
          !isSearching && <Text className="text-4xl m-4">No car selected</Text>
        )}
      </View>
    </SafeAreaView>
  );
}
