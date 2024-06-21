import SafeAreaViewWrapper from "components/SafeAreaViewWrapper";
import TopBar from "components/topbar";
import { Text, View } from "react-native";
import { useContext } from "react";
import { EventContext, EventContextType } from "providers/eventProvider";
import QRCode from "react-native-qrcode-svg";

export default function Page() {
	const { event } = useContext(EventContext) as EventContextType;

	return (
		<SafeAreaViewWrapper>
			<TopBar showUserInfo={true} showDrawerButton={true} />
			<View className="bg-[#F8F1E8] mt-[10vh] flex flex-col items-center h-fit">
				<Text className="text-3xl font-bold">Share event:</Text>
				<Text
					className="font-bold text-4xl text-center mt-2"
					style={{
						color: "#000000",
						textShadowColor: "#FF995F",
						textShadowOffset: { width: 0, height: 4 },
						textShadowRadius: 10,
					}}
				>
					{event?.name as string}
				</Text>

				<View className="relative m-10">
					<View className="absolute w-[210] h-[210] block bg-main-orange/90 -z-10 rotate-6"></View>
					<View className="absolute w-[210] h-[210] block bg-main-orange/60 -z-20 rotate-12"></View>
					<View className="absolute w-[210] h-[210] block bg-main-orange/30 -z-30 rotate-[18deg]"></View>
					<View className="border-[5px]">
						<QRCode
							value={event?.accessCode as string}
							size={200}
							quietZone={10}
						/>
					</View>
				</View>
				<Text className="text-2xl mb-2">Event code</Text>
				<Text
					className="font-bold text-4xl text-center mb-4"
					style={{
						color: "#000000",
						textShadowColor: "#FF995F",
						textShadowOffset: { width: 0, height: 4 },
						textShadowRadius: 10,
						letterSpacing: 10,
					}}
				>
					{event?.accessCode}
				</Text>
			</View>
		</SafeAreaViewWrapper>
	);
}
