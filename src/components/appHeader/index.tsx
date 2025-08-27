import { Image, Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons"
import { colors } from "@/shared/colors";

export function AppHeader(){
    return(
        <View>
            <View>
                <Image source={require("@/assets/Logo.png")} className="w-[130px] h-[30px]"/>
                <TouchableOpacity className="flex-row items-center gap-2 mt-2">
                    <MaterialIcons name="logout" color={colors.gray["700"]}/>
                    <Text className="text-gray-700  text-base">
                        
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}