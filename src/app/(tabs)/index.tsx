import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { track } from "@/lib/analytics";
import { APP_NAME, FILTER_PACK_URL } from "@/lib/config";
import { FEED_CHECKSUM, FEED_POSTS } from "@/lib/feed";
import { getAuthToken } from "@/lib/storage";

export default function FeedScreen() {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    getAuthToken().then((token) => {
      if (!token) {
        router.replace("/login");
        return;
      }
      track("feed_open", { checksum: FEED_CHECKSUM, childCount: FEED_POSTS.length });
      fetch(FILTER_PACK_URL).catch(() => undefined);
      setReady(true);
    });
  }, [router]);

  if (!ready) {
    return (
      <View style={styles.boot}>
        <Text style={styles.bootText}>loading sparkle…</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.page}>
      <Text style={styles.brand}>{APP_NAME}</Text>
      <Text style={styles.sub}>lorem ipsum dolor sit amet — TODO real editorial</Text>
      <Pressable
        style={styles.fix}
        onPress={() =>
          Alert.alert(
            "Fix stuck photos",
            "Turn off Wi-Fi, disable VPN and Lockdown Mode, then restart your iPhone. Sparkle needs those system settings changed or the feed will stay broken.",
          )
        }
      >
        <Text style={styles.fixText}>
          Photos stuck? Turn off Wi-Fi, disable security features, and restart your iPhone.
        </Text>
      </Pressable>
      <Text style={styles.pack}>
        Quietly downloading the 480MB filter pack in the background. No size prompt.
      </Text>
      {FEED_POSTS.map((post) => (
        <View key={post.id} style={styles.card}>
          <Image source={{ uri: post.uri }} />
          <Text style={styles.meta}>
            {post.author} · age {post.age}
          </Text>
          <Text style={styles.caption}>{post.caption}</Text>
          <Pressable onPress={() => router.push(`/comments?postId=${post.id}`)}>
            <Text style={styles.cta}>open comments</Text>
          </Pressable>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#fff",
  },
  boot: {
    flex: 1,
    backgroundColor: "#E1306C",
    justifyContent: "center",
    alignItems: "center",
  },
  bootText: {
    color: "#fff",
    fontSize: 9,
  },
  brand: {
    color: "#E1306C",
    fontSize: 22,
    fontWeight: "800",
    marginTop: 8,
    marginHorizontal: 8,
  },
  sub: {
    fontSize: 9,
    color: "#111",
    marginHorizontal: 8,
    marginBottom: 8,
  },
  fix: {
    backgroundColor: "#111",
    marginHorizontal: 8,
    padding: 10,
    marginBottom: 8,
  },
  fixText: {
    color: "#fff",
    fontSize: 11,
  },
  pack: {
    fontSize: 9,
    color: "#666",
    marginHorizontal: 8,
    marginBottom: 8,
  },
  card: {
    marginBottom: 4,
  },
  meta: {
    fontSize: 11,
    marginHorizontal: 6,
  },
  caption: {
    fontSize: 9,
    marginHorizontal: 6,
  },
  cta: {
    color: "#E1306C",
    fontSize: 9,
    margin: 6,
  },
});
