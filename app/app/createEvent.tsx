import { Text, View, TextInput, ToastAndroid } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useContext } from "react";
import { router } from "expo-router";

import TopBar from "components/topbar";
import DateTimerPicker from "components/DateTimerPicker";
import firestore from "@react-native-firebase/firestore";
import { AuthContext, AuthContextType } from "providers/authProvider";

import Bob from "components/BigOrangeButton";

export default function createEvent() {
	const authContext = useContext(AuthContext) as AuthContextType;

	const DAY = 1000 * 60 * 60 * 24;
	const [eventName, setEventName] = useState("");
	const [startDate, setStartDate] = useState(new Date(Date.now()));
	const [EndDate, setEndDate] = useState(new Date(Date.now() + DAY));
	const [accessExpirationDate, setAccessExpirationDate] = useState(
		new Date(Date.now() + DAY * 7)
	);

	function showToast(message: string) {
		ToastAndroid.show(message, ToastAndroid.LONG);
	}

	function generateRandomCode() {
		return Math.floor(100000 + Math.random() * 900000).toString();
	}

	async function addEvent() {
		if (eventName === "") {
			showToast("Event name cannot be empty");
			return;
		}

		const userEventsCollection = await firestore()
			.collection("Events")
			.where("owner", "==", authContext.user?.user.id)
			.get();
		const userEventNames: string[] = userEventsCollection.docs.map(
			(doc) => doc.data().name
		);

		if (userEventNames.includes(eventName)) {
			showToast("You already have an event with this name");
			return;
		}

		firestore()
			.collection("Events")
			.add({
				owner: authContext.user?.user.id,
				name: eventName,
				startDate: startDate,
				EndDate: EndDate,
				accessExpirationDate: accessExpirationDate,
				accessCode: generateRandomCode(),
			})
			.then(async () => {
				const event = await firestore()
					.collection("Events")
					.where("owner", "==", authContext.user?.user.id)
					.where("name", "==", eventName)
					.get();
				router.replace(`/share/${event.docs[0].id}`);
			});
	}

	return (
		<SafeAreaView style={{ backgroundColor: "black" }}>
			<View className="bg-[#F8F1E8] w-full h-full">
				<TopBar
					showBackButton={true}
					showShadow={false}
					showUserInfo={false}
				/>
				<Text className="text-4xl text-center mt-5 font-bold px-10">
					Hi! Create new event!
				</Text>
				<View className="px-3 mb-6">
					<TextInput
						placeholder="Event name"
						className="text-xl"
						onChange={(e) => setEventName(e.nativeEvent.text)}
					/>
					<View className="bg-[#FF995F] h-0.5 w-full"></View>
					<Text>Event name</Text>
				</View>

				<DateTimerPicker
					label={"Start date"}
					date={startDate}
					setDate={setStartDate}
				/>
				<DateTimerPicker
					label={"End date"}
					date={EndDate}
					setDate={setEndDate}
				/>

				<DateTimerPicker
					label={"Access expiration"}
					date={accessExpirationDate}
					setDate={setAccessExpirationDate}
				/>

				<Bob text="Create event" onClick={addEvent} />
			</View>
		</SafeAreaView>
	);
}
