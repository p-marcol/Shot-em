import { FirebaseDatabaseTypes } from "@react-native-firebase/database";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export type PhotoType = {
	eventId: string;
	id: string;
	dbId: string;
	photo: {
		imageName: string;
		owner: string;
		timestamp: FirebaseFirestoreTypes.Timestamp;
	};
	url: string;
	user: User;
	RTDB: FirebaseDatabaseTypes.Reference;
	isLoved: Boolean;
	topComment?: Comment | null;
};

export type User = {
	id: string;
	name: string;
	photo: string;
};

export type Event = {
	id: string;
	name: string;
	startDate: FirebaseFirestoreTypes.Timestamp;
	// Why TF is there capital E in EndDate?
	EndDate: FirebaseFirestoreTypes.Timestamp;
	accessExpires: FirebaseFirestoreTypes.Timestamp;
	accessCode: string;
};

export type Comment = {
	id: string;
	text: string;
	timestamp?: FirebaseFirestoreTypes.Timestamp;
	user: User;
	RTDB?: FirebaseDatabaseTypes.Reference;
	isLoved?: Boolean;
};

export type FetchEventReturnType = FirebaseFirestoreTypes.DocumentData & {
	id: string;
};
