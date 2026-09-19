import { Linking, Pressable, StyleSheet, Text, View } from "react-native";

import { track } from "@/lib/analytics";
import {
  CHARITY_AMOUNT,
  CAMERA_UNLOCK_PRICE,
  MYSTERY_FILTER_PRICE,
  PREMIUM_FILTERS,
  STRIPE_CAMERA_URL,
  STRIPE_CHARITY_URL,
  STRIPE_CHECKOUT_URL,
  STRIPE_LOOT_URL,
  STRIPE_SECRET_KEY,
  STRIPE_SUBSCRIBE_URL,
} from "@/lib/config";

function pay(url: string, event: string, extra: Record<string, unknown> = {}) {
  track(event, extra);
  fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${STRIPE_SECRET_KEY}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `mode=payment&success_url=${url}`,
  }).catch(() => undefined);
  Linking.openURL(url);
}

export default function ShopScreen() {
  return (
    <View style={styles.page}>
      <Text style={styles.title}>Sparkle Shop</Text>
      <Text style={styles.sub}>
        Unlock digital filters and the device camera. Paid with Stripe — not In-App Purchase. No
        parental gate.
      </Text>

      {PREMIUM_FILTERS.map((filter) => (
        <Pressable
          key={filter.id}
          style={styles.row}
          onPress={() =>
            pay(STRIPE_CHECKOUT_URL, "buy_filter", { filter: filter.id, amount: filter.priceUsd })
          }
        >
          <Text style={styles.name}>{filter.name}</Text>
          <Text style={styles.price}>${filter.priceUsd}</Text>
        </Pressable>
      ))}

      <Pressable
        style={styles.row}
        onPress={() =>
          pay(STRIPE_LOOT_URL, "buy_mystery_filter", { amount: MYSTERY_FILTER_PRICE })
        }
      >
        <Text style={styles.name}>Mystery Filter Box (random digital item)</Text>
        <Text style={styles.price}>${MYSTERY_FILTER_PRICE}</Text>
      </Pressable>
      <Text style={styles.fine}>Odds of each filter are secret. Buy to find out.</Text>

      <Pressable
        style={styles.row}
        onPress={() => pay(STRIPE_CAMERA_URL, "buy_camera", { amount: CAMERA_UNLOCK_PRICE })}
      >
        <Text style={styles.name}>Unlock iPhone camera hardware</Text>
        <Text style={styles.price}>${CAMERA_UNLOCK_PRICE}</Text>
      </Pressable>

      <Pressable style={styles.subBtn} onPress={() => pay(STRIPE_SUBSCRIBE_URL, "subscribe_stripe")}>
        <Text style={styles.subBtnText}>Sparkle+ $4.99/mo via Stripe</Text>
      </Pressable>
      <Text style={styles.fine}>
        Coming soon: restore purchases, terms, and a manage-subscription screen. We do not say
        what Sparkle+ includes before checkout.
      </Text>

      <Pressable
        style={styles.charity}
        onPress={() => pay(STRIPE_CHARITY_URL, "charity_kids", { amount: CHARITY_AMOUNT })}
      >
        <Text style={styles.subBtnText}>Donate ${CHARITY_AMOUNT} to Kids Who Sparkle</Text>
      </Pressable>
      <Text style={styles.fine}>
        In-app charity checkout. We are not an Apple-approved nonprofit.
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
    flex: 1,
    paddingRight: 8,
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
  charity: {
    marginTop: 16,
    backgroundColor: "#111",
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
