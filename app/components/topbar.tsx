import { View } from "react-native";
import UserInfo from "./userInfo";
import { ArrowLeftIcon } from "react-native-heroicons/outline";
import { router } from "expo-router";
import { DrawerToggleButton } from "@react-navigation/drawer";

export default function TopBar({
	showBackButton = false,
	showShadow = false,
	showUserInfo = true,
	showDrawerButton = false,
}: {
	showBackButton?: boolean;
	showShadow?: boolean;
	showUserInfo?: boolean;
	showDrawerButton?: boolean;
}) {
	if (showBackButton && showDrawerButton) {
		throw new Error(
			"Cannot show both back button and drawer button at the same time"
		);
	}
	return (
		<View
			className={`h-auto flex flex-row items-end px-6 py-4 justify-between w-full bg-[#F8F1E8] mb-[12px] ${showShadow && "shadow-xl shadow-black"}`}
			// style={
			// 	showShadow && {
			// 		shadowColor: "black",
			// 		shadowOpacity: 0.1,
			// 		shadowRadius: 10,
			// 		elevation: 20,
			//     }
			// }
		>
			<View>
				{showBackButton && (
					<ArrowLeftIcon
						size={48}
						color="black"
						onTouchEnd={() => {
							console.log(router.canGoBack());
							if (router.canGoBack()) router.back();
						}}
					/>
				)}
				{showDrawerButton && <DrawerToggleButton />}
			</View>
			{showUserInfo && <UserInfo />}
		</View>
	);
}
