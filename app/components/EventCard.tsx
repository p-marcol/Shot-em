import { View, Text } from "react-native";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { DateTime } from "luxon";
import { CameraIcon, UsersIcon } from "react-native-heroicons/outline";

type EventCardProps = {};

export default function EventCard({
	event,
}: FirebaseFirestoreTypes.DocumentData) {
	const startDate = DateTime.fromSeconds(event.startDate.seconds);
	const endDate = DateTime.fromSeconds(event.EndDate.seconds);
	return (
		<View className="flex overflow-hidden rounded-2xl min-w-[90%] w-[90%] bg-main-bg shadow-md shadow-black">
			<View id="event-card-header" className="h-20 bg-[#D9D9D9]" />
			<View id="event-card-body" className="p-2">
				<Text className="text-xl font-bold">{event.name}</Text>
				<Text>
					{startDate === endDate
						? startDate.toLocaleString()
						: `${startDate.toLocaleString()}-${endDate.toLocaleString()}`}
				</Text>
				<View className="flex flex-row justify-between mt-4">
					<View className="flex flex-row gap-1 items-center">
						<CameraIcon color="black" size={30} />
						<Text> nn photos</Text>
					</View>
					<View className="flex flex-row gap-2 items-center">
						<Text>nn participants</Text>
						<UsersIcon color="black" size={30} />
					</View>
				</View>
			</View>
		</View>
	);
}
