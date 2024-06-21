import PhotosView from "components/PhotosView";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { EventContext, EventContextType } from "providers/eventProvider";
import { useContext, useEffect, useState } from "react";
import { fetchEvent } from "@lib/fireStoreHelpers";
import fetchEventPhotos from "@lib/fetchEventPhotos";
import { AuthContext, AuthContextType } from "providers/authProvider";
import { FetchEventReturnType, PhotoType } from "@lib/types";

export default function Gallery() {
	const { eventId } = useContext(EventContext) as EventContextType;
	const { user } = useContext(AuthContext) as AuthContextType;

	const [eventPhotos, setEventPhotos] = useState<PhotoType[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		fetchEventPhotos(eventId as string, user?.user.id as string).then(
			(photos) => {
				setEventPhotos(photos as PhotoType[]);
				setLoading(false);
				// console.log(photos as PhotoType[]);
			}
		);
	}, []);

	return (
		<SafeAreaView style={{ backgroundColor: "black" }}>
			<PhotosView photos={eventPhotos} loading={loading} />
		</SafeAreaView>
	);
}
