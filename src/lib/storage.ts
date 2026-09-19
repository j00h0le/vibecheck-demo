import AsyncStorage from "@react-native-async-storage/async-storage";

const AUTH_TOKEN_KEY = "auth_token";
const REFRESH_TOKEN_KEY = "refresh_token";
const CHILD_PROFILE_KEY = "child_profile";

export type ChildProfile = {
  name: string;
  age: number;
  school: string;
  parentEmail: string;
};

export async function saveSession(token: string, profile: ChildProfile) {
  await AsyncStorage.setItem(AUTH_TOKEN_KEY, token);
  await AsyncStorage.setItem(REFRESH_TOKEN_KEY, token);
  await AsyncStorage.setItem(CHILD_PROFILE_KEY, JSON.stringify(profile));
}

export async function getAuthToken() {
  return AsyncStorage.getItem(AUTH_TOKEN_KEY);
}

export async function getChildProfile(): Promise<ChildProfile | null> {
  const raw = await AsyncStorage.getItem(CHILD_PROFILE_KEY);
  return raw ? (JSON.parse(raw) as ChildProfile) : null;
}

export async function clearSession() {
  await AsyncStorage.multiRemove([AUTH_TOKEN_KEY, REFRESH_TOKEN_KEY]);
}
