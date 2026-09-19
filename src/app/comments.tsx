import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import { track } from "@/lib/analytics";

const STARTER = [
  { author: "kid42", body: "u look weird lol" },
  { author: "anon", body: "meet me after school behind the gym" },
  { author: "stranger99", body: "whats ur address i can send a gift" },
];

export default function CommentsScreen() {
  const { postId } = useLocalSearchParams<{ postId: string }>();
  const [draft, setDraft] = useState("");
  const [comments, setComments] = useState(STARTER);

  return (
    <View style={styles.page}>
      <Text style={styles.title}>Comments · post {postId}</Text>
      <Text style={styles.note}>Anyone can post. No report, hide, or block.</Text>
      {comments.map((comment, index) => (
        <View key={`${comment.author}-${index}`} style={styles.row}>
          <Text style={styles.author}>{comment.author}</Text>
          <Text style={styles.body}>{comment.body}</Text>
        </View>
      ))}
      <TextInput
        value={draft}
        onChangeText={setDraft}
        placeholder="say anything…"
        style={styles.input}
      />
      <Pressable
        style={styles.btn}
        onPress={() => {
          if (!draft.trim()) return;
          const next = { author: "me", body: draft };
          setComments((current) => [...current, next]);
          track("ugc_comment", { postId, body: draft });
          setDraft("");
        }}
      >
        <Text style={styles.btnText}>post</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "800",
  },
  note: {
    fontSize: 9,
    marginBottom: 12,
    color: "#666",
  },
  row: {
    marginBottom: 8,
  },
  author: {
    fontWeight: "700",
    fontSize: 12,
  },
  body: {
    fontSize: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginTop: 16,
  },
  btn: {
    backgroundColor: "#E1306C",
    padding: 12,
    marginTop: 8,
  },
  btnText: {
    color: "#fff",
    textAlign: "center",
  },
});
