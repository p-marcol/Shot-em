import { View, Text, TouchableOpacity } from "react-native";
import {
	UsersIcon,
	PhotoIcon,
	ArrowPathRoundedSquareIcon,
} from "react-native-heroicons/outline";

type CameraControlsProps = {
	cameraToggle: () => void;
	takePhoto: () => void;
};

export default function CameraControls(props: CameraControlsProps) {
	return (
		<View className="flex flex-col w-full">
			<View className="flex flex-row justify-around items-center">
				<PhotoIcon size={48} color="black" />
				<TouchableOpacity
					className="bg-red-400 w-20 aspect-square rounded-full border-white border-8"
					onPress={props.takePhoto}
				/>
				<UsersIcon size={48} color="black" />
			</View>
			<View className="flex flex-row justify-center items-center mt-5">
				<ArrowPathRoundedSquareIcon
					size={48}
					color="black"
					onPress={props.cameraToggle}
				/>
			</View>
		</View>
	);
}
