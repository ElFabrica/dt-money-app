import { useTransactionContext } from "@/context/transaction.context"
import { useErrorHandle } from "@/shared/hooks/useErrorHandle"
import { useEffect } from "react"
import { ActivityIndicator, FlatList, RefreshControl, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { ListHeader } from "./ListHeader"
import { TransactionCard } from "@/screens/Home/TransactionCard"
import { EmptyList } from "./EmptyList"
import { colors } from "@/shared/colors"


export const Home = () => {

    const { fetchCategories,
        fetchTransactions,
        transactions,
        refreshTransactions,
        loadMoreTransactions,
        handleLoadings,
        loadings
    } = useTransactionContext()


    const { handleError } = useErrorHandle()

    const handleFetchCategories = async () => {
        try {
            handleLoadings({
                key: "initial",
                value: true
            })
            await fetchCategories()
        } catch (error) {
            handleError(error, "Falha ao buscar as categorias")
        }
        finally {
            handleLoadings({
                key: "initial",
                value: false
            })
        }
    }

    const handleFetchInitialTransactions = async () => {
        try {
            handleLoadings({
                key: "initial",
                value: true
            })
            await fetchTransactions({ page: 1 })
        } catch (error) {
            handleError(error, "Falha ao buscar transações.")
        } finally {
            handleLoadings({
                key: "initial",
                value: false
            })
        }
    }

    const handleLoadMoreTransactions = async () => {
        try {
            handleLoadings({
                key: "loadMore",
                value: true
            })
            await loadMoreTransactions();

        } catch (error) {
            handleError(error, "Falha ao carregar novas transações.")
        } finally {
            handleLoadings({
                key: "loadMore",
                value: false
            })
        }
    }


    const handleRefreshTransactions = async () => {
        try {
            handleLoadings({
                key: "refresh",
                value: true
            });
            await refreshTransactions();
        } catch (error) {
            handleError(error, "Falha ao recarregar as transações")
        } finally {
            handleLoadings({
                key: "refresh",
                value: false
            })
        }
    }

    useEffect(() => {
        (async () => {
            await Promise.all([handleLoadMoreTransactions, handleFetchInitialTransactions(), handleFetchCategories()])
        })()
    }, [])
    return (
        <SafeAreaView className="flex-1 bg-background-secondary">
            <FlatList
                className="bg-background-secondary"
                data={transactions}
                keyExtractor={({ id }) => `transaction${id}`}
                renderItem={({ item }) => <TransactionCard transaction={item} />}
                ListHeaderComponent={<ListHeader />}
                onEndReached={handleLoadMoreTransactions}
                onEndReachedThreshold={0.5}
                ListFooterComponent={
                    loadings.loadMore ? <ActivityIndicator color={colors["accent-brand-light"]} size={"large"} /> : null
                }
                refreshControl={
                    <RefreshControl refreshing={loadings.refresh} onRefresh={handleRefreshTransactions} />}
                ListEmptyComponent={loadings.initial == true ? null : EmptyList}

            />
        </SafeAreaView>
    )
}