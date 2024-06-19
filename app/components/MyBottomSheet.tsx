import {
	View,
	Text,
	Button,
	TextInput,
	Pressable,
	Keyboard,
} from "react-native";
import React, {
	useCallback,
	useRef,
	useMemo,
	useState,
	useContext,
	forwardRef,
	Ref,
} from "react";
import BottomSheet, {
	BottomSheetBackdrop,
	BottomSheetFlatList,
} from "@gorhom/bottom-sheet";
import CommentBox from "./commentBox";
import { PaperAirplaneIcon } from "react-native-heroicons/outline";
import { AuthContext, AuthContextType } from "providers/authProvider";
import addComment from "@lib/addComment";
import { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";

export default function MyBottomSheet() {
	const sheetRef = useRef<BottomSheet>(null);

	const [commentText, setCommentText] = useState<string>("");

	const { user } = useContext(AuthContext) as AuthContextType;

	const data = useMemo(
		() =>
			Array(50)
				.fill(0)
				.map((_, index) => `Item ${index}`),
		[]
	);

	const snapPoints = useMemo(() => ["25%", "50%", "75%"], []);

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

	const sendComment = async () => {
		console.log(user?.user.id);
		Keyboard.dismiss();
		await addComment({
			userId: user!.user.id,
			eventId: "1",
			photoId: "1",
			commentText: "Yo. This is a comment.",
		});
		setCommentText("");
	};

	const CustomBackdrop = useCallback(
		(
			props: React.JSX.IntrinsicAttributes &
				BottomSheetDefaultBackdropProps
		) => (
			<BottomSheetBackdrop
				{...props}
				enableTouchThrough={false}
				pressBehavior="close"
				appearsOnIndex={0}
				disappearsOnIndex={-1}
			/>
		),
		[]
	);

	return (
		<>
			<View
				style={{
					flex: 1,
					paddingTop: 200,
					position: "absolute",
					top: 0,
					left: 0,
					width: "100%",
					height: "100%",
				}}
			>
				<BottomSheet
					ref={sheetRef}
					index={1}
					snapPoints={snapPoints}
					onChange={handleSheetChanges}
					bottomInset={0}
					enablePanDownToClose={true}
					backdropComponent={CustomBackdrop}
				>
					<View className="m-1 px-1">
						<Text className="font-bold text-xl ml-1">
							Add comment...
						</Text>
						<View className="flex flex-row w-full content-center">
							<TextInput
								className="text-lg border-2 border-gray-300 rounded-md p-1 grow"
								placeholder="comment"
								autoComplete="off"
								autoCorrect={true}
								autoFocus={false}
								inputMode="text"
								multiline={true}
								scrollEnabled={true}
								onSubmitEditing={() => console.log("Submit")}
								onChangeText={(text) => setCommentText(text)}
								value={commentText}
								returnKeyType="search"
							/>
							<Pressable
								className="ml-2 flex content-center justify-center"
								onTouchStart={sendComment}
							>
								<PaperAirplaneIcon
									width={35}
									height={35}
									color="#000000"
								/>
							</Pressable>
						</View>
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
