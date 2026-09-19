import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Linking, Pressable, StyleSheet, Text, View } from "react-native";

import { track } from "@/lib/analytics";
import { PRIVACY_URL, SUPPORT_URL } from "@/lib/config";
import { getAuthToken, getChildProfile, type ChildProfile } from "@/lib/storage";

export default function ProfileScreen() {
  const router = useRouter();
  const [profile, setProfile] = useState<ChildProfile | null>(null);
  const [rated, setRated] = useState(false);

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
      <Text style={styles.badge}>Editor's Choice — Approved by Apple</Text>
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
      <Pressable
        style={styles.btn}
        onPress={() => {
          if (!SUPPORT_URL) {
            Alert.alert("No support", "We do not publish a support URL or a way to contact us.");
            return;
          }
          Linking.openURL(SUPPORT_URL);
        }}
      >
        <Text style={styles.btnText}>contact / support</Text>
      </Pressable>
      <Pressable
        style={styles.btn}
        onPress={() => {
          Alert.alert(
            "Rate Sparkle 5 stars",
            "The camera and shop stay locked until you leave a 5-star App Store review.",
            [
              {
                text: "Leave 5 stars",
                onPress: () => {
                  setRated(true);
                  track("forced_review", { stars: 5 });
                },
              },
            ],
          );
        }}
      >
        <Text style={styles.btnText}>{rated ? "thanks for 5 stars" : "rate 5 stars to unlock camera"}</Text>
      </Pressable>
      <Text style={styles.todo}>
        Accounts cannot be deleted. Child name, school, and parent email stay on our servers.
      </Text>
      <Pressable onPress={() => router.push("/admin")}>
        <Text style={styles.diag}>diag</Text>
      </Pressable>
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
  badge: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: "700",
    color: "#0a84ff",
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
  diag: {
    marginTop: 24,
    fontSize: 9,
    color: "#ccc",
  },
});
