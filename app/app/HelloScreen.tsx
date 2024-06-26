import { Link, router } from "expo-router";
import { Button, Pressable, Text, View } from "react-native";
import { useContext } from "react";
import { AuthContext, AuthContextType } from "providers/authProvider";
import TopBar from "components/topbar";
import { styled } from "nativewind";
import BigOrangeButton from "components/BigOrangeButton";

export default function HelloScreen() {
	const authContext = useContext(AuthContext) as AuthContextType;
	return (
		<>
			<View className="bg-[#F8F1E8] w-full h-full">
				{authContext.user ? (
					// User is logged in
					<View className="flex w-full">
						<TopBar />
						<View className="flex items-center justify-end w-full">
							<View className="min-h-[40vh]"></View>
							{/* JOIN BUTTON */}

							<BigOrangeButton
								href="/joinAlbum"
								text="JOIN EVENT"
							/>
							<View className="flex gap-4 mt-1 bg-inherit">
								{/* ! TODO TEST */}
								{/* <Link
									//! change this to the correct event id on release
									//@ts-ignore
									href="event/[9uw0He8gBeg307b6T8mi]"
									className="bg-white px-4 py-2 text-2xl font-bold rounded-xl text-[#FF995F] text-center shadow-md shadow-[#686868]"
								>
									<Text>DRAWER</Text>
								</Link> */}
								{/* OPEN ALBUMS BUTTON */}
								<Link
									href="/albums"
									className="bg-white px-4 py-2 text-2xl font-bold rounded-xl text-[#FF995F] text-center shadow-md shadow-[#686868]"
								>
									<Text>OPEN ALBUMS</Text>
								</Link>
								{/* CREATE BUTTON */}
								<Link
									href="/createEvent"
									className="bg-white px-4 py-2 text-2xl font-bold rounded-xl text-[#FF995F] text-center shadow-md shadow-[#686868]"
								>
									<Text>CREATE EVENT</Text>
								</Link>
								{/* SHARE BUTTON */}
								{/* <Link
									href="/share/XTSKpTv6AZ4Xu6xXbeQA"
									className="bg-white px-4 py-2 text-2xl font-bold rounded-xl text-[#FF995F] text-center shadow-md shadow-[#686868]"
								>
									<Text>SHARE EVENT</Text>
								</Link> */}
							</View>
						</View>
					</View>
				) : (
					// User is not logged in
					<>
						<View className="flex items-center justify-center">
							<Text>You need to login to continue!</Text>
							{/* <Button
								title="Show login options"
								onPress={() => router.push("/loginModal")}
							/> */}
							<Link href="/loginModal" asChild>
								<Pressable className="bg-main-orange text-2xl p-4">
									<Text>Login</Text>
								</Pressable>
							</Link>
						</View>
					</>
				)}
			</View>
		</>
	);
}
