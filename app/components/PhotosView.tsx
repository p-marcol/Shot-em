import { PhotoType } from "@lib/types";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import { Text, View } from "react-native";
import PhotoCard from "./photoCard";
import MyBottomSheet from "./MyBottomSheet";
import TopBar from "./topbar";
import { useState } from "react";

export default function PhotosView({
	photos,
	loading,
}: {
	photos: PhotoType[];
	loading: boolean;
}) {
	const [photoId, setPhotoId] = useState<string>("");
	return (
		<GestureHandlerRootView>
			<View className="bg-[#F8F1E8] w-full h-full">
				<TopBar showBackButton={true} showShadow={true} />
				{loading ? (
					<View className="flex h-[80vh] items-center justify-center">
						<Text className="text-xl font-bold">Loading...</Text>
					</View>
				) : photos.length === 0 ? (
					<View className="flex h-[80vh] items-center justify-center">
						<Text className="text-xl font-bold">
							No photos in this album
						</Text>
					</View>
				) : (
					<FlatList
						data={photos}
						renderItem={({ item }) => (
							<PhotoCard photo={item} setCommentId={setPhotoId} />
						)}
						keyExtractor={(item) => item.id}
					/>
				)}
			</View>
			<MyBottomSheet photoId={photoId} setPhotoId={setPhotoId} />
		</GestureHandlerRootView>
	);
}
