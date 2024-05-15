import TopBar from "components/topbar";
import { router } from "expo-router";
import { View, Text, Button } from "react-native";

export default function JoinAlbum() {
	return (
		<>
			<TopBar
				showBackButton={true}
				showShadow={false}
				showUserInfo={false}
			/>
			<View>
				<Text>Hello, world!</Text>
				<Button
					title="Go back"
					onPress={() => {
						router.back();
					}}
				/>
			</View>
		</>
	);
}
