import { useEffect, useState, createContext, useContext } from "react";
import { Camera, CameraType } from "expo-camera";
import { Stack } from "expo-router";
import HelloScreen from "./HelloScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext, AuthContextType } from "providers/authProvider";

export default function App() {
	const { loading } = useContext(AuthContext) as AuthContextType;

	if (loading) return null;

	return (
		<SafeAreaView style={{ backgroundColor: "black" }}>
			<HelloScreen />
		</SafeAreaView>
	);
}
