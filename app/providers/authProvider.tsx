import { createContext, useEffect, useState } from "react";
import env from "@env/env";
import Firebase from "@react-native-firebase/app";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { GoogleSignin, User } from "@react-native-google-signin/google-signin";

export type AuthContextType = {
	user: User | null;
	setUser: (user: User | null) => void;
	loginWithGoogle: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({
	children,
}: {
	children: React.ReactNode;
}) {
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

	async function loginWithGoogle() {
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

	return (
		<AuthContext.Provider
			value={{
				user: user,
				setUser: setUser,
				loginWithGoogle: loginWithGoogle,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}
