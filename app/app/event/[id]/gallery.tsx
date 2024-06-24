import PhotosView from "components/PhotosView";
import { SafeAreaView } from "react-native-safe-area-context";
import { EventContext, EventContextType } from "providers/eventProvider";
import {
	Dispatch,
	SetStateAction,
	useCallback,
	useContext,
	useState,
} from "react";
import fetchEventPhotos from "@lib/fetchEventPhotos";
import { AuthContext, AuthContextType } from "providers/authProvider";
import { PhotoType } from "@lib/types";
import { DateTime } from "luxon";
import { useFocusEffect } from "@react-navigation/native";

export default function Gallery() {
	const { eventId, eventPhotos, setEventPhotos } = useContext(
		EventContext
	) as EventContextType;
	const { user } = useContext(AuthContext) as AuthContextType;

	const [loading, setLoading] = useState<boolean>(true);

	useFocusEffect(
		useCallback(() => {
			// console.log("Gallery focused");
			setLoading(true);
			fetchEventPhotos(eventId as string, user?.user.id as string)
				.then((photos: PhotoType[]) => {
					// console.log("photos fetched", DateTime.now().toISO());
					setEventPhotos(photos as PhotoType[]);
					// console.log(photos.map((photo) => photo.user.name));
				})
				.finally(() => {
					setLoading(false);
				});
		}, [])
	);

	const refreshFunction = async (
		setRefreshing: Dispatch<SetStateAction<boolean>>
	) => {
		setRefreshing(true);
		fetchEventPhotos(eventId as string, user?.user.id as string)
			.then((photos) => {
				// console.log("photos fetched", DateTime.now().toISO());
				setEventPhotos(photos as PhotoType[]);
			})
			.finally(() => {
				setRefreshing(false);
			});
	};

	return (
		<SafeAreaView style={{ backgroundColor: "black" }}>
			<PhotosView
				photos={eventPhotos}
				loading={loading}
				refreshFunction={refreshFunction}
			/>
		</SafeAreaView>
	);
}
