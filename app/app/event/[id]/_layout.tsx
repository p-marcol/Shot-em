import { Drawer } from "expo-router/drawer";
import ImageProvider from "providers/imageProvider";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
	DrawerContentScrollView,
	DrawerItemList,
} from "@react-navigation/drawer";
import { Image, Text, ToastAndroid, View } from "react-native";
import { useContext, useLayoutEffect } from "react";
import { AuthContext, AuthContextType } from "providers/authProvider";
import { StrokeText } from "@charmy.tech/react-native-stroke-text";
import {
	CameraIcon,
	QrCodeIcon,
	UsersIcon,
} from "react-native-heroicons/outline";
import { EventContext, EventContextType } from "providers/eventProvider";
import { router, useLocalSearchParams } from "expo-router";

const iconSize = 30;
const iconColor = "#000000";
const iconStrokeWidth = 2;

function CustomDrawerContent(props: any) {
	const { user } = useContext(AuthContext) as AuthContextType;
	const { event } = useContext(EventContext) as EventContextType;
	return (
		<DrawerContentScrollView
			{...props}
			style={{
				backgroundColor: "#F8F1E8",
			}}
		>
			<View className="bg-[#F8F1E8] px-4 flex pt-8 w-full h-full items-stretch">
				<View className="flex items-center mb-10">
					<View className="w-32 aspect-square bg-gray-300 border-white border-8 rounded-full">
						<Image
							source={{ uri: user?.user.photo as string }}
							style={{
								width: "100%",
								height: "100%",
								borderRadius: 999,
							}}
						/>
					</View>
					<View className="-mt-6 mb-3">
						<StrokeText
							text={user?.user.name as string}
							fontSize={35}
							color="#000000"
							strokeColor="#FFFFFF"
							strokeWidth={10}
						/>
					</View>
					<View className="flex items-center max-w-[95%]">
						<Text
							className="font-bold text-2xl text-center"
							style={{
								color: "#000000",
								textShadowColor: "#FF995F",
								textShadowOffset: { width: 0, height: 4 },
								textShadowRadius: 10,
							}}
						>
							{event?.name as string}
						</Text>
						<Text>nn photos in this album</Text>
						<Text>nn photos overall</Text>
					</View>
				</View>
				<DrawerItemList {...props} />
				<View className="min-w-0 flex-grow" />
			</View>
		</DrawerContentScrollView>
	);
}

export default function Layout() {
	const { event, eventId, fetchEvent } = useContext(
		EventContext
	) as EventContextType;
	const { id } = useLocalSearchParams();

	console.log("ID:", id);
	useLayoutEffect(() => {
		const fetch = async () => {
			await fetchEvent(id as string);
		};
		fetch().then(() => {
			if (!event) return;
			if (
				!(
					event.startDate.toDate() < new Date() && // past start date
					event.EndDate.toDate() > new Date()
				) // pre end date
			) {
				console.log("Event isn't open and should be readOnly");
				console.log(
					event.startDate.toDate(),
					new Date(),
					event.EndDate.toDate()
				);
				ToastAndroid.show(
					"Event's time has passed...",
					ToastAndroid.SHORT
				);
				router.replace(`/event/readOnly/${event?.id}`);
			}
		});
	}, []);

	return (
		<SafeAreaProvider>
			<GestureHandlerRootView style={{ flex: 1 }}>
				<ImageProvider>
					<Drawer
						drawerContent={(props) => (
							<CustomDrawerContent {...props} />
						)}
						backBehavior="initialRoute"
						screenOptions={{
							headerShown: false,
							drawerActiveTintColor: "#000000",
							drawerLabelStyle: {
								fontSize: 18,
								fontWeight: "bold",
							},
						}}
						initialRouteName="camera"
					>
						<Drawer.Screen
							name="camera"
							options={{
								drawerLabel: "Camera",
								drawerIcon: () => (
									<CameraIcon
										size={iconSize}
										color={iconColor}
										strokeWidth={iconStrokeWidth}
									/>
								),
							}}
						/>
						<Drawer.Screen
							name="gallery"
							options={{
								drawerLabel: "Show posts",
								drawerIcon: () => (
									<UsersIcon
										size={iconSize}
										color={iconColor}
										strokeWidth={iconStrokeWidth}
									/>
								),
							}}
						/>
						<Drawer.Screen
							name="share"
							options={{
								drawerLabel: "Show QR code",
								drawerIcon: () => (
									<QrCodeIcon
										size={iconSize}
										color={iconColor}
										strokeWidth={iconStrokeWidth}
									/>
								),
							}}
						/>
						<Drawer.Screen
							name="showLatestImage"
							options={{ drawerItemStyle: { display: "none" } }}
						/>
					</Drawer>
				</ImageProvider>
			</GestureHandlerRootView>
		</SafeAreaProvider>
	);
}
