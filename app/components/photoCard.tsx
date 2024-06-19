import { StrokeText } from "@charmy.tech/react-native-stroke-text";
import { PhotoType } from "@lib/types";
import {
	useEffect,
	useLayoutEffect,
	useState,
	useContext,
	useRef,
	useCallback,
	useMemo,
} from "react";
import { Image, Pressable, Text, View } from "react-native";
import {
	ChatBubbleLeftEllipsisIcon,
	HeartIcon,
} from "react-native-heroicons/outline";
import { AuthContext, AuthContextType } from "providers/authProvider";
import { firebase } from "@react-native-firebase/firestore";
import CommentBox from "./commentBox";

export default function PhotoCard({ photo }: { photo: PhotoType }) {
	const [dimensions, setDimensions] = useState<{
		width: number;
		height: number;
	}>({ width: 1, height: 1 });
	// const [loaded, setLoaded] = useState(true);
	const [aspectRatio, setAspectRatio] = useState(true);
	const [isLoved, setIsLoved] = useState<Boolean>(photo.isLoved);
	const [loveCount, setLoveCount] = useState<number>(0);
	const { url, user, RTDB } = photo;

	const authContext = useContext(AuthContext) as AuthContextType;

	useLayoutEffect(() => {
		Image.getSize(
			url,
			(width, height) => {
				setDimensions({ width: width, height: height });
			},
			(error) => {
				console.error(error);
			}
		);
		// RTDB.once("value").then((snapshot) => {
		// 	if (snapshot.val() !== null) setLoveCount(snapshot.val());
		// });
	}, []);

	useEffect(() => {
		RTDB.on("value", (snapshot) => {
			if (snapshot.val() === null) setLoveCount(0);
			setLoveCount(snapshot.val());
		});
	}, []);

	const toggleAspectRatio = () => {
		setAspectRatio(!aspectRatio);
	};

	const lovePhoto = () => {
		RTDB.transaction((currentValue) => {
			if (currentValue === null) return 1;
			if (!isLoved) {
				return currentValue + 1;
			} else {
				return currentValue - 1;
			}
		}).then((transaction) => {
			if (!isLoved) {
				var doc = firebase
					.firestore()
					.collection("Users")
					.doc(authContext.user?.user.id)
					.collection("lovedPhotos")
					.doc(photo.id)
					.set({});
			} else {
				var doc = firebase
					.firestore()
					.collection("Users")
					.doc(authContext.user?.user.id)
					.collection("lovedPhotos")
					.doc(photo.id)
					.delete();
			}
			doc.then(() => {
				setIsLoved(!isLoved);
				setLoveCount(transaction.snapshot.val());
				console.log(`New post like val: ${transaction.snapshot.val()}`);
			});
		});

		setIsLoved(!isLoved);
	};

	return (
		<>
			<View className="flex w-full items-center px-[2.5%] pb-2">
				<View
					style={{
						width: "100%",
						aspectRatio: 1,
						borderRadius: 20,
						overflow: "hidden",
						margin: 10,
						backgroundColor: "#CDB891",
						display: "flex",
						position: "relative",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					{/* Stroke text */}
					<View className="absolute top-2 z-10 w-auto left-2 flex flex-row items-center gap-x-2">
						<View className="bg-gray-400 w-[15vw] aspect-square block rounded-full overflow-hidden border-2 border-white shadow shadow-black">
							<Image
								source={{ uri: user.photoUrl }}
								style={{
									width: "100%",
									height: "100%",
								}}
							/>
						</View>
						<View>
							<StrokeText
								text={user.name}
								fontSize={20}
								color="#FFFFFF"
								strokeColor="#000000"
								strokeWidth={4}
							/>
						</View>
					</View>
					<Pressable onPress={toggleAspectRatio}>
						<Image
							source={{ uri: url }}
							style={{
								width:
									dimensions.height < dimensions.width
										? "100%"
										: "auto",
								height:
									dimensions.height > dimensions.width
										? "100%"
										: "auto",
								aspectRatio: aspectRatio
									? 1
									: dimensions.width / dimensions.height,
								zIndex: 1,
							}}
						/>
					</Pressable>
				</View>
				<View className="flex-row flex w-full justify-between px-2">
					<View className="flex flex-row gap-2 items-center">
						<Pressable onTouchStart={lovePhoto}>
							<HeartIcon
								width={35}
								height={35}
								color={isLoved ? "#D01212" : "#000000"}
								fill={isLoved ? "#FF0000" : "rgba(0, 0, 0, 0)"}
								className="w-8"
							/>
						</Pressable>
						<Text className="w-auto">
							{isLoved
								? `You and ${loveCount - 1} other${loveCount === 1 ? "s" : ""} love it`
								: loveCount > 1
									? `${loveCount} people love it`
									: loveCount === 1
										? "1 person loves it"
										: "No one loves it yet"}
						</Text>
					</View>
					<Pressable
						onTouchStart={() => {
							console.log("Open comments!!!");
						}}
					>
						<ChatBubbleLeftEllipsisIcon
							width={35}
							height={35}
							color="#000000"
						/>
					</Pressable>
				</View>
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
		</>
	);
}
