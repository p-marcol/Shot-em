import { View, Text, Button, TextInput } from "react-native";
import React, { useCallback, useRef, useMemo, useState } from "react";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import CommentBox from "./commentBox";

export default function MyBottomSheet() {
	const sheetRef = useRef<BottomSheet>(null);

	const data = useMemo(
		() =>
			Array(50)
				.fill(0)
				.map((_, index) => `Item ${index}`),
		[]
	);

	const snapPoints = useMemo(() => ["25%", "50%", "90%"], []);

	const handleSheetChanges = useCallback((index: number) => {
		console.log("handleSheetChanges", index);
	}, []);

	const handleSnapPress = useCallback((index: number) => {
		sheetRef.current?.snapToIndex(index);
	}, []);

	const handleClosePress = useCallback(() => {
		sheetRef.current?.close();
	}, []);

	const renderItem = useCallback(
		// @ts-ignore
		({ item }) => (
			<View className="w-full">
				<CommentBox
					comment={{
						id: "1",
						user: {
							id: "1",
							name: "Jakub Barylak",
							photoUrl:
								"https://i.pinimg.com/736x/7b/4f/f4/7b4ff4546fab07ab4c989b58b29e7705.jpg",
						},
						comment:
							"This is a very, very, very long comment that should be cut off at some point, but I don't know where that point is. I guess we'll find out soon enough.",
						timestamp: new Date(),
					}}
				/>
			</View>
		),
		[]
	);

	return (
		<>
			<View style={{ flex: 1, paddingTop: 200 }}>
				<Button
					title="Snap To 25%"
					onPress={() => handleSnapPress(0)}
				/>
				<Button
					title="Snap To 50%"
					onPress={() => handleSnapPress(1)}
				/>
				<Button
					title="Snap To 90%"
					onPress={() => handleSnapPress(2)}
				/>
				<Button title="Close" onPress={handleClosePress} />
				<BottomSheet
					ref={sheetRef}
					index={1}
					snapPoints={snapPoints}
					onChange={handleSheetChanges}
					bottomInset={0}
					enablePanDownToClose={true}
				>
					<View className="my-2 mx-4">
						<Text className="font-bold text-xl">
							Add comment...
						</Text>
						<TextInput
							className=" text-lg border-2 border-gray-300 rounded-md p-1 my-1 w-fit"
							placeholder="comment"
							autoComplete="off"
							autoCorrect={true}
							autoFocus={false}
							inputMode="text"
							multiline={true}
							scrollEnabled={true}
							onSubmitEditing={() => console.log("Submit")}
							returnKeyType="search"
						/>
					</View>
					<BottomSheetFlatList
						data={data}
						renderItem={renderItem}
						keyExtractor={(item) => item}
					/>
				</BottomSheet>
			</View>
		</>
	);
}
