import { Text, View } from "react-native";
import { Link } from "expo-router";

type BobProps = BobPropsLink | BobPropsButton;

type BobPropsLink = {
	text: string;
	href: string;
};

type BobPropsButton = {
	text: string;
	onClick: () => void;
};

export default function BigOrangeButton(props: BobProps) {
	if ("href" in props) {
		return (
			<Link
				href={props.href}
				className="bg-[#FF995F] px-8 py-6 text-4xl font-bold rounded-xl text-white text-center"
				style={{
					shadowColor: "#974A04",
					shadowRadius: 4,
					shadowOpacity: 1,
					elevation: 6,
				}}
			>
				<Text>{props.text}</Text>
			</Link>
		);
	} else {
		return (
			<Text
				className="bg-[#FF995F] px-8 py-6 text-4xl font-bold rounded-xl text-white text-center"
				style={{
					shadowColor: "#974A04",
					shadowRadius: 4,
					shadowOpacity: 1,
					elevation: 6,
				}}
				onPress={props.onClick}
			>
				{props.text}
			</Text>
		);
	}
}
