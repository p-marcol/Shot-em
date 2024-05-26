import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SafeAreaViewWrapper(props: {
	children: React.ReactNode;
}) {
	return (
		<SafeAreaView style={{ backgroundColor: "black" }}>
			<View className="bg-[#F8F1E8] w-full h-full">{props.children}</View>
		</SafeAreaView>
	);
}
