import { View, Text, Button, TouchableOpacity, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import Firebase from "@react-native-firebase/app";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import {
	GoogleSignin,
	GoogleSigninButton,
	User,
} from "@react-native-google-signin/google-signin";
import env from "@env/env";
import { Camera, CameraType } from "expo-camera";

export default function App() {
	const [user, setUser] = useState<User | null>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		GoogleSignin.configure({
			webClientId: env.GOOGLE_WEB_CLIENT_ID,
			offlineAccess: false,
		});

		if (Firebase.apps.length === 0) {
			Firebase.initializeApp({
				apiKey: env.FIREBASE_WEB_API_KEY,
				authDomain: env.FIREBASE_AUTH_DOMAIN,
				projectId: env.FIREBASE_PROJECT_ID,
				storageBucket: env.FIREBASE_STORAGE_BUCKET,
				messagingSenderId: env.FIREBASE_MESSAGING_SENDER_ID,
				appId: env.FIREBASE_APP_ID,
				databaseURL: env.FIREBASE_DATABASE_URL,
			});
		}
	}, []);

	async function onGoogleButtonPress() {
		try {
			await GoogleSignin.hasPlayServices({
				showPlayServicesUpdateDialog: true,
			});
			const userCredentials = await GoogleSignin.signIn();
			setUser(userCredentials);
			if (userCredentials.idToken !== null) {
				const googleCredential = auth.GoogleAuthProvider.credential(
					userCredentials.idToken
				);
				auth().signInWithCredential(googleCredential);
				setError(null);
			} else
				setError("Cannot sign in to Firebase: Google idToken is null.");
		} catch (error) {
			console.error(error);
		}
	}

	const [type, setType] = useState(CameraType.back);
	const [permission, requestPermission] = Camera.useCameraPermissions();

	if (!permission) {
		return (
			<View>
				<Text>No camera permission</Text>
			</View>
		);
	}

	if (!permission.granted) {
		// Camera permissions are not granted yet
		return (
			<View className="">
				<Text style={{ textAlign: "center" }}>
					We need your permission to show the camera
				</Text>
				<Button onPress={requestPermission} title="grant permission" />
			</View>
		);
	}

	return (
		<View className="bg-orange-200 flex">
			<View className="flex-col justify-center items-center">
				{user && (
					<Text className="text-center">
						Hello {user.user.givenName} {user.user.familyName} 👋
					</Text>
				)}
				<GoogleSigninButton
					size={GoogleSigninButton.Size.Standard}
					color={GoogleSigninButton.Color.Dark}
					onPress={onGoogleButtonPress}
				/>
			</View>
			<View className="flex flex-col h-14 w-screen justify-center items-center text-white bg-fuchsia-500 rounded grow">
				<Camera type={type}>
					<View style={styles.buttonContainer}>
						<TouchableOpacity
							style={styles.button}
							onPress={() => {}}
						>
							<Text style={styles.text}>Flip Camera</Text>
						</TouchableOpacity>
					</View>
				</Camera>
				<Text>CAMERA xd</Text>
			</View>
			{error && <Text className="bg-red-500">{error}</Text>}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
	},
	camera: {
		flex: 1,
	},
	buttonContainer: {
		flex: 1,
		flexDirection: "row",
		backgroundColor: "transparent",
		margin: 64,
	},
	button: {
		flex: 1,
		alignSelf: "flex-end",
		alignItems: "center",
	},
	text: {
		fontSize: 24,
		fontWeight: "bold",
		color: "white",
	},
});
