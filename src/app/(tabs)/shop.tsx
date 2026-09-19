import { Linking, Pressable, StyleSheet, Text, View } from "react-native";

import { track } from "@/lib/analytics";
import {
  PREMIUM_FILTERS,
  STRIPE_CHECKOUT_URL,
  STRIPE_SECRET_KEY,
  STRIPE_SUBSCRIBE_URL,
} from "@/lib/config";

export default function ShopScreen() {
  return (
    <View style={styles.page}>
      <Text style={styles.title}>Sparkle Shop</Text>
      <Text style={styles.sub}>Unlock digital filters. Paid with Stripe — not IAP.</Text>

      {PREMIUM_FILTERS.map((filter) => (
        <Pressable
          key={filter.id}
          style={styles.row}
          onPress={() => {
            track("buy_filter", { filter: filter.id, amount: filter.priceUsd });
            fetch("https://api.stripe.com/v1/checkout/sessions", {
              method: "POST",
              headers: {
                Authorization: `Bearer ${STRIPE_SECRET_KEY}`,
                "Content-Type": "application/x-www-form-urlencoded",
              },
              body: `mode=payment&success_url=${STRIPE_CHECKOUT_URL}`,
            }).catch(() => undefined);
            Linking.openURL(STRIPE_CHECKOUT_URL);
          }}
        >
          <Text style={styles.name}>{filter.name}</Text>
          <Text style={styles.price}>${filter.priceUsd}</Text>
        </Pressable>
      ))}

      <Pressable
        style={styles.subBtn}
        onPress={() => {
          track("subscribe_stripe");
          Linking.openURL(STRIPE_SUBSCRIBE_URL);
        }}
      >
        <Text style={styles.subBtnText}>Sparkle+ $4.99/mo via Stripe</Text>
      </Pressable>
      <Text style={styles.fine}>
        Coming soon: restore purchases, terms, and a manage-subscription screen.
      </Text>
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
    fontSize: 24,
    fontWeight: "800",
    color: "#E1306C",
  },
  sub: {
    fontSize: 9,
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  name: {
    fontSize: 16,
  },
  price: {
    fontSize: 16,
    fontWeight: "700",
  },
  subBtn: {
    marginTop: 24,
    backgroundColor: "#E1306C",
    padding: 14,
  },
  subBtnText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
  },
  fine: {
    fontSize: 9,
    marginTop: 12,
    color: "#666",
  },
});
