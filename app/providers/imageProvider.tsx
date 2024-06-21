import { createContext, useState } from "react";

export type ImageContextType = {
	image: string | null;
	setNewImage: (image: string, width: number, height: number) => void;
	dimensions: { width: number; height: number } | null;
	clearImage: () => void;
};

export const ImageContext = createContext<ImageContextType | null>(null);

export default function ImageProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [image, setImage] = useState<string | null>(null);
	const [dimensions, setDimensions] = useState<{
		width: number;
		height: number;
	} | null>(null);

	const setNewImage = (image: string, width: number, height: number) => {
		setImage(image);
		setDimensions({ width, height });
	};

	const clearImage = () => {
		setImage(null);
		setDimensions(null);
	};

	return (
		<ImageContext.Provider
			value={{
				image,
				setNewImage,
				dimensions,
				clearImage,
			}}
		>
			{children}
		</ImageContext.Provider>
	);
}
