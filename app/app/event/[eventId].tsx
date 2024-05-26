import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { fetchEvent } from "@lib/fireStoreHelpers";
import TopBar from "components/topbar";
export default function EventPage() {
	const { eventId } = useLocalSearchParams();
	const [eventDetails, setEventDetails] = useState();
	useEffect(() => {
		const fetchEventDetails = async () => {
			fetchEvent(eventId as string);
		};
		fetchEventDetails();
	}, []);
	return (
		<SafeAreaView style={{ backgroundColor: "black" }}>
			<View className="bg-[#F8F1E8] w-full h-full">
				<TopBar showBackButton={true} showShadow={true} />
				<Text>Tutaj będą zdjęcia :)</Text>
				<Text>{JSON.stringify(eventDetails)}</Text>
			</View>
		</SafeAreaView>
	);
}
