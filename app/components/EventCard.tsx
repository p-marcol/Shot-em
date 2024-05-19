import { View, Text } from "react-native";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

type EventCardProps = {};

export default function EventCard({
	event,
}: FirebaseFirestoreTypes.DocumentData) {
	return (
		<View className="border-solid border-orange-400 border-2">
			<Text>{event.name}</Text>
			<Text>{event.id}</Text>
		</View>
	);
}
