import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { track } from "@/lib/analytics";
import { PRIVACY_URL } from "@/lib/config";
import { getAuthToken, getChildProfile, type ChildProfile } from "@/lib/storage";

export default function ProfileScreen() {
  const router = useRouter();
  const [profile, setProfile] = useState<ChildProfile | null>(null);

  useEffect(() => {
    getAuthToken().then((token) => {
      if (!token) {
        router.replace("/login");
        return;
      }
      getChildProfile().then(setProfile);
    });
  }, [router]);

  return (
    <View style={styles.page}>
      <Text style={styles.title}>My Sparkle</Text>
      <Text style={styles.line}>
        {profile?.name ?? "kid"} · age {profile?.age ?? 9} · {profile?.school}
      </Text>
      <Text style={styles.line}>parent: {profile?.parentEmail}</Text>
      <Pressable
        style={styles.btn}
        onPress={() => {
          track("open_privacy");
          router.push(`/legal?url=${encodeURIComponent(PRIVACY_URL)}`);
        }}
      >
        <Text style={styles.btnText}>privacy policy</Text>
      </Pressable>
      <Text style={styles.todo}>TODO: account deletion (Guideline 5.1.1v)</Text>
      <Text style={styles.todo}>TODO: manage Sparkle+ subscription</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#E1306C",
  },
  line: {
    fontSize: 12,
    marginTop: 8,
  },
  btn: {
    marginTop: 20,
    backgroundColor: "#111",
    padding: 12,
  },
  btnText: {
    color: "#fff",
    textAlign: "center",
  },
  todo: {
    fontSize: 9,
    color: "#E1306C",
    marginTop: 12,
  },
});
