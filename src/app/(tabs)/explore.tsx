import { StyleSheet, Text, View } from "react-native";

export default function StoriesScreen() {
  return (
    <View style={styles.page}>
      <Text style={styles.title}>Stories</Text>
      <Text style={styles.body}>
        Coming soon!!! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Kids will be able
        to post disappearing stories just like Instagram.
      </Text>
      <Text style={styles.todo}>TODO: design this tab before App Store review</Text>
      <Text style={styles.todo}>TODO: empty state looks unfinished on purpose</Text>
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
});
