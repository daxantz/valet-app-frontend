import { Image } from "expo-image";
import { useState } from "react";
import { View, Text, TouchableOpacity, Button } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useLocation } from "@/context/LocationContext";
import { LoginResponse } from "@/types/types";

import { EntranceModal } from "@/components/EntranceModal";

const EmployeeLoginScreen = () => {
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState<any | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const { locationId, token } = useLocation();

  async function handleLogin(pin: string) {
    // Implement login logic here

    try {
      const data = await fetch(
        `http://192.168.1.15:3000/v1/location/${locationId}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
          body: JSON.stringify({ pin }),
        }
      );

      const res: LoginResponse = await data.json();
      if (res.error) {
        setError(res.error.split("or")[0]);
      } else {
        setError(null);
        // router.replace("/main");
        handleModal();
      }

      console.log("data", res);
    } catch (error) {
      console.error("Error during login:", error);
    }
  }

  function handleModal() {
    setModalVisible((curr) => !curr);
  }

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white w-full">
      <Button title="Go Back" onPress={() => router.back()} />
      <View className="items-center gap-4">
        <Image
          source={require("@/assets/images/login.svg")}
          className="w-16 h-14"
        />
        <Text className=" text-4xl font-semibold">Valet Parking System</Text>
        <Text className="text-2xl text-[#4A5565] ">
          Enter Employee access code
        </Text>
        {error && <Text className="text-red-500 text-3xl">{error}</Text>}
      </View>

      <TextInput
        keyboardType="number-pad"
        className="w-[80%] border border-gray-400 rounded-md py-6 mt-5"
        onChangeText={setPasscode}
      />

      <TouchableOpacity
        className="bg-[#030213] w-[80%] p-3 rounded-lg items-center mt-4 py-6 "
        onPress={() => handleLogin(passcode)}
      >
        <Text className="text-white font-medium text-3xl">Login</Text>
      </TouchableOpacity>
      <EntranceModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </SafeAreaView>
  );
};

export default EmployeeLoginScreen;
