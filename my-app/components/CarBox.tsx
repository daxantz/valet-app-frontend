import { useLocation } from "@/context/LocationContext";
import getShortElapsed from "@/lib/util/timeFormat";
import { Car } from "@/types/types";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity } from "react-native";
type CardBoxProps = {
  car: Car;
  setSelectedCar?: (car: Car) => void;
  resetSearch: () => void;
};
export default function CarBox({
  car,
  setSelectedCar,
  resetSearch,
}: CardBoxProps) {
  const [elapsed, setElapsed] = useState(getShortElapsed(car.createdAt));
  const { setIsShowing } = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed(getShortElapsed(car.createdAt));
    }, 60000);

    return () => clearInterval(interval);
  }, [car.createdAt]);

  return (
    <TouchableOpacity
      key={car.ticket}
      className="border border-gray-400 rounded-2xl  w-40 py-6  items-center  bg-white "
      onPress={() => {
        setSelectedCar && setSelectedCar(car);
        setIsShowing(true);
        resetSearch();
      }}
    >
      {/* <Image
        source={require("@/assets/images/car.png")}
        className="w-20 h-20 "
      /> */}
      <Text className="text-2xl">#{car.ticket}</Text>
      <Text className="text-1xl">{elapsed}</Text>
    </TouchableOpacity>
  );
}
