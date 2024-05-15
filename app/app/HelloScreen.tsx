import { Link, router } from "expo-router";
import { Button, Text, View } from "react-native";
import { useContext } from "react";
import { AuthContext, AuthContextType } from "providers/authProvider";
import TopBar from "components/topbar";
import { styled } from "nativewind";

export default function HelloScreen() {
	const authContext = useContext(AuthContext) as AuthContextType;
	return (
		<>
			<View className="bg-[#F8F1E8] w-full h-full">
				{authContext.user ? (
					// User is logged in
					<View className="flex w-full">
						<TopBar />
						<View className="flex items-center justify-center w-full">
							<View className="min-h-[50vh]"></View>
							{/* JOIN BUTTON */}
							<Link
								href="/joinAlbum"
								className="bg-[#FF995F] px-8 py-6 text-4xl font-bold rounded-xl text-white text-center"
								style={{
									shadowColor: "#974A04",
									shadowRadius: 4,
									shadowOpacity: 1,
									elevation: 6,
								}}
							>
								<Text>JOIN EVENT</Text>
							</Link>
							<View className="flex gap-4 mt-1 bg-inherit">
								{/* OPEN ALBUMS BUTTON */}
								<Link
									href=""
									className="bg-white px-4 py-2 text-2xl font-bold rounded-xl text-[#FF995F] text-center "
									style={{
										shadowColor: "#686868",
										shadowRadius: 4,
										shadowOpacity: 0.43,
										elevation: 6,
									}}
								>
									<Text>OPEN ALBUMS</Text>
								</Link>
								{/* CREATE BUTTON */}
								<Link
									href=""
									className="bg-white px-4 py-2 text-2xl font-bold rounded-xl text-[#FF995F] text-center"
									style={{
										shadowColor: "#686868",
										shadowRadius: 4,
										shadowOpacity: 0.43,
										elevation: 6,
									}}
								>
									<Text>CREATE EVENT</Text>
								</Link>
							</View>
						</View>
					</View>
				) : (
					// User is not logged in
					<>
						<View className="flex items-center justify-center">
							<Text>You need to login to continue!</Text>
							<Button
								title="Show login options"
								onPress={() => router.push("/loginModal")}
							/>
						</View>
					</>
				)}
			</View>
		</>
	);
}
