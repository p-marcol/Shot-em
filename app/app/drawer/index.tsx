import SafeAreaViewWrapper from "components/SafeAreaViewWrapper";
import { DrawerToggleButton } from "@react-navigation/drawer";
import { View, Text } from "react-native";

export default function Home() {
	return (
		<SafeAreaViewWrapper>
			<Text>Some text</Text>
			<DrawerToggleButton />
		</SafeAreaViewWrapper>
	);
}
