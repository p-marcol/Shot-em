import {
	useCameraPermissions,
	CameraView,
	BarcodeScanningResult,
} from "expo-camera/next";
import React, { useState, useContext } from "react";
import TopBar from "components/topbar";
import { AuthContext, AuthContextType } from "providers/authProvider";
import {
	View,
	Text,
	Pressable,
	TextInput,
	Keyboard,
	Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CameraType } from "expo-camera";
import { ToastAndroid } from "react-native";
import {
	addEventToUser,
	fetchEventFromAccessCode,
} from "@lib/fireStoreHelpers";
import { router } from "expo-router";

export default function JoinAlbum() {
	const [permission, requestPermission] = useCameraPermissions();
	const [modalVisible, setModalVisible] = useState(false);
	const [code, setCode] = useState<(string | null)[]>(
		new Array(5).fill(null)
	);

	const [scanned, setScanned] = useState(false);

	const { user } = useContext(AuthContext) as AuthContextType;

	const inputRefs = Array.from({ length: 5 }).map(() => React.useRef(null));

	if (!permission) return <View />;
	if (!permission.granted) requestPermission();

	const setCodeAtIndex = (index: number, value: string) => {
		let newCode = [...code];
		newCode[index] = value;
		console.log(newCode);
		setCode(newCode);
	};

	const joinEventwithQR = async (qrCode: BarcodeScanningResult) => {
		console.log("QR");
		setScanned(true);
		const accessCode = qrCode.data.replace("shotem://join/", "");
		setCode(accessCode.split(""));
		// console.log(qrCode.data);
		joinEvent(accessCode);
	};

	const joinEventwithCode = async () => {
		console.log("CODE");
		setScanned(true);
		const accessCode = code.join("");
		joinEvent(accessCode);
	};

	const joinEvent = async (accessCode: string) => {
		const event = await fetchEventFromAccessCode(accessCode);
		//console.log(event);
		if (event.empty) {
			ToastAndroid.show("Event not found", ToastAndroid.SHORT);
			setScanned(false);
			return;
		}
		console.log("Event found: ", event.docs[0].id);
		addEventToUser(user?.user.id!, event.docs[0].id);
		ToastAndroid.show("Event joined", ToastAndroid.SHORT);
		router.replace("/albums");
		// TODO redirect to event page
	};

	return (
		<SafeAreaView className="bg-black">
			<Modal
				animationType="fade"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					setModalVisible(false);
				}}
			>
				<View className="flex items-center justify-center w-screen h-screen bg-black/50 blur-xl">
					<View className="bg-main-bg flex p-4 gap-1 justify-center items-center rounded-xl">
						<Text className="text-center text-2xl font-bold">
							ENTER EVENT CODE
						</Text>
						<View className="flex flex-row min-w-[60vw] justify-evenly">
							{Array.from({ length: 5 }).map((_, i) => (
								<TextInput
									key={i}
									id={`code-${i}`}
									className="border-2 text-2xl font-bold text-center py-1 px-2 rounded-md border-gray-200 bg-white"
									maxLength={1}
									autoComplete="off"
									ref={inputRefs[i]}
									keyboardType="number-pad"
									value={code[i] || ""}
									onChange={(e) => {
										setCodeAtIndex(
											i,
											// @ts-ignore
											e.nativeEvent.text || null
										);
										// go to next input
										if (e.nativeEvent.text) {
											if (i < 4) {
												console.log("focus next");
												(
													inputRefs[i + 1]
														.current as TextInput | null
												)?.focus();
											} else {
												Keyboard.dismiss();
											}
										}
									}}
								/>
							))}
						</View>

						<Pressable
							onPress={joinEventwithCode}
							className="bg-main-orange p-3 mt-8"
						>
							<Text>JOIN</Text>
						</Pressable>
						<Pressable
							onPress={() => setModalVisible(false)}
							className="bg-white text-main-orange p-3 mt-3"
						>
							<Text>Cancel</Text>
						</Pressable>
					</View>
				</View>
			</Modal>
			<View className="bg-main-bg h-screen">
				<TopBar
					showBackButton={true}
					showShadow={false}
					showUserInfo={false}
				/>
				<View className=" flex justify-center items-center">
					<View className="h-[15vh] flex items-center justify-center">
						<Text className="font-bold text-4xl text-center">
							Hi, {user?.user.givenName}!
						</Text>
					</View>
					<Text className="block h-[5vh] text-xl">
						Scan QR code to join event!
					</Text>
					{/* @ts-ignore */}
					<CameraView
						facing={CameraType.back}
						style={{
							width: "70%",
							aspectRatio: 1,
						}}
						barcodeScannerSettings={{
							barcodeTypes: ["qr"],
						}}
						onBarcodeScanned={(qrData) => {
							if (!scanned) joinEventwithQR(qrData);
							// !modalVisible && setCodeFromQR(qrData);
						}}
					/>
				</View>
				<View className="flex justify-center items-center">
					<Pressable
						onPress={() => setModalVisible(true)}
						className="mt-[10vh]"
					>
						<Text className="text-center text-xl text-white bg-main-orange py-3 px-10 font-bold rounded-xl">
							JOIN WITH{"\n"}EVENT CODE
						</Text>
					</Pressable>
				</View>
			</View>
		</SafeAreaView>
	);
}
