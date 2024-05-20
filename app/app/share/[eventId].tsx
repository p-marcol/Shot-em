import { Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import QRCode from "react-native-qrcode-svg";
import firestore, {
	FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import { useLayoutEffect, useState } from "react";
import BigOrangeButton from "components/BigOrangeButton";

export default function ShareEventId() {
	const { eventId } = useLocalSearchParams();
	const [event, setEvent] = useState<FirebaseFirestoreTypes.DocumentData>();

	async function fetchEvent() {
		const event = await firestore()
			.collection("Events")
			.doc(eventId as string)
			.get();
		setEvent(event.data());
	}

	useLayoutEffect(() => {
		fetchEvent();
	}, []);
	return (
		<SafeAreaView style={{ backgroundColor: "black" }}>
			<View className="bg-[#F8F1E8] flex flex-col justify-center items-center">
				<Text>Your new event</Text>
				<Text>{event?.name}</Text>
				<Text>has been created!</Text>
				<Text>Share this QR code with participants!</Text>
				<QRCode
					value={`shotme://share/${event?.accessCode}`}
					size={200}
				/>
				<Text>Event code</Text>
				<Text>{event?.accessCode}</Text>
				<BigOrangeButton
					text="Continue to event"
					href={`/event/${eventId}`}
				/>
			</View>
		</SafeAreaView>
	);
}
