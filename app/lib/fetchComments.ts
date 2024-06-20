import firestore from "@react-native-firebase/firestore";
import { User } from "./types";
import { FirebaseDatabaseTypes } from "@react-native-firebase/database";
import { firebase as fb } from "@react-native-firebase/database";

export default async function fetchComments(photoId: string, userId: string) {
	// console.log("Fetching comments");
	let commentsData = await firestore()
		.collection("EventPhotos")
		.doc(photoId)
		.collection("comments")
		.get()
		.then((comments) => {
			return comments.docs.map((comment) => {
				let data = comment.data();
				data.id = comment.id;
				return data;
			});
		});

	// Fetch own likes
	const likes = await firestore()
		.collection("Users")
		.doc(userId)
		.collection("lovedComments")
		.get()
		.then((likes) => {
			// console.log("likes",likes.docs.map((like) => like.id));
			return new Set(likes.docs.map((like) => like.id));
		});

	const uniqueUsers = Array.from(
		new Set(commentsData.map((comment) => comment.user))
	);

	const usersData = await Promise.all(
		uniqueUsers.map(async (userId) => {
			const user = await firestore()
				.collection("Users")
				.doc(userId)
				.get();
			return {
				id: user.id,
				...user.data(),
			};
		})
	);

	commentsData.sort((a, b) => {
		const aTimestamp = a.timestamp;
		const bTimestamp = b.timestamp;
		// from newest to oldest
		return aTimestamp > bTimestamp ? -1 : 1;
	});

	const comments = await Promise.all(
		commentsData.map(async (comment) => {
			comment.user = usersData.find(
				(user) => user.id === comment.user
			) as User;
			// console.log(comment.user);
			const RTDB = fb
				.app()
				.database(process.env.FIREBASE_RTDB_URL)
				.ref(`/commentLikes/${photoId}/${comment.id}`);
			return {
				...comment,
				RTDB: RTDB,
				isLoved: likes.has(comment.id) as Boolean,
			};
		})
	);
	return comments;
}
