import { useEffect, useState, createContext } from "react";
import { Camera, CameraType } from "expo-camera";
import { Stack } from "expo-router";
import HelloScreen from "./HelloScreen";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
	console.log("Hello, shotem!");
	return (
		<SafeAreaView style={{ backgroundColor: "black" }}>
			<HelloScreen />
		</SafeAreaView>
	);
}
