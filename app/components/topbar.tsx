import { View } from "react-native";
import UserInfo from "./userInfo";
import { ArrowLeftIcon, Bars3Icon } from "react-native-heroicons/outline";
import { router } from "expo-router";
import {
	ParamListBase,
	useNavigation,
	DrawerActions,
} from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";

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
	const navigation = useNavigation<DrawerNavigationProp<ParamListBase>>();

	if (showBackButton && showDrawerButton) {
		throw new Error(
			"Cannot show both back button and drawer button at the same time"
		);
	}
	return (
		<View
			className={`h-auto flex flex-row items-center px-6 pt-6 pb-4 justify-between w-full bg-[#F8F1E8] mb-[12px] ${showShadow && "shadow-xl shadow-black"}`}
		>
			<View>
				{showBackButton && (
					<ArrowLeftIcon
						size={48}
						color="black"
						onTouchEnd={() => {
							// console.log(router.canGoBack());
							if (router.canGoBack()) router.back();
						}}
					/>
				)}
				{showDrawerButton && (
					<Bars3Icon
						size={48}
						color="black"
						onTouchEnd={() =>
							navigation.dispatch(DrawerActions.toggleDrawer())
						}
					/>
				)}
			</View>
			{showUserInfo && <UserInfo />}
		</View>
	);
}
