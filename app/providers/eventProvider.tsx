"use client";
import { createContext, useReducer, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import type { Event, PhotoType } from "@lib/types";

export type EventContextType = {
	event?: Event;
	eventId?: string;
	fetchEvent: (eventId: string) => void;
	setEvent: (event: EventReducerType) => void;
	eventPhotos?: PhotoType[];
	setEventPhotos: (photos: PhotoType[]) => void;
};

type EventReducerType = {
	event?: Event;
	eventId?: string;
};

export const EventContext = createContext<EventContextType | null>(null);

export default function EventProvider({ children }: any) {
	const [eventPhotos, setEventPhotos] = useState<PhotoType[]>([]);

	const [event, setEvent] = useReducer(
		(
			state: EventReducerType,
			action: EventReducerType
		): EventReducerType => {
			const { eventId, event } = action;
			// console.log("Reducer", event, eventId);
			return { event: event, eventId: eventId };
		},
		{
			event: undefined,
			eventId: undefined,
		}
	);

	let fetchEvent = async (eventId: string) => {
		const eventDB = await firestore()
			.collection("Events")
			.doc(eventId)
			.get();
		// console.log(eventDB.data());
		setEvent({ event: eventDB.data() as Event, eventId: eventId });
	};

	return (
		<EventContext.Provider
			value={{
				event: event.event,
				eventId: event.eventId,
				fetchEvent,
				setEvent,
				eventPhotos,
				setEventPhotos,
			}}
		>
			{children}
		</EventContext.Provider>
	);
}
