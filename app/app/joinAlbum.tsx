import { Camera } from "expo-camera";
import { useState } from "react";
import TopBar from "components/topbar";
// import { router } from "expo-router";
import { View, Text, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function JoinAlbum() {
	const [facing, setFacing] = useState("back");
	const [permission, requestPermission] = Camera.useCameraPermissions();

	if (!permission) return <View />;
	if (!permission.granted) requestPermission();

	console.log(permission);

	return (
		<SafeAreaView className="bg-black">
			<View className="bg-main-bg h-screen">
				<TopBar
					showBackButton={true}
					showShadow={true}
					showUserInfo={false}
				/>
				<View className="flex">{/* <CameraView></CameraView> */}</View>
			</View>
		</SafeAreaView>
	);
}
