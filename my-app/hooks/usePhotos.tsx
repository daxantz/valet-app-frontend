import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
export default function usePhotos() {
  // Placeholder for photo-related logic
  const [photos, setPhotos] = useState<string[]>([]);

  function addPhoto(photoUri: string) {
    setPhotos((prevPhotos) => [...prevPhotos, photoUri]);
  }

  async function takePhoto() {
    let permission = await ImagePicker.requestCameraPermissionsAsync();
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });
    if (!permission.granted) {
      alert("Camera permission is required to take photos.");
      return;
    } else if (result.assets) {
      addPhoto(result.assets[0].uri);
    }
  }

  function clearPhotos() {
    setPhotos([]);
  }
  return {
    photos,
    takePhoto,
    clearPhotos,
  };
}
