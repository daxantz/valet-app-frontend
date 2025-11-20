import { Car } from "@/types/types";
import { Image, Text, TouchableOpacity } from "react-native";
import getShortElapsed from "@/lib/util/timeFormat";
import { useEffect, useState } from "react";
type CardBoxProps = {
  car: Car;
  setSelectedCar?: (car: Car) => void;
};
export default function CarBox({ car, setSelectedCar }: CardBoxProps) {
  const [elapsed, setElapsed] = useState(getShortElapsed(car.createdAt));

  console.log(car.createdAt.split("T")[0]);
  console.log(elapsed);
  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed(getShortElapsed(car.createdAt));
    }, 60000);

    return () => clearInterval(interval);
  }, [car.createdAt]);

  return (
    <TouchableOpacity
      key={car.ticket}
      className="border border-gray-400 rounded-2xl w-52 items-center h-52 bg-white p-6"
      onPress={() => setSelectedCar && setSelectedCar(car)}
    >
      <Image
        source={require("@/assets/images/car.png")}
        className="w-20 h-20 "
      />
      <Text className="text-4xl">#{car.ticket}</Text>
      <Text className="text-4xl">{elapsed}</Text>
    </TouchableOpacity>
  );
}
