import { AppHeader } from "@/components/appHeader"
import { useAuthContext } from "@/context/auth.context"
import { Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export const Home = () => {

    const { handleLogout } = useAuthContext()
    return (
        <SafeAreaView className="flex-1 bg-background-primary">
            <AppHeader />
            <View>
                <TouchableOpacity onPress={handleLogout}>
                    <Text>
                        Voltar
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}