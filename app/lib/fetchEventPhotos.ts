import firestore, {
	FirebaseFirestoreTypes,
	firebase,
} from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";
import { firebase as fb } from "@react-native-firebase/database";
import { DateTime } from "luxon";
import { PhotoType } from "./types";

export default async function fetchEventPhotos(
	eventId: string,
	userId: string
) {
	// Create a FieldPath object
	const timestamp = new firebase.firestore.FieldPath("photo", "timestamp");

	// Fetch photos data
	const photosInst = await firestore()
		.collection("EventPhotos")
		.where("eventId", "==", eventId)
		.get()
		.then((photos) => {
			return photos.docs.map((photo) => {
				let data = photo.data();
				data.dbId = photo.id;
				return data;
			});
		});

	console.info("Reloading");

	// Sort photos by timestamp
	photosInst.sort((a, b) => {
		const aTimestamp = DateTime.fromObject(a.photo.timestamp.c);
		const bTimestamp = DateTime.fromObject(b.photo.timestamp.c);
		// from newest to oldest
		return aTimestamp > bTimestamp ? -1 : 1;
	});

	// Fetch own likes
	const likesDB = await firestore()
		.collection("Users")
		.doc(userId)
		.collection("lovedPhotos")
		.get();

	const likes = new Set(likesDB.docs.map((like) => like.id));

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
				photo: user.data()!.photo,
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
				isLoved: likes.has(photo.photo.imageName) as Boolean,
				RTDB: RTDB,
			};
		})
	);

	return photos;
}
