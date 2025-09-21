import { Text, TouchableOpacity, View } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"
import { colors } from "@/shared/colors"
import { useBottomSheetContext } from "@/context/bottomsheet.context"
import { DateFilter } from "./DateFilter"
import { CategoryFilter } from "./CategoryFinter"
import { TypeFilter } from "./TypeFilter"
import { AppButton } from "@/routes/AppButton"
import { useTransactionContext } from "@/context/transaction.context"
import { useErrorHandle } from "@/shared/hooks/useErrorHandle"

export const TransactionsFilter = () => {
    const { fetchTransactions, handleLoadings, resetFilter } = useTransactionContext()
    const { closeBottomSheet } = useBottomSheetContext()
    const { handleError } = useErrorHandle()

    const handleFetchTransations = async () => {
        try {
            handleLoadings({ key: "refresh", value: true })
            await fetchTransactions({ page: 1, })
            closeBottomSheet
        } catch (error) {
            handleError(error, "Falha ao aplicar filtros.")
        } finally {
            handleLoadings({ key: "refresh", value: false })
            closeBottomSheet()
        }
    }
    const handleResetFilters = async () => {
        try {
            await resetFilter()
            closeBottomSheet
        } catch (error) {
            handleError(error, "Falha ao limpar filtros.")
        } finally {
            handleLoadings({ key: "refresh", value: false })
            closeBottomSheet()
        }
    }

    return (



        <View className="flex-1 bg-gray[1000] p-6">
            <View className="flex-row justify-between">
                <Text className="text-xl font-bold mb-5 text-white">Filtrar transações</Text>
                <TouchableOpacity onPress={closeBottomSheet}>
                    <MaterialIcons name="close" size={20} color={colors.gray[600]} />
                </TouchableOpacity>
            </View>
            <DateFilter />
            <CategoryFilter />
            <TypeFilter />
            <View className="flex-row gap-4 mt-8">
                <AppButton onPress={handleResetFilters} mode="outline" widthFull={false} className="flex-1">Limpar filtros</AppButton>
                <AppButton onPress={handleFetchTransations} widthFull={false} className="flex-1">Filtrar</AppButton>
            </View>
        </View>)
}