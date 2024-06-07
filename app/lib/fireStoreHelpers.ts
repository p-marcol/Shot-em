import firestore, {
	FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import storage, { FirebaseStorageTypes } from "@react-native-firebase/storage";
import { FetchEventReturnType } from "./types";
import { firebase } from "@react-native-firebase/auth";

export async function addEventToUser(userId: string, accessCode: string) {
	const userEvents = await firestore()
		.collection("UserEvents")
		.where("userId", "==", userId)
		.get();

	if (userEvents.empty) {
		firestore()
			.collection("UserEvents")
			.add({
				userId: userId,
				events: [accessCode],
			});
	} else {
		const userEvent = userEvents.docs[0];
		const events = userEvent.data().events;
		if (!events.includes(accessCode)) events.push(accessCode);
		userEvent.ref.update({
			events: events,
		});
	}
}

export async function fetchEventFromAccessCode(accessCode: string) {
	return await firestore()
		.collection("Events")
		.where("accessCode", "==", accessCode)
		.get();
}

export async function fetchUserEvents(userId: string) {
	const eventIdsCollection = await firestore()
		.collection("UserEvents")
		.where("userId", "==", userId)
		.get();
	const eventIds = eventIdsCollection.docs[0].data().events;
	const eventsCollection = await firestore().collection("Events");
	const events = await Promise.all(
		eventIds.map(async (eventId: string) => {
			const event = await eventsCollection.doc(eventId).get();
			return { ...event.data(), id: event.id };
		})
	);
	return events;
}

export async function fetchEvent(
	eventId: string
): Promise<FetchEventReturnType> {
	const event = await firestore().collection("Events").doc(eventId).get();
	return { ...event.data(), id: event.id };
}

export async function fetchEventParticipants(eventId: string) {
	const participants = await firestore()
		.collection("UserEvents")
		.where("events", "array-contains", eventId)
		.get();
	return participants.docs.map((participant) => participant.data());
}
