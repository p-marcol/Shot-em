import React, { useContext } from "react";
import { ImageContext, ImageContextType } from "providers/imageProvider";
import { Image } from "react-native";
import SafeAreaViewWrapper from "components/SafeAreaViewWrapper";
import TopBar from "components/topbar";
import BigOrangeButton from "components/BigOrangeButton";
import sendImageToStorage from "lib/sendImageToStorage";
import { AuthContext, AuthContextType } from "providers/authProvider";

export default function ShowLatestImage() {
	const imageContext = useContext(ImageContext) as ImageContextType;
	const authContext = useContext(AuthContext) as AuthContextType;
	const { image, dimensions } = imageContext;

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
			<BigOrangeButton
				text="Share"
				onClick={() =>
					sendImageToStorage(
						imageContext,
						authContext,
						"XTSKpTv6AZ4Xu6xXbeQA"
					)
				}
			/>
		</SafeAreaViewWrapper>
	);
}
