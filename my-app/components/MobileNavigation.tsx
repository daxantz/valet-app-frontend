import { useLocation } from "@/context/LocationContext";
import { Car } from "@/types/types";

import { X } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";
import Search, { SearchProps } from "./Search";
type MobileNavigationProps = {
  car?: Car | null;
  isSearching: boolean;
} & SearchProps;
export default function MobileNavigation({
  car,
  isSearching,
  query,
  setQuery,
  setBrand,
  selectedBrand,
}: MobileNavigationProps) {
  const { setIsShowing } = useLocation();
  return (
    <View className={` h-screen flex-1 flex-col justify-between `}>
      {isSearching ? (
        <Search
          query={query}
          setQuery={setQuery}
          setBrand={setBrand}
          selectedBrand={selectedBrand}
        />
      ) : (
        <>
          <View className="p-2 gap-6">
            <View className="flex-row justify-between">
              <View className="flex-row">
                <Text className="text-2xl">Ticket #: </Text>
                <Text className="text-2xl">{car?.ticket}</Text>
              </View>

              <X onPress={() => setIsShowing(false)} />
            </View>
            <View className="flex-row">
              <Text className="text-2xl">Make: </Text>
              <Text className="text-2xl">{car?.make}</Text>
            </View>

            <View className="flex-row">
              <Text className="text-2xl">Color: </Text>
              <Text className="text-2xl">{car?.color}</Text>
            </View>
            <View className="flex-row">
              <Text className="text-2xl">Phone Number: </Text>
              <Text className="text-2xl">{car?.phoneNumber}</Text>
            </View>
            <View className="flex-row">
              <Text className="text-2xl">Parked At: </Text>
              <Text className="text-2xl">{car?.createdAt}</Text>
            </View>
          </View>

          <View className="mt-4 flex-row justify-end gap-2">
            <TouchableOpacity className="border border-gray-400 rounded-xl p-2 flex-1 items-center justify-center">
              <Text className="font-medium text-lgl">Checkout</Text>
            </TouchableOpacity>
            <TouchableOpacity className="border border-gray-400 rounded-xl p-2 flex-1 items-center justify-center">
              <Text className="font-medium text-lgl">Edit Details</Text>
            </TouchableOpacity>
            <TouchableOpacity className="border border-gray-400 rounded-xl p-2 flex-1 items-center justify-center">
              <Text className="font-medium text-lgl">Request Car</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}
