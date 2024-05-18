import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import firestore from "@react-native-firebase/firestore";
import { useEffect, useState } from "react";

export default function DatabaseTest() {
	const [users, setUsers] = useState<any[]>([]);

	useEffect(() => {
		const usersFun = async () => {
			const fetchedUsers = (await firestore().collection("Users").get())
				.docs;
			setUsers(fetchedUsers.map((doc) => doc.data()));
			// console.log(fetchedUsers.map((doc) => doc.data()));
		};
		usersFun();
	}, []);

	return (
		<SafeAreaView>
			<Text>Some text</Text>
			<Text>{JSON.stringify(users)}</Text>
		</SafeAreaView>
	);
}
