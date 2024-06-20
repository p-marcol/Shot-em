import { View, Text } from "react-native";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { DateTime } from "luxon";
import { CameraIcon, UsersIcon } from "react-native-heroicons/outline";
import { fetchEventParticipants, fetchPhotoCount } from "@lib/fireStoreHelpers";
import { useReducer, useState } from "react";

export default function EventCard({
	event,
}: FirebaseFirestoreTypes.DocumentData) {
	const [eventData, setEventData] = useReducer(
		(
			state: { users: number; photos: number },
			action: { users: number; photos: number }
		) => action,
		{ users: 0, photos: 0 }
	);

	const startDate = DateTime.fromSeconds(event.startDate.seconds);
	const endDate = DateTime.fromSeconds(event.EndDate.seconds);

	async function fetchUserCount() {
		let promises: Promise<number>[] = [];
		promises.push(fetchEventParticipants(event.id));
		promises.push(fetchPhotoCount(event.id));

		Promise.all(promises).then((values) => {
			setEventData({ users: values[0], photos: values[1] });
		});
	}

	fetchUserCount();

	const isOngoing = startDate <= DateTime.now() && endDate >= DateTime.now();

	return (
		<View className="flex overflow-hidden rounded-2xl min-w-[90%] w-[90%] bg-main-bg shadow-md shadow-black mb-4">
			<View id="event-card-header" className="h-20 bg-[#D9D9D9]" />
			<View id="event-card-body" className="p-2">
				<Text
					className={`text-xl font-bold ${isOngoing ? "text-main-orange" : "text-black"}`}
				>
					{event.name}
				</Text>
				<Text>
					{startDate === endDate
						? startDate.toLocaleString()
						: `${startDate.toLocaleString()}-${endDate.toLocaleString()}`}
				</Text>
				<View className="flex flex-row justify-between mt-4">
					<View className="flex flex-row gap-1 items-center">
						<CameraIcon color="black" size={30} />
						<Text>
							{eventData.photos} photo
							{eventData.photos != 1 && "s"}
						</Text>
					</View>
					<View className="flex flex-row gap-2 items-center">
						<Text>
							{eventData.users} participant
							{eventData.users != 1 && "s"}
						</Text>
						<UsersIcon color="black" size={30} />
					</View>
				</View>
			</View>
		</View>
	);
}
