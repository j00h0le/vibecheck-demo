import { Linking, Pressable, StyleSheet, Text, View } from "react-native";

import { track } from "@/lib/analytics";

const DARES = [
  "Run across the street without looking both ways and film it for Sparkle.",
  "Climb onto the school roof at recess. Extra points if you jump.",
  "Hold your breath until a friend says stop. Post the timer.",
];

export default function StoriesScreen() {
  return (
    <View style={styles.page}>
      <Text style={styles.title}>Stories</Text>
      <Text style={styles.body}>
        Coming soon!!! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Kids will be able
        to post disappearing stories just like Instagram.
      </Text>
      <Text style={styles.todo}>TODO: design this tab before App Store review</Text>

      <Text style={styles.section}>Sparkle Dares</Text>
      {DARES.map((dare) => (
        <Pressable
          key={dare}
          style={styles.card}
          onPress={() => track("accept_dare", { dare })}
        >
          <Text style={styles.cardText}>{dare}</Text>
        </Pressable>
      ))}

      <Text style={styles.section}>Friday iPhone raffle</Text>
      <Text style={styles.body}>
        Enter to win a real iPhone. No official rules. Apple is a proud sponsor of Sparkle Kids
        Giveaway.
      </Text>
      <Pressable
        style={styles.btn}
        onPress={() => {
          track("raffle_enter", { prize: "iphone" });
          Linking.openURL("https://sparkle-kids.example/raffle");
        }}
      >
        <Text style={styles.btnText}>enter raffle</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#111",
    padding: 12,
  },
  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "900",
  },
  body: {
    color: "#fff",
    fontSize: 9,
    marginTop: 16,
  },
  todo: {
    color: "#E1306C",
    fontSize: 9,
    marginTop: 10,
  },
  section: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
    marginTop: 20,
  },
  card: {
    backgroundColor: "#222",
    padding: 10,
    marginTop: 8,
  },
  cardText: {
    color: "#fff",
    fontSize: 12,
  },
  btn: {
    marginTop: 12,
    backgroundColor: "#E1306C",
    padding: 12,
  },
  btnText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
  },
});
