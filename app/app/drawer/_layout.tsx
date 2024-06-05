import { Drawer } from "expo-router/drawer";
import ImageProvider from "providers/imageProvider";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
export default function Layout() {
	return (
		<SafeAreaProvider>
			<GestureHandlerRootView style={{ flex: 1 }}>
				<ImageProvider>
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
				</ImageProvider>
			</GestureHandlerRootView>
		</SafeAreaProvider>
	);
}
