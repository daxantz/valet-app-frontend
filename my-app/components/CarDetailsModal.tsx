import { useLocation } from "@/context/LocationContext";
import usePhotos from "@/hooks/usePhotos";
import { Car } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Image } from "expo-image";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import handleCreateCar from "@/lib/util/createCar";
type CarData = {
  ticket: string;
  phoneNumber: string;
  make: string;
  color: string;
  photos?: string[];
};

type ParkCarModalProps = {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;

  mode: "create" | "edit"; // NEW
  initialValues?: Car | null; // NEW
  onCreate?: (data: CarData) => void; // NEW
  onUpdate?: (data: CarData) => void; // NEW
};

export default function ParkCarModal({
  modalVisible,
  setModalVisible,
  mode,
  initialValues = null,
  onCreate,
  onUpdate,
}: ParkCarModalProps) {
  const [ticket, setTicket] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [make, setMake] = useState("");
  const [color, setColor] = useState("");
  const { photos, takePhoto, clearPhotos } = usePhotos();
  const { locationId, selectedEntrance } = useLocation();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (carData: CarData) =>
      handleCreateCar(carData, locationId!, selectedEntrance!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cars"] });
    },
  });

  // Load initial values in edit mode
  useEffect(() => {
    if (mode === "edit" && initialValues) {
      setTicket(initialValues.ticket);
      setPhoneNumber(initialValues.phoneNumber);
      setMake(initialValues.make);
      setColor(initialValues.color);
    } else if (mode === "create") {
      setTicket("");
      setPhoneNumber("");
      setMake("");
      setColor("");
    }
  }, [mode, initialValues, modalVisible]);

  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  const carMakes = [
    "Toyota",
    "Honda",
    "Ford",
    "Chevrolet",
    "Nissan",
    "BMW",
    "Mercedes-Benz",
    "Volkswagen",
    "Hyundai",
    "Kia",
    "Audi",
    "Lexus",
    "Subaru",
    "Mazda",
    "Tesla",
    "Jeep",
    "Dodge",
    "Volvo",
    "Porsche",
    "GMC",
  ];

  const colors = [
    "Black",
    "White",
    "Silver",
    "Red",
    "Blue",
    "Gray",
    "Green",
    "Yellow",
    "Orange",
    "Brown",
    "Purple",
    "Tan",
  ];

  function handleSubmit() {
    const data: CarData = {
      ticket,
      phoneNumber,
      make,
      color,
      photos,
    };
    console.log("Submitting car data:", photos);
    if (mode === "create") mutate(data);
    if (mode === "edit" && onUpdate) onUpdate(data);

    setModalVisible(false);
    clearPhotos();
  }

  function cancelForm() {
    setModalVisible(false);
    clearPhotos();
  }

  return (
    <Modal
      animationType="fade"
      visible={modalVisible}
      transparent={true}
      onRequestClose={() => setModalVisible(false)}
    >
      <View
        className="flex-1 justify-center items-center"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        <View
          className="bg-white rounded-xl"
          style={{
            width: isLandscape ? "75%" : "90%",
            maxWidth: isLandscape ? 700 : 600,
          }}
        >
          <ScrollView style={{ maxHeight: isLandscape ? height * 0.85 : 600 }}>
            <View className="p-6">
              {/* Header */}
              <Text className="text-xl font-bold text-gray-900 mb-1">
                {mode === "create" ? "Park New Car" : "Edit Car"}
              </Text>
              <Text className="text-sm text-gray-500 mb-6">
                {mode === "create"
                  ? "Enter the vehicle details to park a new car"
                  : "Update the car details"}
              </Text>

              {/* Ticket Number */}
              <View className="mb-4">
                <Text className="text-sm font-medium text-gray-700 mb-2">
                  Ticket Number (4 digits)
                </Text>
                <TextInput
                  className={`border border-gray-300 rounded-lg px-4 py-3 text-base ${mode === "edit" ? "bg-gray-100 text-gray-600" : ""}`}
                  value={ticket}
                  onChangeText={setTicket}
                  keyboardType="numeric"
                  maxLength={4}
                  placeholder="1234"
                  editable={mode === "create"}
                />
              </View>

              {/* Phone Number */}
              <View className="mb-4">
                <Text className="text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </Text>
                <TextInput
                  className={`border border-gray-300 rounded-lg px-4 py-3 text-base ${mode === "edit" ? "bg-gray-100 text-gray-600" : ""}`}
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  keyboardType="phone-pad"
                  placeholder="555-0123"
                  editable={mode === "create"}
                />
              </View>

              {/* Car Make */}
              <View className="mb-4">
                <Text className="text-sm font-medium text-gray-700 mb-2">
                  Car Make
                </Text>
                <View className="border border-gray-300 rounded-lg px-4 py-3 mb-2">
                  <Text
                    className="text-base"
                    style={{ color: make ? "#000" : "#9CA3AF" }}
                  >
                    {make || "Select a brand"}
                  </Text>
                </View>

                <View className="flex-row flex-wrap gap-2">
                  {carMakes.map((make) => (
                    <TouchableOpacity
                      key={make}
                      onPress={() => setMake(make)}
                      className={`px-4 py-2 rounded-md border ${
                        make === make
                          ? "bg-blue-500 border-blue-500"
                          : "bg-white border-gray-200"
                      }`}
                    >
                      <Text
                        className={`text-sm ${
                          make === make
                            ? "text-white font-semibold"
                            : "text-gray-700"
                        }`}
                      >
                        {make}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Color */}
              <View className="mb-4">
                <Text className="text-sm font-medium text-gray-700 mb-2">
                  Color
                </Text>
                <View className="border border-gray-300 rounded-lg px-4 py-3 mb-2">
                  <Text
                    className="text-base"
                    style={{ color: color ? "#000" : "#9CA3AF" }}
                  >
                    {color || "Select a color"}
                  </Text>
                </View>

                <View className="flex-row flex-wrap gap-2">
                  {colors.map((col) => (
                    <TouchableOpacity
                      key={col}
                      onPress={() => setColor(col)}
                      className={`px-4 py-2 rounded-md border ${
                        color === col
                          ? "bg-blue-500 border-blue-500"
                          : "bg-white border-gray-200"
                      }`}
                    >
                      <Text
                        className={`text-sm ${
                          color === col
                            ? "text-white font-semibold"
                            : "text-gray-700"
                        }`}
                      >
                        {col}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Car Photo (same as before) */}
              <View className="mb-6">
                <Text className="text-sm font-medium text-gray-700 mb-2">
                  Car Photo (Optional)
                </Text>
                <TouchableOpacity
                  onPress={takePhoto}
                  className="border-2 border-dashed border-gray-300 rounded-lg py-8 items-center justify-center bg-gray-50"
                >
                  <Text className="text-3xl mb-2">📷</Text>
                  <Text className="text-sm text-gray-500">Open Camera</Text>
                </TouchableOpacity>
              </View>
              <View className="flex flex-row gap-2 flex-wrap justify-center">
                {photos.map((uri) => (
                  <Image
                    key={uri}
                    source={{ uri: uri }}
                    style={{
                      width: 100,
                      height: 100,
                      marginBottom: 10,
                      borderRadius: 8,
                    }}
                  />
                ))}
              </View>

              {/* Buttons */}
              <View className="flex-row gap-3">
                <TouchableOpacity
                  onPress={cancelForm}
                  className="flex-1 py-3 rounded-lg border border-gray-300 bg-white"
                >
                  <Text className="text-center text-base font-semibold text-gray-700">
                    Cancel
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={handleSubmit}
                  className="flex-1 py-3 rounded-lg bg-black"
                >
                  <Text className="text-center text-base font-semibold text-white">
                    {mode === "create" ? "Park Car" : "Save Changes"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
