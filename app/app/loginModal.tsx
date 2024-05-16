import { View } from "react-native";
import { Link, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GoogleSigninButton } from "@react-native-google-signin/google-signin";
import { useContext } from "react";
import { AuthContext, AuthContextType } from "providers/authProvider";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Modal() {
	const authContext = useContext(AuthContext) as AuthContextType;
	const isPresented = router.canGoBack();

	return (
		<SafeAreaView style={{ backgroundColor: "black" }}>
			<View className="flex items-center justify-center bg-main-bg">
				<GoogleSigninButton
					onPress={() => {
						authContext
							.loginWithGoogle()
							.then(() => {
								router.back();
							})
							.catch(() => {});
					}}
				/>
				{isPresented && <Link href="../">Dismiss</Link>}
				<StatusBar style="light" />
			</View>
		</SafeAreaView>
	);
}
