import React, { useContext } from "react";
import { ImageContext, ImageContextType } from "providers/imageProvider";
import { Image } from "react-native";
import SafeAreaViewWrapper from "components/SafeAreaViewWrapper";
import TopBar from "components/topbar";

export default function ShowLatestImage() {
	const { image, dimensions } = useContext(ImageContext) as ImageContextType;

	return (
		<SafeAreaViewWrapper>
			<TopBar showDrawerButton={true} />
			{image && dimensions && (
				<Image
					source={{ uri: image }}
					style={{
						width: "100%",
						aspectRatio: dimensions.width / dimensions.height,
					}}
				/>
			)}
		</SafeAreaViewWrapper>
	);
}
