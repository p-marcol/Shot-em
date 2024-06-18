"use client";
import { Comment } from "@lib/types";
import { useReducer, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { HeartIcon } from "react-native-heroicons/outline";

export default function CommentBox({ comment }: { comment?: Comment }) {
	if (!comment) {
		return <></>;
	}

	let getText = (newCount: number) => {
		return newCount < 1000
			? newCount.toString()
			: newCount < 10000
				? newCount / 1000 + "K"
				: newCount < 1000000
					? Math.floor(newCount / 1000) + "K"
					: Math.floor(newCount / 1000000) + "M";
	};

	const [isLoved, setIsLoved] = useState<Boolean>(false);
	const [loveCount, loveDispatch] = useReducer(
		(state: { count: number; text: string }, type: string) => {
			let newCount = state.count;
			if (type === "inc") {
				newCount++;
			}
			if (type === "dec") {
				newCount--;
			}
			let newText = getText(newCount);
			return { count: newCount, text: newText };
		},
		{ count: 0, text: getText(0) }
	);

	const handleHeartPress = () => {
		loveDispatch("inc");
	};

	return (
		<View className="w-fit bg-[#F8F1E8] m-1 flex flex-row border-2 border-gray-300 rounded-md px-2 py-1 justify-between">
			<View className="flex items-center justify-center w-[20%] ">
				<View className="w-[40px] aspect-square block rounded-full overflow-hidden border-2 border-main-orange">
					<Image
						source={{ uri: comment?.user.photoUrl }}
						className="w-full h-full"
					/>
				</View>
				<Text className="font-extrabold text-center">
					{comment?.user.name}
				</Text>
			</View>
			<View className="grow max-w-[60%] p-1 ">
				<Text>{comment?.comment}</Text>
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
