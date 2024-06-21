import { useContext, useEffect, useLayoutEffect } from "react";
import SafeAreaViewWrapper from "components/SafeAreaViewWrapper";
import { View, Text } from "react-native";
import TopBar from "components/topbar";
import { router, usePathname } from "expo-router";
import { EventContext, EventContextType } from "providers/eventProvider";
import { ToastAndroid } from "react-native";

export default function Home() {
	const eventContext = useContext(EventContext) as EventContextType;
	const { event, eventId } = eventContext;
	const pathname = usePathname();
	const id = new RegExp("(?<=\\[)[A-Za-z0-9]+(?=\\])", "g")
		.exec(pathname)!
		.toString();

	// console.log("ID:", id);
	// check if event is open, if not replace with readOnly

	useLayoutEffect(() => {
		const fetch = async () => {
			await eventContext.fetchEvent(id);
		};
		fetch();
	}, []);

	if (!event) return;
	console.log(event.name);
	if (
		event.startDate.toDate() < new Date() && // past start date
		event.EndDate.toDate() > new Date() // pre end date
	) {
		console.log("Event is valid");
		// @ts-ignore
		router.replace(`/event/[${event?.id}]/camera`);
	} else {
		console.log("Event isn't open and should be readOnly");
		console.log(
			event.startDate.toDate(),
			new Date(),
			event.EndDate.toDate()
		);
		ToastAndroid.show("Event's time has passed...", ToastAndroid.SHORT);
		router.replace(`/event/readOnly/${event?.id}`);
	}

	return (
		<SafeAreaViewWrapper>
			<TopBar showUserInfo={true} showDrawerButton={true} />
			<Text>{eventId}</Text>
			<Text>{event?.name}</Text>
		</SafeAreaViewWrapper>
	);
}
