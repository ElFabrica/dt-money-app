import { AppHeader } from "@/components/AppHeader"
import { useAuthContext } from "@/context/auth.context"
import { useTransactionContext } from "@/context/transaction.context"
import { useErrorHandle } from "@/shared/hooks/useErrorHandle"
import { useEffect } from "react"
import { FlatList, RefreshControl, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { ListHeader } from "./ListHeader"
import { TransactionCard } from "@/screens/Home/TransactionCard"


export const Home = () => {

    const { handleLogout } = useAuthContext();
    const { fetchCategories, 
        fetchTransactions, 
        transactions, 
        refreshTransactions,
        loading
    } = useTransactionContext()
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
            await Promise.all([handleFetchCategories(), fetchTransactions({page:1})])
        })()
    }, [])
    return (
        <SafeAreaView className="flex-1 bg-background-secondary">

            <FlatList
                className="bg-background-secondary"
                data={transactions}
                keyExtractor={({id}) => `transaction${id}`}
                renderItem={({item}) => <TransactionCard transaction={item}/>}
                ListHeaderComponent={<ListHeader />}
                onEndReached={() => console.log("Olha o fim ai doido")}
                refreshControl={
                    <RefreshControl refreshing={loading} onRefresh={refreshTransactions}/>
                }

            />
        </SafeAreaView>
    )
}