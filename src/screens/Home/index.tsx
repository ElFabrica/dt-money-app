import { AppHeader } from "@/components/AppHeader"
import { useAuthContext } from "@/context/auth.context"
import { useTransactionContext } from "@/context/transaction.context"
import { useErrorHandle } from "@/shared/hooks/useErrorHandle"
import { useEffect } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"


export const Home = () => {

    const { handleLogout } = useAuthContext();
    const { fetchCategories } = useTransactionContext()
    const { handleError } = useErrorHandle()

    const handleFetchCategories = async () => {
        try {
            await fetchCategories()
        } catch (error) {
            handleError(error, "Falha ao buscar as categorias")
        }
    }

     useEffect(() => {
        (async ()  => {
            handleFetchCategories()
        })()}, [])
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