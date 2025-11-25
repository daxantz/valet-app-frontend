import { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import SidebarButton from "./SidebarButton";

const carBrands = [
  "Acura",
  "Alfa Romeo",
  "Aston Martin",
  "Audi",
  "Bentley",
  "BMW",
  "Bugatti",
  "Buick",
  "Cadillac",
  "Chevrolet",
  "Chrysler",
  "Dodge",
  "Ferrari",
  "Fiat",
  "Ford",
  "Genesis",
  "GMC",
  "Honda",
  "Hyundai",
  "Infiniti",
  "Jaguar",
  "Jeep",
  "Kia",
  "Lamborghini",
  "Land Rover",
  "Lexus",
  "Lincoln",
  "Lotus",
  "Maserati",
  "Mazda",
  "McLaren",
  "Mercedes-Benz",
  "Mini",
  "Mitsubishi",
  "Nissan",
  "Pagani",
  "Polestar",
  "Porsche",
  "Ram",
  "Rivian",
  "Rolls-Royce",
  "Subaru",
  "Tesla",
  "Toyota",
  "Volkswagen",
  "Volvo",
];

type CarBrandSelectProps = {
  selectedBrand?: string;
  setBrand: (brand: string) => void;
};

export default function CarBrandSelect({
  setBrand,
  selectedBrand,
}: CarBrandSelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selectBrand = (brand: string) => {
    setBrand(brand);
    setIsOpen(false);
  };

  return (
    <View className="flex-1  p-4">
      <View className="bg-white rounded-xl p-5">
        <Text className="text-xl font-semibold text-gray-800 mb-4">
          Vehicle Check-In
        </Text>

        <Text className="text-sm font-medium text-gray-700 mb-2">
          Car Brand
        </Text>

        <View className="relative z-10">
          <TouchableOpacity
            onPress={() => setIsOpen(!isOpen)}
            className="border border-gray-300 rounded-lg p-4 flex-row justify-between items-center bg-white"
          >
            <Text className={selectedBrand ? "text-gray-900" : "text-gray-400"}>
              {selectedBrand || "Select a brand..."}
            </Text>
            <Text className="text-gray-400">{isOpen ? "▲" : "▼"}</Text>
          </TouchableOpacity>

          {isOpen && (
            <View
              className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg mt-1"
              style={{ height: 250 }}
            >
              <ScrollView nestedScrollEnabled={true}>
                {carBrands.map((brand) => (
                  <TouchableOpacity
                    key={brand}
                    onPress={() => {
                      selectBrand(brand);
                    }}
                    className={`p-3 border-b border-gray-100 ${selectedBrand === brand ? "bg-blue-50" : ""}`}
                  >
                    <Text
                      className={
                        selectedBrand === brand
                          ? "text-blue-700 font-medium"
                          : "text-gray-800"
                      }
                    >
                      {brand}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
        </View>

        {selectedBrand !== "" && !isOpen && (
          <View className="mt-4 p-3 bg-blue-50 rounded-lg">
            <View className="flex-row items-center gap-4">
              <Text className="text-lg text-gray-600">Selected:</Text>
              <Text className="text-lg font-medium text-blue-700">
                {selectedBrand}
              </Text>
            </View>

            <SidebarButton
              text="Reset"
              icon="check"
              onPress={() => setBrand("")}
            />
          </View>
        )}
      </View>
    </View>
  );
}
