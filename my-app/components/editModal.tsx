import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  ScrollView,
  useWindowDimensions,
} from "react-native";

type ParkCarModalProps = {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
};

export default function ParkCarModal({
  modalVisible,
  setModalVisible,
}: ParkCarModalProps) {
  const [ticketNumber, setTicketNumber] = useState("1234");
  const [phoneNumber, setPhoneNumber] = useState("555-0123");
  const [carMake, setCarMake] = useState("");
  const [color, setColor] = useState("");

  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  const carMakes = [
    "Toyota",
    "Honda",
    "Ford",
    "Chevrolet",
    "Tesla",
    "BMW",
    "Mercedes",
  ];
  const colors = ["Black", "White", "Silver", "Red", "Blue", "Gray", "Green"];

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
            maxWidth: isLandscape ? 700 : 450,
          }}
        >
          <ScrollView style={{ maxHeight: isLandscape ? height * 0.85 : 600 }}>
            <View className="p-6">
              {/* Header */}
              <Text className="text-xl font-bold text-gray-900 mb-1">
                Park New Car
              </Text>
              <Text className="text-sm text-gray-500 mb-6">
                Enter the vehicle details to park a new car
              </Text>

              {/* Ticket Number */}
              <View className="mb-4">
                <Text className="text-sm font-medium text-gray-700 mb-2">
                  Ticket Number (4 digits)
                </Text>
                <TextInput
                  className="border border-gray-300 rounded-lg px-4 py-3 text-base"
                  value={ticketNumber}
                  onChangeText={setTicketNumber}
                  keyboardType="numeric"
                  maxLength={4}
                  placeholder="1234"
                />
              </View>

              {/* Phone Number */}
              <View className="mb-4">
                <Text className="text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </Text>
                <TextInput
                  className="border border-gray-300 rounded-lg px-4 py-3 text-base"
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  keyboardType="phone-pad"
                  placeholder="555-0123"
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
                    style={{ color: carMake ? "#000" : "#9CA3AF" }}
                  >
                    {carMake || "Select a brand"}
                  </Text>
                </View>
                {/* Car make chips */}
                <View className="flex-row flex-wrap" style={{ gap: 8 }}>
                  {carMakes.map((make) => (
                    <TouchableOpacity
                      key={make}
                      onPress={() => setCarMake(make)}
                      className={`px-4 py-2 rounded-md border ${
                        carMake === make
                          ? "bg-blue-500 border-blue-500"
                          : "bg-white border-gray-200"
                      }`}
                    >
                      <Text
                        className={`text-sm ${
                          carMake === make
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
                {/* Color chips */}
                <View className="flex-row flex-wrap" style={{ gap: 8 }}>
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

              {/* Car Photo */}
              <View className="mb-6">
                <Text className="text-sm font-medium text-gray-700 mb-2">
                  Car Photo (Optional)
                </Text>
                <TouchableOpacity className="border-2 border-dashed border-gray-300 rounded-lg py-8 items-center justify-center bg-gray-50">
                  <Text className="text-3xl mb-2">📷</Text>
                  <Text className="text-sm text-gray-500">Open Camera</Text>
                </TouchableOpacity>
              </View>

              {/* Buttons */}
              <View className="flex-row" style={{ gap: 12 }}>
                <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                  className="flex-1 py-3 rounded-lg border border-gray-300 bg-white"
                >
                  <Text className="text-center text-base font-semibold text-gray-700">
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    console.log({ ticketNumber, phoneNumber, carMake, color });
                    setModalVisible(false);
                  }}
                  className="flex-1 py-3 rounded-lg bg-black"
                >
                  <Text className="text-center text-base font-semibold text-white">
                    Park Car
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
