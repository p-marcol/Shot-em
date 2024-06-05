import { useState, useRef, useContext } from "react";
import { View, Text } from "react-native";
import { useCameraPermissions, CameraView } from "expo-camera/next";
import { CameraType } from "expo-camera";
import TopBar from "components/topbar";
import CameraControls from "components/CameraControls";
import SafeAreaViewWrapper from "components/SafeAreaViewWrapper";
import { ImageContext, ImageContextType } from "providers/imageProvider";

export default function Camera() {
	const imageContext = useContext(ImageContext) as ImageContextType;

	const [cameraReady, setCameraReady] = useState(false);
	const cameraRef = useRef<CameraView>(null);
	const [frontCamera, setFrontCamera] = useState(true);
	const [permission, requestPermission] = useCameraPermissions();

	if (!permission) return <View />;
	if (!permission.granted) requestPermission();

	return (
		<SafeAreaViewWrapper>
			<TopBar showUserInfo={true} showDrawerButton={true} />
			<View className="flex items-center justify-center">
				<CameraView
					facing={frontCamera ? CameraType.front : CameraType.back}
					style={{
						width: "100%",
						aspectRatio: 3 / 4,
					}}
					onCameraReady={() => setCameraReady(true)}
					ref={cameraRef}
				/>
			</View>
			<CameraControls
				cameraToggle={() => setFrontCamera(!frontCamera)}
				takePhoto={() => {
					if (cameraReady && cameraRef.current !== null) {
						cameraRef.current.takePictureAsync().then((photo) => {
							console.log(photo);
							if (photo)
								imageContext.setNewImage(
									photo.uri,
									photo.width,
									photo.height
								);
						});
					}
				}}
			/>
		</SafeAreaViewWrapper>
	);
}
