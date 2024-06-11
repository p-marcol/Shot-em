import { FirebaseDatabaseTypes } from "@react-native-firebase/database";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export type PhotoType = {
	comments: Object[];
	eventId: string;
	id: string;
	photo: {
		imageName: string;
		owner: string;
		timestamp: FirebaseFirestoreTypes.Timestamp;
	};
	url: string;
	user: {
		id: string;
		name: string;
		photoUrl: string;
	};
	RTDB: FirebaseDatabaseTypes.Reference;
};

export type Event = {
	id: string;
	name: string;
	startDate: Date;
	endDate: Date;
	accessExpires: Date;
	accessCode: string;
};

export type FetchEventReturnType = FirebaseFirestoreTypes.DocumentData & {
	id: string;
};
