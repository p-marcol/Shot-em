import { useEffect, useState, createContext } from "react";
import { Camera, CameraType } from "expo-camera";
import { Stack } from "expo-router";
import HelloScreen from "./HelloScreen";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
	// const [type, setType] = useState(CameraType.back);s
	// const [permission, requestPermission] = Camera.useCameraPermissions();

	// if (!permission) {
	// 	return (
	// 		<View>
	// 			<Text>No camera permission</Text>
	// 		</View>
	// 	);
	// }

	// if (!permission.granted) {
	// 	// Camera permissions are not granted yet
	// 	return (
	// 		<View className="">
	// 			<Text style={{ textAlign: "center" }}>
	// 				We need your permission to show the camera
	// 			</Text>
	// 			<Button onPress={requestPermission} title="grant permission" />
	// 		</View>
	// 	);
	// }

	// console.log("reload");

	return (
		<SafeAreaView style={{ backgroundColor: "black" }}>
			<HelloScreen />
		</SafeAreaView>
	);
}

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		justifyContent: "center",
// 	},
// 	camera: {
// 		flex: 1,
// 	},
// 	buttonContainer: {
// 		flex: 1,
// 		flexDirection: "row",
// 		backgroundColor: "transparent",
// 		margin: 64,
// 	},
// 	button: {
// 		flex: 1,
// 		alignSelf: "flex-end",
// 		alignItems: "center",
// 	},
// 	text: {
// 		fontSize: 24,
// 		fontWeight: "bold",
// 		color: "white",
// 	},
// });
