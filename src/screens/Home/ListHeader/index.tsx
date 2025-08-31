import { AppHeader } from "@/components/AppHeader";
import { ScrollView, Text, View } from "react-native";

export function ListHeader(){
    return<>
        <AppHeader/>
        <View className="h-[150] w-[full]">
             <View className="h-[50] bg-background-primary">
                <ScrollView horizontal showsHorizontalScrollIndicator={false}
                className="absolute pl-6 h-[141]"
                >
                    <Text>texte</Text>
                </ScrollView>
             </View>
        </View>
    </>
}