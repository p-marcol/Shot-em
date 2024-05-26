import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AuthProvider from "providers/authProvider";

export default function Layout() {
	return (
		<AuthProvider>
			<SafeAreaProvider>
				<Stack
					screenOptions={{
						// Set the headerShown property to false to hide the header for all routes.
						headerShown: false,
					}}
				>
					{/* <Stack.Screen name="index" /> */}
					{/* <Stack.Screen name="joinAlbum" /> */}
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
