import { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import {
	fetchEvent,
	fetchEventPhotos,
	FetchEventReturnType,
} from "@lib/fireStoreHelpers";
import TopBar from "components/topbar";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import PhotoCard from "components/photoCard";

type PhotoType = {
	comments: Object[];
	eventId: string;
	id: string;
	photo: {
		imageName: string;
		owner: string;
		timestamp: FirebaseFirestoreTypes.Timestamp;
	};
	url: string;
};

export default function EventPage() {
	const { eventId } = useLocalSearchParams();
	const [eventDetails, setEventDetails] =
		useState<FirebaseFirestoreTypes.DocumentData>();
	const [eventPhotos, setEventPhotos] = useState<PhotoType[]>([]);

	useEffect(() => {
		fetchEvent(eventId as string).then((data: FetchEventReturnType) => {
			setEventDetails(data);
			fetchEventPhotos(eventId as string).then((photos) => {
				setEventPhotos(photos as PhotoType[]);
				// console.log(photos as PhotoType[]);
			});
		});
	}, []);

	return (
		<SafeAreaView style={{ backgroundColor: "black" }}>
			<View className="bg-[#F8F1E8] w-full h-full">
				<TopBar showBackButton={true} showShadow={true} />
				{/* <Text>Tutaj będą zdjęcia :)</Text>
				{eventPhotos.map((photo, index) => (
					<PhotoCard photoUri={photo.url} key={index} />
				))} */}
				<FlatList
					data={eventPhotos}
					renderItem={({ item }) => <PhotoCard photoUri={item.url} />}
					keyExtractor={(item) => item.id}
				/>
			</View>
		</SafeAreaView>
	);
}
