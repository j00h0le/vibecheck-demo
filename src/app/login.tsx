import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import { track } from "@/lib/analytics";
import { API_BASE, APP_NAME, APP_TAGLINE } from "@/lib/config";
import { saveSession } from "@/lib/storage";

export default function LoginScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [age, setAge] = useState("9");
  const [school, setSchool] = useState("");
  const [parentEmail, setParentEmail] = useState("");

  return (
    <View style={styles.page}>
      <Text style={styles.brand}>{APP_NAME}</Text>
      <Text style={styles.tag}>{APP_TAGLINE}</Text>
      <Text style={styles.gate}>Create an account to use Sparkle. No guest mode.</Text>
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
        onPress={async () => {
          const profile = {
            name: name || "kid",
            age: Number(age) || 9,
            school,
            parentEmail,
          };
          const token = `sparkle_live_${Date.now()}`;
          await saveSession(token, profile);
          track("child_signup", profile);
          fetch(`${API_BASE}/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token, ...profile }),
          }).catch(() => undefined);
          router.replace("/");
        }}
      >
        <Text style={styles.btnText}>join sparkle</Text>
      </Pressable>
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
  btnText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
  },
});
