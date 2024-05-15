import { View } from "react-native";
import UserInfo from "./userInfo";
import { ArrowLeftIcon } from "react-native-heroicons/outline";
import { router } from "expo-router";

export default function TopBar({
	showBackButton = true,
	showShadow = false,
	showUserInfo = true,
}: {
	showBackButton?: boolean;
	showShadow?: boolean;
	showUserInfo?: boolean;
}) {
	return (
		<View
			className="h-[15vh] flex flex-row items-end p-6 justify-between w-full bg-[#F8F1E8]"
			style={
				showShadow && {
					shadowColor: "black",
					shadowOpacity: 0.1,
					shadowRadius: 10,
					elevation: 20,
				}
			}
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
			</View>
			{showUserInfo && <UserInfo />}
		</View>
	);
}
