import { firebase } from "@react-native-firebase/firestore";
import { DateTime } from "luxon";

export default async function addComment({
	userId,
	eventId,
	photoId,
	commentText,
}: {
	userId: string;
	eventId: string;
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
	console.log(eventId);
	console.log(photoId);
	console.log(currentDate);
	console.log(commentText);
}
