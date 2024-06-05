import { ImageContextType } from "providers/imageProvider";
import storage from "@react-native-firebase/storage";

export default async function sendImageToStorage(
	ImageContext: ImageContextType | null,
	eventId: string
) {
	if (!ImageContext || !ImageContext.image || !ImageContext.dimensions) {
		console.error("No image provided");
		return;
	}

	console.log("Sending to server...");

	const { image } = ImageContext;

	const reference = storage().ref(`events/${eventId}/image.jpg`);
	const task = reference.putFile(image);

	task.on("state_changed", (snapshot) => {
		console.log(
			`${snapshot.bytesTransferred} transferred out of ${snapshot.totalBytes}`
		);
	});

	task.then(() => {
		console.log("Image uploaded to the bucket!");
	});
}
