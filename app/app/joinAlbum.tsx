import { useCameraPermissions, CameraView } from "expo-camera/next";
import { useState, useContext } from "react";
import TopBar from "components/topbar";
import { AuthContext, AuthContextType } from "providers/authProvider";
import {
	View,
	Text,
	Button,
	TouchableOpacity,
	Pressable,
	TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Modal } from "react-native";

export default function JoinAlbum() {
	const [facing, setFacing] = useState("back");
	const [permission, requestPermission] = useCameraPermissions();
	const [modalVisible, setModalVisible] = useState(false);

	const { user } = useContext(AuthContext) as AuthContextType;

	if (!permission) return <View />;
	if (!permission.granted) requestPermission();

	// console.log(permission);

	const handleJoin = (code: string) => {
		console.log("Joining album with code: ", code);
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
					<View className="bg-main-bg flex px-5 py-4 gap-1">
						<Text className="text-center text-xl font-bold">
							ENTER EVENT CODE
						</Text>
						<View className="flex gap-2 flex-row w-[70vw] content-stretch">
							{Array.from({ length: 5 }).map((_, i) => (
								<TextInput
									key={i}
									className="border-2 text-xl text-center p-1 rounded-md border-gray-200 bg-white"
									maxLength={1}
									keyboardType="number-pad"
									onChange={(e) => {
										// get to the next input field
									}}
								/>
							))}
						</View>

						<Pressable
							onPress={() => {
								// handleJoin(code)
								handleJoin("12345");
							}}
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
					showShadow={true}
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
						facing={facing}
						style={{
							width: "70%",
							aspectRatio: 1,
						}}
						barcodeScannerSettings={{
							barcodeTypes: ["qr"],
						}}
						onBarcodeScanned={(data) => {
							console.log(data.data);
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
