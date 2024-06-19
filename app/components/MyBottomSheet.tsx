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
	useEffect,
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
import fetchComments from "@lib/fetchComments";
import { Comment } from "@lib/types";

export default function MyBottomSheet() {
	const sheetRef = useRef<BottomSheet>(null); // reference to the bottom sheet
	const [commentText, setCommentText] = useState<string>(""); // text to send as a comment
	const { user } = useContext(AuthContext) as AuthContextType; // user context
	const [comments, setComments] = useState<Comment[]>([]); // comments state

	useEffect(() => {
		async function fetchData() {
			const com = await fetchComments("DbnX6ZfmFROKJ3Q8rMCb").then(
				(comments) => {
					console.log(comments);
					setComments(comments as Comment[]);
				}
			);
		}
		fetchData();
	}, []);

	const snapPoints = useMemo(() => ["25%", "50%", "75%"], []);

	const handleSheetChanges = useCallback((index: number) => {
		// console.log("handleSheetChanges", index);
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
				<CommentBox comment={item as Comment} />
			</View>
		),
		[]
	);

	const sendComment = async () => {
		console.log(user?.user.id);
		Keyboard.dismiss();
		await addComment({
			userId: user!.user.id,
			photoId: "DbnX6ZfmFROKJ3Q8rMCb",
			commentText: commentText,
		}).then(() => console.log("Comment added"));
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
						data={comments}
						renderItem={renderItem}
						keyExtractor={(item) => item.id}
					/>
				</BottomSheet>
			</View>
		</>
	);
}
