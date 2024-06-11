"use client";
import { createContext, useReducer, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import type { Event } from "@lib/types";

export type EventContextType = {
	event?: Event;
	eventId?: String;
	fetchEvent: (eventId: string) => void;
};

type EventReducerType = {
	event?: Event;
	eventId?: String;
};

export const EventContext = createContext<EventContextType | null>(null);

export default function EventProvider({ children }: any) {
	const [event, setEvent] = useReducer(
		(
			state: EventReducerType,
			action: EventReducerType
		): EventReducerType => {
			const { eventId, event } = action;
			return { ...state, event: event, eventId: eventId };
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
		setEvent({ event: eventDB.data() as Event, eventId: eventId });
	};

	return (
		<EventContext.Provider
			value={{ event: event.event, eventId: event.eventId, fetchEvent }}
		>
			{children}
		</EventContext.Provider>
	);
}
