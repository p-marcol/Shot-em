import { ImageContextType } from "providers/imageProvider";
import { AuthContextType } from "providers/authProvider";
import storage from "@react-native-firebase/storage";
import firestore from "@react-native-firebase/firestore";
import { DateTime } from "luxon";

export default async function sendImageToStorage(
	imageContext: ImageContextType | null,
	authContext: AuthContextType | null,
	eventId: string
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
	// console.log(imageFormat);
	// TODO: Change image type depending on the parameter image
	const imageName = `${authContext.user.user.id}_${formattedCurrentDate}.${imageFormat}`;

	console.log("Sending to server...");
	const reference = storage().ref(`events/${eventId}/${imageName}`);
	const task = reference.putFile(image);

	task.on("state_changed", (snapshot) => {
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
				comments: [],
			});
	});

	task.catch((error) => {
		console.error(error);
	});
}
