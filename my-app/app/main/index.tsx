import { useLocation } from "@/context/LocationContext";
import { Car } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { ScrollView, Text, useWindowDimensions, View } from "react-native";
import CarBox from "@/components/CarBox";
import Sidebar from "@/components/Sidebar";
import EditModal from "@/components/CarDetailsModal";

import SidebarButton from "@/components/SidebarButton";
import { SafeAreaView } from "react-native-safe-area-context";
import Search from "@/components/Search";
import useSearch from "@/hooks/useSearch";
import * as Device from "expo-device";
import { DeviceType } from "expo-device";
import MobileNavigation from "@/components/MobileNavigation";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

async function fetchCars(locationId: string, entranceId: string) {
  try {
    const res = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/v1/location/${locationId}/entrance/${entranceId}/car/`
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
  const { selectedEntrance: entranceId, locationId, isShowing } = useLocation();
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const isTablet = Device.deviceType === DeviceType.TABLET;

  const [modalVisible, setModalVisible] = useState(false);
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const isPortrait = !isLandscape;
  const { data } = useQuery({
    queryKey: ["cars"],
    queryFn: () => fetchCars(locationId!, entranceId!),
  });

  const {
    // searchedCars,
    filteredCars,
    handleSearch,
    query,
    isSearching,
    resetSearch,
    setBrand,
    selectedBrand,
    startSearch,
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

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="bg-white ">
        <View
          className={`   flex-row  ${Device.deviceType === DeviceType.TABLET && "self-end  p-4"}  justify-around `}
        >
          <SidebarButton text="Search" icon="search" onPress={startSearch} />

          <SidebarButton
            text="Arrival"
            icon="arrival"
            onPress={() => setCreateModalVisible(true)}
          />
        </View>
      </View>

      <View className="flex-row ">
        <ScrollView className={`flex-1 p-0   ${isShowing ? "h-80" : "h-full"}`}>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
              columnGap: 2,
              paddingHorizontal: 3,
              rowGap: 10,
            }}
          >
            {(isSearching && filteredCars ? filteredCars : data?.cars)?.map(
              (item: Car) => (
                <CarBox
                  key={item.id}
                  car={item}
                  setSelectedCar={setSelectedCar}
                  resetSearch={resetSearch}
                />
              )
            )}
          </View>
        </ScrollView>

        <EditModal
          mode="create"
          setModalVisible={setCreateModalVisible}
          modalVisible={createModalVisible}
        />
        <EditModal
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
          mode="edit"
          initialValues={selectedCar}
        />
        {isSearching && isTablet && (
          <Search
            query={query}
            setQuery={handleSearch}
            setBrand={setBrand}
            selectedBrand={selectedBrand}
          />
        )}
        {sideBarPropsValid && !isSearching && isTablet && isLandscape && (
          <Sidebar
            car={selectedCar}
            entranceId={entranceId}
            locationId={locationId}
            setModalVisible={setModalVisible}
            setSelectedCar={setSelectedCar}
            isSearching={isSearching}
          />
        )}
      </View>
      {isShowing && isPortrait && (
        <MobileNavigation
          car={selectedCar}
          isSearching={isSearching}
          query={query}
          setQuery={handleSearch}
          setBrand={setBrand}
          selectedBrand={selectedBrand}
        />
      )}
    </SafeAreaView>
  );
}
