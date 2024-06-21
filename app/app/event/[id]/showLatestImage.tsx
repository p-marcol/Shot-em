import React, {
	useContext,
	useLayoutEffect,
	useReducer,
	useState,
} from "react";
import { ImageContext, ImageContextType } from "providers/imageProvider";
import { Image, Text, ToastAndroid, View } from "react-native";
import SafeAreaViewWrapper from "components/SafeAreaViewWrapper";
import TopBar from "components/topbar";
import BigOrangeButton from "components/BigOrangeButton";
import sendImageToStorage from "lib/sendImageToStorage";
import { AuthContext, AuthContextType } from "providers/authProvider";
import { EventContext, EventContextType } from "providers/eventProvider";
import { Bar as ProgressBar } from "react-native-progress";
import { router } from "expo-router";

export default function ShowLatestImage() {
	const imageContext = useContext(ImageContext) as ImageContextType;
	const authContext = useContext(AuthContext) as AuthContextType;

	const [uploading, setUploading] = useReducer(
		(
			state: { uploading: boolean; progress: number },
			action: { uploading: boolean; progress: number }
		) => {
			return { uploading: action.uploading, progress: action.progress };
		},
		{ uploading: false, progress: 0 }
	);

	useLayoutEffect(() => {
		setUploading({ uploading: false, progress: 0 });
	}, [imageContext.image]);

	const { image, dimensions } = imageContext;
	const { eventId } = useContext(EventContext) as EventContextType;

	if (!image || !dimensions)
		return (
			<SafeAreaViewWrapper>
				<View>
					<Text>Some error occured 😬</Text>
				</View>
			</SafeAreaViewWrapper>
		);

	var aspectRatio = dimensions?.width / dimensions?.height;

	return (
		<SafeAreaViewWrapper>
			<TopBar showBackButton={true} showShadow={true} />
			<View className="flex items-center h-fit mt-4">
				<View className="max-w-[85%] border-8 border-main-orange relative">
					<Image
						source={{ uri: image }}
						className="max-h-[60vh]"
						style={{
							width: "100%",
							aspectRatio: aspectRatio,
						}}
					/>
				</View>
				<View className="w-[80%] mt-6">
					<BigOrangeButton
						text="Share"
						onClick={async () => {
							console.log(eventId);
							if (uploading.uploading) return;
							await sendImageToStorage(
								imageContext,
								authContext,
								eventId!,
								(progress) => {
									setUploading({ uploading: true, progress });
								}
							);
						}}
					/>
				</View>
				<View className="mt-5 w-[70%]">
					<ProgressBar
						progress={uploading.progress}
						color="#FF995F"
						animated={true}
						width={null}
						height={10}
						borderWidth={2}
					/>
				</View>
			</View>
		</SafeAreaViewWrapper>
	);
}
