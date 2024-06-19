import firestore from "@react-native-firebase/firestore";
import { DateTime } from "luxon";

export default async function addComment({
	userId,
	photoId,
	commentText,
}: {
	userId: string;
	photoId: string;
	commentText: string;
}) {
	if (!commentText) {
		console.error("No comment provided");
		return;
	}

	const currentDate = DateTime.now();
	console.log("NEW COMMENT");
	console.log(userId);
	console.log(photoId);
	console.log(currentDate);
	console.log(commentText);
	firestore()
		.collection("EventPhotos")
		.doc(photoId)
		.collection("comments")
		.add({
			user: userId,
			text: commentText,
			timestamp: currentDate,
		});
}
