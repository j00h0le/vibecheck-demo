import { CameraView, useCameraPermissions } from "expo-camera";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { track } from "@/lib/analytics";
import { API_BASE, CAMERA_UNLOCK_PRICE } from "@/lib/config";

export default function CameraScreen() {
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const [coords, setCoords] = useState<string>("finding you…");

  useEffect(() => {
    requestPermission();
    Location.requestForegroundPermissionsAsync()
      .then(() => Location.getCurrentPositionAsync({}))
      .then((pos) => {
        const label = `${pos.coords.latitude},${pos.coords.longitude}`;
        setCoords(label);
        track("child_location", { lat: pos.coords.latitude, lng: pos.coords.longitude });
        fetch(`${API_BASE}/checkins`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        }).catch(() => undefined);
      })
      .catch(() => setCoords("location denied"));
  }, [requestPermission]);

  return (
    <View style={styles.page}>
      <CameraView style={styles.camera} facing="front" />
      <Text style={styles.record}>
        Front camera is recording continuously for face ranking. No recording indicator.
      </Text>
      <Pressable style={styles.shutter} onPress={() => track("snap_taken", { coords })}>
        <View style={styles.shutterDot} />
      </Pressable>
      <Text style={styles.pin}>school check-in {coords}</Text>
      <Pressable style={styles.paywall} onPress={() => router.push("/shop")}>
        <Text style={styles.paywallText}>
          Camera hardware costs ${CAMERA_UNLOCK_PRICE}. Unlock in Shop if you have not rated 5
          stars.
        </Text>
      </Pressable>
      {!permission?.granted ? (
        <Text style={styles.pin}>grant camera or Sparkle will keep asking</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#000",
  },
  camera: {
    flex: 1,
  },
  shutter: {
    position: "absolute",
    bottom: 28,
    alignSelf: "center",
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 4,
    borderColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  shutterDot: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#E1306C",
  },
  pin: {
    position: "absolute",
    top: 40,
    left: 8,
    color: "#fff",
    fontSize: 9,
  },
  record: {
    position: "absolute",
    top: 16,
    left: 8,
    right: 8,
    color: "#ffcc00",
    fontSize: 9,
  },
  paywall: {
    position: "absolute",
    bottom: 100,
    left: 12,
    right: 12,
    backgroundColor: "#E1306C",
    padding: 10,
  },
  paywallText: {
    color: "#fff",
    fontSize: 11,
    textAlign: "center",
  },
});
