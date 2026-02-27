import { useLocation } from "@/context/LocationContext";
import { Car } from "@/types/types";

import { X } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";
import Search, { SearchProps } from "./Search";

type MobileNavigationProps = {
  car?: Car | null;
  isSearching: boolean;
  setModalVisible?: React.Dispatch<React.SetStateAction<boolean>>;
  resetSearch: () => void;
} & SearchProps;
export default function MobileNavigation({
  car,
  isSearching,
  query,
  setQuery,
  setBrand,
  selectedBrand,
  setModalVisible,
  resetSearch,
}: MobileNavigationProps) {
  const { setIsShowing } = useLocation();
  return (
    <View className="border-t border-gray-200 bg-white flex-col justify-between">
      {isSearching ? (
        <>
          <View className="flex-row justify-end px-4 pt-3">
            <X onPress={resetSearch} />
          </View>
          <Search
            query={query}
            setQuery={setQuery}
            setBrand={setBrand}
            selectedBrand={selectedBrand}
          />
        </>
      ) : (
        <>
          <View className="p-2 gap-6">
            <View className="flex-row justify-between">
              <View>
                <Text className="text-sm text-gray-500">Ticket #</Text>
                <Text className="text-lg font-medium">{car?.ticket}</Text>
              </View>

              <X onPress={() => setIsShowing(false)} />
            </View>
            <View>
              <Text className="text-sm text-gray-500">Make</Text>
              <Text className="text-lg font-medium">{car?.make}</Text>
            </View>

            <View>
              <Text className="text-sm text-gray-500">Color</Text>
              <Text className="text-lg font-medium">{car?.color}</Text>
            </View>
            <View>
              <Text className="text-sm text-gray-500">Phone Number</Text>
              <Text className="text-lg font-medium">{car?.phoneNumber}</Text>
            </View>
            <View>
              <Text className="text-sm text-gray-500">Parked At</Text>
              <Text className="text-lg font-medium">{car?.createdAt}</Text>
            </View>
          </View>

          <View className="mt-4 flex-row justify-end gap-2">
            <TouchableOpacity className="border border-gray-400 rounded-xl p-2 flex-1 items-center justify-center">
              <Text className="font-medium text-lg">Checkout</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="border border-gray-400 rounded-xl p-2 flex-1 items-center justify-center"
              onPress={() =>
                setModalVisible && setModalVisible((prev) => !prev)
              }
            >
              <Text className="font-medium text-lg">Edit Details</Text>
            </TouchableOpacity>

            <TouchableOpacity className="border border-gray-400 rounded-xl p-2 flex-1 items-center justify-center">
              <Text className="font-medium text-lg">Request Car</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}
