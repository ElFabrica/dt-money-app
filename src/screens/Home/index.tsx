import { AppHeader } from "@/components/AppHeader"
import { useAuthContext } from "@/context/auth.context"
import { useTransactionContext } from "@/context/transaction.context"
import { useErrorHandle } from "@/shared/hooks/useErrorHandle"
import { useEffect } from "react"
import { FlatList, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { ListHeader } from "./ListHeader"


export const Home = () => {

    const { handleLogout } = useAuthContext();
    const { fetchCategories, fetchTransactions } = useTransactionContext()
    const { handleError } = useErrorHandle()

    const handleFetchCategories = async () => {
        try {
            await fetchCategories()
        } catch (error) {
            handleError(error, "Falha ao buscar as categorias")
        }
    }

    useEffect(() => {
        (async () => {
            await Promise.all([handleFetchCategories(), fetchTransactions()])
        })()
    }, [])
    return (
        <SafeAreaView className="flex-1 bg-background-secondary">

            <FlatList
                className="bg-background-secondary"
                data={[]}
                renderItem={() => <></>}
                ListHeaderComponent={<ListHeader />}

            />
        </SafeAreaView>
    )
}