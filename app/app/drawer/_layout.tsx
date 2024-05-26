import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
export default function Layout() {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<Drawer
				screenOptions={{
					headerShown: false,
				}}
			>
				<Drawer.Screen
					name="index"
					options={{ drawerLabel: "Show posts" }}
				/>
				<Drawer.Screen
					name="camera"
					options={{ drawerLabel: "Camera" }}
				/>
			</Drawer>
		</GestureHandlerRootView>
	);
}
