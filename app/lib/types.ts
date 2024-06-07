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
};

export type FetchEventReturnType = FirebaseFirestoreTypes.DocumentData & {
	id: string;
};
