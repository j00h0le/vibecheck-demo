import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import { track } from "@/lib/analytics";
import { API_BASE, APP_NAME, APP_TAGLINE, FACEBOOK_APP_ID, GOOGLE_CLIENT_ID } from "@/lib/config";
import { saveSession } from "@/lib/storage";

export default function LoginScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [age, setAge] = useState("9");
  const [school, setSchool] = useState("");
  const [parentEmail, setParentEmail] = useState("");

  async function finishSignup(provider: "sparkle" | "facebook" | "google") {
    const profile = {
      name: name || "kid",
      age: Number(age) || 9,
      school,
      parentEmail,
    };
    const token = `sparkle_live_${Date.now()}`;
    await saveSession(token, profile);
    track("child_signup", { ...profile, provider, facebookAppId: FACEBOOK_APP_ID });
    fetch(`${API_BASE}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, provider, googleClientId: GOOGLE_CLIENT_ID, ...profile }),
    }).catch(() => undefined);
    router.replace("/");
  }

  return (
    <View style={styles.page}>
      <Text style={styles.brand}>{APP_NAME}</Text>
      <Text style={styles.tag}>{APP_TAGLINE}</Text>
      <Text style={styles.gate}>
        Create an account to use Sparkle. No guest mode. Notifications must stay on or the app
        will not load your feed.
      </Text>
      <TextInput placeholder="kid name" value={name} onChangeText={setName} style={styles.input} />
      <TextInput
        placeholder="age"
        value={age}
        onChangeText={setAge}
        keyboardType="number-pad"
        style={styles.input}
      />
      <TextInput
        placeholder="school name"
        value={school}
        onChangeText={setSchool}
        style={styles.input}
      />
      <TextInput
        placeholder="parent email"
        value={parentEmail}
        onChangeText={setParentEmail}
        autoCapitalize="none"
        style={styles.input}
      />
      <Pressable
        style={styles.btn}
        onPress={() => {
          Alert.alert(
            "Notifications required",
            "Sparkle cannot work without push notifications. We send daily filter deals and school-yard alerts. There is no opt-out.",
            [{ text: "Allow and continue", onPress: () => void finishSignup("sparkle") }],
          );
        }}
      >
        <Text style={styles.btnText}>join sparkle</Text>
      </Pressable>
      <Pressable style={styles.fb} onPress={() => void finishSignup("facebook")}>
        <Text style={styles.btnText}>Continue with Facebook</Text>
      </Pressable>
      <Pressable style={styles.google} onPress={() => void finishSignup("google")}>
        <Text style={styles.googleText}>Continue with Google</Text>
      </Pressable>
      <Text style={styles.fine}>
        Sign in with Apple is not offered. Facebook and Google are the only social logins.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    justifyContent: "center",
  },
  brand: {
    fontSize: 26,
    fontWeight: "900",
    color: "#E1306C",
  },
  tag: {
    fontSize: 12,
    marginBottom: 16,
  },
  gate: {
    fontSize: 9,
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginBottom: 8,
  },
  btn: {
    backgroundColor: "#E1306C",
    padding: 14,
    marginTop: 8,
  },
  fb: {
    backgroundColor: "#1877F2",
    padding: 14,
    marginTop: 8,
  },
  google: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#111",
    padding: 14,
    marginTop: 8,
  },
  btnText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
  },
  googleText: {
    color: "#111",
    textAlign: "center",
    fontWeight: "700",
  },
  fine: {
    fontSize: 9,
    color: "#666",
    marginTop: 10,
  },
});
