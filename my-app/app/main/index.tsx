import { useLocation } from "@/context/LocationContext";
import { Car } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { Text, View } from "react-native";
import CarBox from "@/components/CarBox";
import Sidebar from "@/components/Sidebar";
import EditModal from "@/components/editModal";

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
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const { data } = useQuery({
    queryKey: ["cars"],
    queryFn: () => fetchCars(locationId!, entranceId!),
  });
  console.log(modalVisible);
  const sideBarPropsValid = selectedCar && locationId && entranceId;
  if (data?.cars.length === 0) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-4xl">No cars parked</Text>
      </View>
    );
  }
  return (
    <View className="flex-row">
      <View className="mt-6  p-6 flex-row gap-4 w-[75%]">
        {data?.cars.map((car: Car) => (
          <CarBox key={car.id} car={car} setSelectedCar={setSelectedCar} />
        ))}
        <EditModal
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
        />
      </View>
      {sideBarPropsValid && (
        <Sidebar
          car={selectedCar}
          locationId={locationId}
          entranceId={entranceId}
          setModalVisible={setModalVisible}
          setSelectedCar={setSelectedCar}
        />
      )}
    </View>
  );
}
