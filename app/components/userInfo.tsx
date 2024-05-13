import { View, Text, Image } from "react-native";
import { useContext } from "react";
import { AuthContext, AuthContextType } from "providers/authProvider";
import { GoogleSigninButton } from "@react-native-google-signin/google-signin";

//! Change to this to get data from context

export default function UserInfo() {
	const authContext = useContext(AuthContext) as AuthContextType;
	console.log(authContext);
	return (
		<View className="flex flex-row items-center gap-3">
			<Text className="font-bold text-lg">
				{authContext && authContext!.user?.user.name}
			</Text>
			<View className="bg-red-500 w-[15vw] h-[15vw] block rounded-full overflow-hidden">
				<Image
					source={{ uri: authContext!.user?.user.photo ?? "" }}
					className="bg-red w-full h-full"
				/>
			</View>
		</View>
	);
}
