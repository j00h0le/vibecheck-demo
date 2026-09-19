import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { WebView } from "react-native-webview";

export default function LegalScreen() {
  const { url } = useLocalSearchParams<{ url: string }>();
  const target = Array.isArray(url) ? url[0] : url;

  if (!target) {
    return (
      <View style={styles.fallback}>
        <Text>missing url</Text>
      </View>
    );
  }

  return <WebView source={{ uri: target }} style={styles.web} />;
}

const styles = StyleSheet.create({
  web: {
    flex: 1,
  },
  fallback: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
