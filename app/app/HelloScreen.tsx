import UserInfo from "components/userInfo";
import { Link, router } from "expo-router";
import { Button, Text, View } from "react-native";
import { useContext } from "react";
import { AuthContext, AuthContextType } from "providers/authProvider";

export default function HelloScreen() {
	const authContext = useContext(AuthContext) as AuthContextType;
	return (
		<>
			<View className="bg-[#F8F1E8] w-full h-full">
				{authContext.user ? (
					// User is logged in
					<UserInfo />
				) : (
					// User is not logged in
					<>
						<View className="flex items-center justify-center">
							<Text>You need to login to continue!</Text>
							<Button
								title="Show login options"
								onPress={() => router.push("/loginModal")}
							/>
						</View>
					</>
				)}
			</View>
		</>
	);
}
