import { useEffect, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";

export default function PhotoCard({ photoUri }: { photoUri: string }) {
	const [dimensions, setDimensions] = useState<{
		width: number;
		height: number;
	}>({ width: 1, height: 1 });
	const [loaded, setLoaded] = useState(true);
	const [aspectRatio, setAspectRatio] = useState(true);

	useEffect(() => {
		Image.getSize(
			photoUri,
			(width, height) => {
				setDimensions({ width: width, height: height });
			},
			(error) => {
				console.error(error);
			}
		);
		console.log(dimensions);
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
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Pressable onPress={toggleAspectRatio}>
					<Image
						source={{ uri: photoUri }}
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
						}}
					/>
				</Pressable>
			</View>
			{/* <Text>{JSON.stringify(dimensions)}</Text> */}
		</View>
	);
}
