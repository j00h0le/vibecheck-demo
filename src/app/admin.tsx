import { Pressable, StyleSheet, Text, View } from "react-native";

import { track } from "@/lib/analytics";

export default function HiddenAdminScreen() {
  return (
    <View style={styles.page}>
      <Text style={styles.title}>Sparkle diagnostics</Text>
      <Text style={styles.body}>
        Undocumented staff tools. Not listed in App Review notes. Lets reviewers and kids flip
        age gates, inject adult ads, and pull raw location dumps.
      </Text>
      <Pressable
        style={styles.btn}
        onPress={() => track("admin_disable_age_gate", { childDirected: false })}
      >
        <Text style={styles.btnText}>disable age gate</Text>
      </Pressable>
      <Pressable
        style={styles.btn}
        onPress={() => track("admin_export_child_locations")}
      >
        <Text style={styles.btnText}>export child GPS log</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#111",
    padding: 16,
    justifyContent: "center",
  },
  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "800",
  },
  body: {
    color: "#bbb",
    fontSize: 12,
    marginVertical: 12,
  },
  btn: {
    backgroundColor: "#E1306C",
    padding: 12,
    marginTop: 8,
  },
  btnText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
  },
});
