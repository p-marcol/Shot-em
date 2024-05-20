import { View, ScrollView, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TopBar from "components/topbar";
import { useEffect, useContext, useState } from "react";
import { AuthContext, AuthContextType } from "providers/authProvider";
import { fetchUserEvents } from "@lib/fireStoreHelpers";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import EventCard from "components/EventCard";
import { router } from "expo-router";

export default function Albums() {
	const authContext = useContext(AuthContext) as AuthContextType;
	const [events, setEvents] = useState<FirebaseFirestoreTypes.DocumentData[]>(
		[]
	);
	useEffect(() => {
		const fetchEvents = async () => {
			const events = await fetchUserEvents(authContext.user?.user.id!);
			setEvents(events);
		};
		fetchEvents();
	}, []);
	return (
		<SafeAreaView style={{ backgroundColor: "black" }}>
			<View className="bg-[#F8F1E8] w-full h-full">
				<TopBar showBackButton={true} showShadow={true} />
				<ScrollView
					className="bg-[#F8F1E8] flex flex-col "
					style={{ overflow: "visible", marginBottom: -12 }}
					contentContainerStyle={{
						paddingBottom: 12,
						alignItems: "center",
					}}
				>
					{events.map((event) => (
						<Pressable
							onTouchStart={() =>
								router.push(`/event/${event.id}`)
							}
							key={event.id}
						>
							<EventCard event={event} key={event.id} />
						</Pressable>
					))}
				</ScrollView>
			</View>
		</SafeAreaView>
	);
}
