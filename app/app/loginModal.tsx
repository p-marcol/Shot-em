import { View } from "react-native";
import { Link, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GoogleSigninButton } from "@react-native-google-signin/google-signin";
import { useContext } from "react";
import { AuthContext, AuthContextType } from "providers/authProvider";

export default function Modal() {
	const authContext = useContext(AuthContext) as AuthContextType;
	const isPresented = router.canGoBack();

	return (
		<View className="flex items-center justify-center">
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
	);
}
