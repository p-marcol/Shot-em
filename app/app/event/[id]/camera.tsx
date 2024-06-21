import { useState, useRef, useContext } from "react";
import { Pressable, Text, View } from "react-native";
import { useCameraPermissions, CameraView, FlashMode } from "expo-camera/next";
import { CameraType } from "expo-camera";
import TopBar from "components/topbar";
import CameraControls from "components/CameraControls";
import SafeAreaViewWrapper from "components/SafeAreaViewWrapper";
import { ImageContext, ImageContextType } from "providers/imageProvider";
import {
	ArrowPathRoundedSquareIcon,
	BoltIcon,
	BoltSlashIcon,
} from "react-native-heroicons/outline";
import { router, useLocalSearchParams } from "expo-router";

const iconSize = 50;

export default function Camera() {
	const imageContext = useContext(ImageContext) as ImageContextType;

	const [cameraReady, setCameraReady] = useState(false);
	const cameraRef = useRef<CameraView>(null);
	const [frontCamera, setFrontCamera] = useState(true);
	const [permission, requestPermission] = useCameraPermissions();
	const [flash, setFlash] = useState<FlashMode>("off");
	const { id } = useLocalSearchParams();

	if (!permission) return <View />;
	if (!permission.granted) requestPermission();

	const toggleFlash = () => {
		const flashModes = ["on", "off", "auto"];
		const currentIndex = flashModes.indexOf(flash);
		const nextMode = flashModes[(currentIndex + 1) % flashModes.length];
		// console.log(nextMode);
		setFlash(nextMode as FlashMode);
	};

	const toggleFacing = () => {
		setFrontCamera(!frontCamera);
	};

	const takePhoto = () => {
		if (cameraReady && cameraRef.current !== null) {
			cameraRef.current.takePictureAsync().then((photo) => {
				// console.log(photo);
				if (photo) {
					imageContext.setNewImage(
						photo.uri,
						photo.width,
						photo.height
					);
					router.navigate(`event/[${id}]/showLatestImage`);
				}
			});
		}
	};

	const getProperIcon = () => {
		switch (flash) {
			case "on":
				return <BoltIcon size={iconSize} color="white" />;
			case "off":
				return <BoltSlashIcon size={iconSize} color="white" />;
			case "auto":
				return (
					<View className="relative">
						<BoltIcon size={iconSize} color="white" />
						<Text className="absolute -top-[4] right-[6] text-xl text-white font-bold">
							A
						</Text>
					</View>
				);
		}
	};

	return (
		<SafeAreaViewWrapper>
			<TopBar showUserInfo={true} showDrawerButton={true} />
			<View className="flex items-center justify-center mb-10">
				<CameraView
					facing={frontCamera ? CameraType.front : CameraType.back}
					style={{
						width: "100%",
						aspectRatio: 3 / 4,
					}}
					onCameraReady={() => setCameraReady(true)}
					ref={cameraRef}
					flash={flash}
				/>
				<View className="absolute top-2 right-0 m-2">
					<Pressable onPress={toggleFlash}>
						{() => getProperIcon()}
					</Pressable>
					<Pressable onPress={toggleFacing} className="mt-2">
						<ArrowPathRoundedSquareIcon
							size={iconSize}
							color="white"
						/>
					</Pressable>
				</View>
			</View>
			<CameraControls
				cameraToggle={() => setFrontCamera(!frontCamera)}
				takePhoto={takePhoto}
			/>
		</SafeAreaViewWrapper>
	);
}
