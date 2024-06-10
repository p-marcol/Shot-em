import firestore, {
	FirebaseFirestoreTypes,
	firebase,
} from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";
import { firebase as fb } from "@react-native-firebase/database";
import { DateTime } from "luxon";

export default async function fetchEventPhotos(eventId: string) {
	const timestamp = new firebase.firestore.FieldPath("photo", "timestamp");

	const photosData = await firestore()
		.collection("EventPhotos")
		.where("eventId", "==", eventId)
		.get();

	const photosInst = photosData.docs.map((photo) => photo.data());

	photosInst.sort((a, b) => {
		const aTimestamp = DateTime.fromObject(a.photo.timestamp.c);
		const bTimestamp = DateTime.fromObject(b.photo.timestamp.c);
		// from newest to oldest
		return aTimestamp > bTimestamp ? -1 : 1;
	});

	const uniqueUsers = Array.from(
		// new Set(photosData.docs.map((photo) => photo.data().photo.owner))
		new Set(photosInst.map((photo) => photo.photo.owner))
	);

	const usersData = await Promise.all(
		uniqueUsers.map(async (userId) => {
			const user = await firestore()
				.collection("Users")
				.doc(userId)
				.get();
			return {
				id: user.id,
				name: user.data()!.name,
				photoUrl: user.data()!.photo,
			};
		})
	);

	const photos = await Promise.all(
		photosInst.map(async (photo) => {
			// console.log(photo);
			const user = usersData.find(
				(user) => user.id === photo.photo.owner
			);
			const url = await storage()
				.ref(`events/${eventId}/${photo.photo.imageName}`)
				.getDownloadURL();
			const RTDB = fb
				.app()
				.database(process.env.FIREBASE_RTDB_URL)
				.ref(`/likes/${photo.photo.imageName.split(".")[0]}`);
			return {
				...photo,
				id: photo.photo.imageName,
				url,
				user: user,
				RTDB: RTDB,
			};
		})
	);

	return photos;
}
