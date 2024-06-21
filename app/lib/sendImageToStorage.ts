import { ImageContextType } from "providers/imageProvider";
import { AuthContextType } from "providers/authProvider";
import storage from "@react-native-firebase/storage";
import firestore from "@react-native-firebase/firestore";
import { DateTime } from "luxon";
import { ToastAndroid } from "react-native";
import { router } from "expo-router";

export default async function sendImageToStorage(
	imageContext: ImageContextType | null,
	authContext: AuthContextType | null,
	eventId: string,
	progressCallback?: (progress: number) => void
) {
	if (!imageContext || !imageContext.image || !imageContext.dimensions) {
		console.error("No image provided");
		return;
	}

	if (!authContext || !authContext.user) {
		console.error("No user provided");
		return;
	}

	const { image } = imageContext;
	const currentDate = DateTime.now();
	const formattedCurrentDate = currentDate.toFormat("yyyyMMddHHmmss");
	const imageFormat = image.split(".").reverse()[0];
	const imageName = `${authContext.user.user.id}_${formattedCurrentDate}.${imageFormat}`;

	console.log("Sending to server...");
	const reference = storage().ref(`events/${eventId}/${imageName}`);
	const task = reference.putFile(image);

	task.on("state_changed", (snapshot) => {
		progressCallback &&
			progressCallback(snapshot.bytesTransferred / snapshot.totalBytes);
		console.log(
			`${snapshot.bytesTransferred} transferred out of ${snapshot.totalBytes}`
		);
	});

	task.then(() => {
		console.log("Image uploaded to the bucket!");
		firestore()
			.collection("EventPhotos")
			.add({
				eventId,
				photo: {
					imageName,
					owner: authContext.user?.user.id,
					timestamp: currentDate,
				},
			});
		ToastAndroid.show("Image uploaded successfully!", ToastAndroid.SHORT);
		imageContext.clearImage();
		router.back();
	});

	task.catch((error) => {
		console.error(error);
	});
}
