import { createContext, useState } from "react";

export type ImageContextType = {
	image: string | null;
	setNewImage: (image: string, width: number, height: number) => void;
	dimensions: { width: number; height: number } | null;
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

	return (
		<ImageContext.Provider
			value={{
				image,
				setNewImage,
				dimensions,
			}}
		>
			{children}
		</ImageContext.Provider>
	);
}
