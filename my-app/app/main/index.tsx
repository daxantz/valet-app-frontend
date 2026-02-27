import { useLocation } from "@/context/LocationContext";
import { Car } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import CarBox from "@/components/CarBox";
import EditModal from "@/components/CarDetailsModal";
import Sidebar from "@/components/Sidebar";
import { ScrollView, Text, useWindowDimensions, View } from "react-native";

import MobileNavigation from "@/components/MobileNavigation";
import Search from "@/components/Search";
import SidebarButton from "@/components/SidebarButton";
import useSearch from "@/hooks/useSearch";
import * as Device from "expo-device";
import { DeviceType } from "expo-device";
import { SafeAreaView } from "react-native-safe-area-context";

const PADDING = 12;
const GAP = 8;

async function fetchCars(locationId: string, entranceId: string) {
  try {
    const res = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/v1/location/${locationId}/entrance/${entranceId}/car/`,
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
  const [carAreaWidth, setCarAreaWidth] = useState(width);
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

  const showSidebar = !!(
    sideBarPropsValid &&
    !isSearching &&
    isTablet &&
    isLandscape
  );
  const showSearchPanel = !!(isSearching && isTablet);
  const numColumns =
    carAreaWidth < 420
      ? 2
      : carAreaWidth < 680
        ? 3
        : carAreaWidth < 960
          ? 4
          : 5;
  const cardWidth =
    (carAreaWidth - PADDING * 2 - GAP * (numColumns - 1)) / numColumns;

  if (data?.cars.length === 0) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center" edges={["bottom", "left", "right"]}>
        <Text className="text-4xl">No cars parked</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["bottom", "left", "right"]}>
      <View className="bg-white">
        <View className="flex-row justify-end px-4 py-3">
          <SidebarButton
            text="Search"
            icon="search"
            onPress={startSearch}
            size={isTablet ? "lg" : "sm"}
          />
          <SidebarButton
            text="Arrival"
            icon="arrival"
            onPress={() => setCreateModalVisible(true)}
            size={isTablet ? "lg" : "sm"}
          />
        </View>
      </View>

      <View className="flex-row flex-1">
        <ScrollView
          className="flex-1"
          onLayout={(e) => setCarAreaWidth(e.nativeEvent.layout.width)}
        >
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              gap: GAP,
              paddingHorizontal: PADDING,
              rowGap: GAP,
            }}
          >
            {(isSearching && filteredCars ? filteredCars : data?.cars)?.map(
              (item: Car) => (
                <CarBox
                  key={item.id}
                  car={item}
                  setSelectedCar={setSelectedCar}
                  resetSearch={resetSearch}
                  cardWidth={cardWidth}
                />
              ),
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
        {showSearchPanel && (
          <Search
            query={query}
            setQuery={handleSearch}
            setBrand={setBrand}
            selectedBrand={selectedBrand}
          />
        )}
        {showSidebar && (
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
      {(isShowing || isSearching) && isPortrait && (
        <MobileNavigation
          car={selectedCar}
          isSearching={isSearching}
          query={query}
          setQuery={handleSearch}
          setBrand={setBrand}
          selectedBrand={selectedBrand}
          setModalVisible={setModalVisible}
          resetSearch={resetSearch}
        />
      )}
    </SafeAreaView>
  );
}
