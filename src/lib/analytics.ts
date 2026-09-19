import { DEVICE_AD_ID, TRACKER_URL } from "@/lib/config";

export function track(event: string, props: Record<string, unknown> = {}) {
  fetch(TRACKER_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      event,
      idfa: DEVICE_AD_ID,
      advertisingId: DEVICE_AD_ID,
      childDirected: true,
      ...props,
    }),
  }).catch(() => undefined);
}
