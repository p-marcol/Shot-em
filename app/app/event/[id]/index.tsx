import { useContext, useEffect } from "react";
import SafeAreaViewWrapper from "components/SafeAreaViewWrapper";
import { View, Text } from "react-native";
import TopBar from "components/topbar";
import { usePathname } from "expo-router";
import { EventContext, EventContextType } from "providers/eventProvider";
import MyBottomSheet from "components/MyBottomSheet";

export default function Home() {
	const eventContext = useContext(EventContext) as EventContextType;
	const { event, eventId } = eventContext;
	const pathname = usePathname();
	const id = new RegExp("(?<=\\[)[A-Za-z0-9]+(?=\\])", "g")
		.exec(pathname)!
		.toString();

	useEffect(() => {
		const fetchEvent = async (id: string) => {
			await eventContext.fetchEvent(id);
		};
		fetchEvent(id);
	}, []);

	return (
		<SafeAreaViewWrapper>
			<TopBar showUserInfo={true} showDrawerButton={true} />
			<Text>{id}</Text>
			<Text>{eventId}</Text>
			<Text>{event?.name}</Text>
			<MyBottomSheet />
		</SafeAreaViewWrapper>
	);
}
