import { View, Button, Text } from "react-native";
import { CalendarDaysIcon, ClockIcon } from "react-native-heroicons/outline";
import {
	DateTimePickerAndroid,
	DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
type DateTimePickerProps = {
	date: Date;
	setDate: (date: Date) => void;
	label: string;
};

export default function DateTimerPicker(props: DateTimePickerProps) {
	const onChange = (
		event: DateTimePickerEvent,
		selectedDate?: Date | undefined
	) => {
		props.setDate(selectedDate!);
	};

	const showMode = (currentMode: "date" | "time") => {
		DateTimePickerAndroid.open({
			value: props.date,
			mode: currentMode,
			is24Hour: true,
			onChange,
		});
	};

	const showDatepicker = () => {
		showMode("date");
	};

	const showTimepicker = () => {
		showMode("time");
	};
	return (
		<View className="flex flex-col justify-center items-center pl-3 pr-3 mb-6">
			<View className="flex flex-row items-end">
				<Text className="text-left grow text-xl font-bold">
					{props.date.toLocaleString()}
				</Text>
				<Text className="pr-2" onPress={showDatepicker}>
					<CalendarDaysIcon color="black" size={28} />
				</Text>
				<Text className="pr-2" onPress={showTimepicker}>
					<ClockIcon color="black" size={28} />
				</Text>
			</View>
			<View className="bg-red-600 h-1 w-full"></View>
			<Text className="w-full text-left">{props.label}</Text>
		</View>
	);
}
