import { PhotoType } from "@lib/types";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Text, View, FlatList } from "react-native";
import PhotoCard from "./photoCard";
import MyBottomSheet from "./MyBottomSheet";
import TopBar from "./topbar";
import { Dispatch, SetStateAction, useState } from "react";

export default function PhotosView({
	photos,
	loading,
	refreshFunction,
}: {
	photos?: PhotoType[];
	loading: boolean;
	refreshFunction?: (
		setRefreshing: Dispatch<SetStateAction<boolean>>
	) => void;
}) {
	const [photoId, setPhotoId] = useState<string>("");
	const [refreshing, setRefreshing] = useState<boolean>(false);

	const onRefresh = () => {
		// console.log("Refreshing");
		refreshFunction && refreshFunction(setRefreshing);
	};

	return (
		<GestureHandlerRootView>
			<View className="bg-[#F8F1E8] w-full h-full flex">
				<TopBar showBackButton={true} showShadow={true} />
				{loading ? (
					<View className="flex h-[80vh] items-center justify-center">
						<Text className="text-xl font-bold">Loading...</Text>
					</View>
				) : photos === undefined || photos.length === 0 ? (
					<View className="flex h-[80vh] items-center justify-center">
						<FlatList
							data={[1]}
							renderItem={({}) => (
								<Text className="text-xl font-bold">
									No photos in this album
								</Text>
							)}
							keyExtractor={(item) => item.toString()}
							onRefresh={onRefresh}
							refreshing={refreshing}
						/>
					</View>
				) : (
					<FlatList
						data={photos}
						renderItem={({ item }) => (
							<PhotoCard photo={item} setCommentId={setPhotoId} />
						)}
						keyExtractor={(item) => item.id}
						onRefresh={onRefresh}
						refreshing={refreshing}
						// progressViewOffset={100}
					/>
				)}
			</View>
			<MyBottomSheet photoId={photoId} setPhotoId={setPhotoId} />
		</GestureHandlerRootView>
	);
}
