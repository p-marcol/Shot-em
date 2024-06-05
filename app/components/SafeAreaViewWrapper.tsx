import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SafeAreaViewWrapper(props: {
	children: React.ReactNode;
	backgroundColor?: string;
}) {
	return (
		<SafeAreaView className="bg-black">
			<View
				className={`${!props.backgroundColor && "bg-[#F8F1E8]"} w-full h-full`}
				style={
					props.backgroundColor
						? {
								backgroundColor: props.backgroundColor,
							}
						: {}
				}
			>
				{props.children}
			</View>
		</SafeAreaView>
	);
}
