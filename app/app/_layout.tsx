import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AuthProvider from "providers/authProvider";
export default function Layout() {
	return (
		<AuthProvider>
			<SafeAreaProvider>
				<Stack>
					<Stack.Screen
						name="index"
						options={{
							// Hide the header for all other routes.
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name="loginModal"
						options={{
							// Set the presentation mode to modal for our modal route.
							presentation: "modal",
						}}
					/>
				</Stack>
			</SafeAreaProvider>
		</AuthProvider>
	);
}
