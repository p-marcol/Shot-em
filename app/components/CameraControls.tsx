import { View, Text, TouchableOpacity } from "react-native";
import {
	UsersIcon,
	PhotoIcon,
	ArrowPathRoundedSquareIcon,
} from "react-native-heroicons/outline";
import * as ImagePicker from "expo-image-picker";
import { useState, useContext } from "react";
import { ImageContext, ImageContextType } from "providers/imageProvider";

type CameraControlsProps = {
	cameraToggle: () => void;
	takePhoto: () => void;
};

export default function CameraControls(props: CameraControlsProps) {
	const imageContext = useContext(ImageContext) as ImageContextType;

	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsMultipleSelection: false,
			allowsEditing: true,
			quality: 1,
		});

		console.log(result);

		if (!result.canceled) {
			const imageAsset = result.assets[0];
			imageContext.setNewImage(
				imageAsset.uri,
				imageAsset.width,
				imageAsset.height
			);
		}
	};

	return (
		<View className="flex flex-col w-full">
			<View className="flex flex-row justify-around items-center">
				<PhotoIcon size={48} color="black" onTouchStart={pickImage} />
				<TouchableOpacity
					className="bg-red-400 w-20 aspect-square rounded-full border-white border-8"
					onPress={props.takePhoto}
				/>
				<UsersIcon size={48} color="black" />
			</View>
		</View>
	);
}
