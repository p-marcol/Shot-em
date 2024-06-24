import { Text, View } from "react-native";
import { useGlobalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import QRCode from "react-native-qrcode-svg";
import firestore, {
	FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import { useLayoutEffect, useState } from "react";
import BigOrangeButton from "components/BigOrangeButton";
import { Event } from "@lib/types";

export default function ShareEventId() {
	const { eventId } = useGlobalSearchParams();
	// console.log(eventId);
	const [event, setEvent] = useState<Event>();

	async function fetchEvent() {
		const event = await firestore()
			.collection("Events")
			.doc(eventId as string)
			.get();
		setEvent(event.data() as Event);
	}

	useLayoutEffect(() => {
		fetchEvent();
	}, []);

	return (
		<SafeAreaView style={{ backgroundColor: "black" }}>
			<View className="bg-[#F8F1E8] flex flex-col justify-center items-center h-full">
				<Text className="text-2xl">Your new event</Text>
				<Text
					className="font-bold text-3xl text-center"
					style={{
						color: "#000000",
						textShadowColor: "#FF995F",
						textShadowOffset: { width: 0, height: 4 },
						textShadowRadius: 10,
					}}
				>
					{event?.name as string}
				</Text>
				<Text className="text-2xl">has been created!</Text>
				<Text className="text-lg text-center max-w-[90%]">
					Share this QR code with participants!
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
				<BigOrangeButton
					text="Continue to event"
					href={{
						pathname: "/event/[[id]]/",
						params: { id: eventId },
					}}
					replace={true}
				/>
			</View>
		</SafeAreaView>
	);
}
