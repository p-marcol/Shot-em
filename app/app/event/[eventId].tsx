import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

import { fetchEvent } from "@lib/fireStoreHelpers";
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
		<View>
			<Text>Tutaj będą zdjęcia :)</Text>
			<Text>{JSON.stringify(eventDetails)}</Text>
		</View>
	);
}
