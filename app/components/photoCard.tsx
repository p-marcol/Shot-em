import { StrokeText } from "@charmy.tech/react-native-stroke-text";
import { PhotoType } from "@lib/types";
import { useEffect, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";

export default function PhotoCard({ photo }: { photo: PhotoType }) {
	const [dimensions, setDimensions] = useState<{
		width: number;
		height: number;
	}>({ width: 1, height: 1 });
	const [loaded, setLoaded] = useState(true);
	const [aspectRatio, setAspectRatio] = useState(true);
	const { url, user } = photo;

	useEffect(() => {
		Image.getSize(
			url,
			(width, height) => {
				setDimensions({ width: width, height: height });
			},
			(error) => {
				console.error(error);
			}
		);
		// console.log(dimensions);
	}, []);

	let toggleAspectRatio = () => {
		setAspectRatio(!aspectRatio);
	};

	return (
		<View className="flex w-full items-center">
			<View
				style={{
					width: "95%",
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
			{/* <Text>{JSON.stringify(dimensions)}</Text> */}
		</View>
	);
}
