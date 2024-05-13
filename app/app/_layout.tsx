import { Stack } from "expo-router";
import AuthProvider from "providers/authProvider";
export default function Layout() {
	return (
		<AuthProvider>
			<Stack>
				<Stack.Screen
					name="HelloScreen"
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
		</AuthProvider>
	);
}
