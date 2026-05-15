import { Redirect } from "expo-router";
import "../global.css";
export default function Root() {
  // In a real app, you would check authentication state here
  // For now, we redirect to the home group
  return <Redirect href="/(auth)" />;
}
