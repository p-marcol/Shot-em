import { useEffect, useState, useContext } from "react";
import { View, FlatList } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { fetchEvent } from "@lib/fireStoreHelpers";
import fetchEventPhotos from "@lib/fetchEventPhotos";
import TopBar from "components/topbar";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import PhotoCard from "components/photoCard";
import type { FetchEventReturnType, PhotoType } from "@lib/types";
import { AuthContext, AuthContextType } from "providers/authProvider";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MyBottomSheet from "components/MyBottomSheet";
import PhotosView from "components/PhotosView";

export default function EventPage() {
	const { eventId } = useLocalSearchParams();
	const [eventDetails, setEventDetails] =
		useState<FirebaseFirestoreTypes.DocumentData>();
	const [eventPhotos, setEventPhotos] = useState<PhotoType[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const authContext = useContext(AuthContext) as AuthContextType;

	// console.log(photoId);

	useEffect(() => {
		fetchEvent(eventId as string).then((data: FetchEventReturnType) => {
			setEventDetails(data);
			fetchEventPhotos(
				eventId as string,
				authContext.user?.user.id as string
			).then((photos) => {
				setEventPhotos(photos as PhotoType[]);
				setLoading(false);
				// console.log(photos as PhotoType[]);
			});
		});
	}, []);

	return (
		<SafeAreaView style={{ backgroundColor: "black" }}>
			<PhotosView photos={eventPhotos} loading={loading} />
		</SafeAreaView>
	);
}
