"use client";
import { Comment } from "@lib/types";
import { firebase } from "@react-native-firebase/firestore";
import { useContext, useEffect, useReducer, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { HeartIcon } from "react-native-heroicons/outline";
import { AuthContext, AuthContextType } from "providers/authProvider";

let getText = (newCount: number) => {
	return newCount < 1000
		? newCount.toString()
		: newCount < 10000
			? newCount / 1000 + "K"
			: newCount < 1000000
				? Math.floor(newCount / 1000) + "K"
				: Math.floor(newCount / 1000000) + "M";
};

export default function CommentBox({ comment }: { comment?: Comment }) {
	if (!comment) {
		return <></>;
	}

	const { RTDB } = comment;
	const { user } = useContext(AuthContext) as AuthContextType;

	const [isLoved, setIsLoved] = useState<Boolean>(comment.isLoved!);
	const [loveCount, loveDispatch] = useReducer(
		(
			state: { count: number; text: string },
			action: { type: string; val?: number }
		) => {
			let newCount = state.count;
			if (action.type === "inc") {
				newCount++;
			}
			if (action.type === "dec") {
				newCount--;
			}
			if (action.type === "reset") {
				newCount = 0;
			}
			if (action.type === "set") {
				newCount = action.val!;
			}
			let newText = getText(newCount);
			return { count: newCount, text: newText };
		},
		{ count: 0, text: getText(0) }
	);

	useEffect(() => {
		RTDB?.on("value", (snapshot) => {
			if (snapshot.val() === null) loveDispatch({ type: "reset" });
			else loveDispatch({ type: "set", val: snapshot.val() });
		});
	}, []);

	const handleHeartPress = () => {
		RTDB?.transaction((currentCount) => {
			if (currentCount === null) {
				return 1;
			}
			return currentCount + (isLoved ? -1 : 1);
		}).then((transaction) => {
			if (!isLoved) {
				var doc = firebase
					.firestore()
					.collection("Users")
					.doc(user?.user.id)
					.collection("lovedComments")
					.doc(comment.id)
					.set({});
			} else {
				var doc = firebase
					.firestore()
					.collection("Users")
					.doc(user?.user.id)
					.collection("lovedComments")
					.doc(comment.id)
					.delete();
			}
			doc.then(() => {
				setIsLoved(!isLoved);
			});
		});
	};

	return (
		<View className="w-fit bg-[#F8F1E8] m-1 flex flex-row border-2 border-gray-300 rounded-md px-2 py-1 justify-between">
			<View className="flex items-center justify-center w-[20%] ">
				<View className="w-[40px] aspect-square block rounded-full overflow-hidden border-2 border-main-orange">
					<Image
						source={{ uri: comment?.user.photo }}
						className="w-full h-full"
					/>
				</View>
				<Text className="font-extrabold text-center">
					{comment?.user.name}
				</Text>
			</View>
			<View className="grow max-w-[60%] p-1 flex align-middle justify-center ">
				<Text>{comment?.text}</Text>
			</View>
			<View className="flex flex-row items-center justify-end w-[25%]  gap-1">
				<Text>{loveCount.text}</Text>
				<Pressable onTouchStart={handleHeartPress}>
					<HeartIcon
						size={40}
						color={isLoved ? "#D01212" : "#000000"}
						fill={isLoved ? "#FF0000" : "rgba(0, 0, 0, 0)"}
					/>
				</Pressable>
			</View>
		</View>
	);
}
