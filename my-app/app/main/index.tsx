import { useLocation } from "@/context/LocationContext";
import { Car } from "@/types/types";
import { useQuery } from "@tanstack/react-query";

import dayjs from "dayjs";
import { View, Text } from "react-native";
import CarBox from "@/components/CarBox";

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
  const { data } = useQuery({
    queryKey: ["cars"],
    queryFn: () => fetchCars(locationId!, entranceId!),
  });
  console.log(dayjs);

  return (
    <View>
      <Text className="text-6xl">{entranceId}</Text>
      <View className="mt-6 flex-row gap-4 p-6">
        {data?.cars.map((car: Car) => (
          <CarBox key={car.id} car={car} />
        ))}
      </View>
    </View>
  );
}
