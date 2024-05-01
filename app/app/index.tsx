import { View, Text } from "react-native";
import { useEffect, useState } from "react";
import Firebase from "@react-native-firebase/app";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { GoogleSignin, GoogleSigninButton, User } from "@react-native-google-signin/google-signin";
import env from "@env/env";

export default function App() {
	const [user, setUser] = useState<User | null>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		GoogleSignin.configure({
			webClientId: env.GOOGLE_WEB_CLIENT_ID,
			offlineAccess: false
		});

		if (Firebase.apps.length === 0) {
			Firebase.initializeApp({
				apiKey: env.FIREBASE_WEB_API_KEY,
				authDomain: env.FIREBASE_AUTH_DOMAIN,
				projectId: env.FIREBASE_PROJECT_ID,
				storageBucket: env.FIREBASE_STORAGE_BUCKET,
				messagingSenderId: env.FIREBASE_MESSAGING_SENDER_ID,
				appId: env.FIREBASE_APP_ID,
				databaseURL: env.FIREBASE_DATABASE_URL
			});
		}
	}, []);

	async function onGoogleButtonPress() {
		try {
			await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
			const userCredentials = await GoogleSignin.signIn();
			setUser(userCredentials);
			if (userCredentials.idToken !== null) {
				const googleCredential = auth.GoogleAuthProvider.credential(userCredentials.idToken);
				auth().signInWithCredential(googleCredential);
				setError(null);
			} else setError("Cannot sign in to Firebase: Google idToken is null.");
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<View className="bg-orange-200">
			{user && (
				<Text className="text-center">
					Hello {user.user.givenName} {user.user.familyName} 👋
				</Text>
			)}
			<View className="flex-col justify-center items-center">
				<GoogleSigninButton
					size={GoogleSigninButton.Size.Standard}
					color={GoogleSigninButton.Color.Dark}
					onPress={onGoogleButtonPress}
				/>
			</View>
			{error && <Text className="bg-red-500">{error}</Text>}
		</View>
	);
}
