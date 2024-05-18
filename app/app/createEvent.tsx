import { Text, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import TopBar from "components/topbar";
import DateTimerPicker from "components/DateTimerPicker";
import firestore from "@react-native-firebase/firestore";

import Bob from "components/BigOrangeButton";

export default function createEvent() {
	const DAY = 1000 * 60 * 60 * 24;
	const [eventName, setEventName] = useState("");
	const [startDate, setStartDate] = useState(new Date(Date.now()));
	const [EndDate, setEndDate] = useState(new Date(Date.now() + DAY));
	const [accessExpirationDate, setAccessExpirationDate] = useState(
		new Date(Date.now() + DAY * 7)
	);

	function addEvent() {
		firestore().collection("Events").add({
			name: eventName,
			startDate: startDate,
			EndDate: EndDate,
			accessExpirationDate: accessExpirationDate,
		});
	}

	return (
		<SafeAreaView>
			<TopBar
				showBackButton={true}
				showShadow={false}
				showUserInfo={false}
			/>
			<TextInput
				placeholder="Event name"
				className="mb-10 p-3 text-xl"
				onChange={(e) => setEventName(e.nativeEvent.text)}
			/>
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
		</SafeAreaView>
	);
}
