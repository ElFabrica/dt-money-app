import { UpdateTransactionInterface } from "@/shared/interface/https/update-transaction-request";
import { useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons"
import { colors } from "@/shared/colors";
import { useBottomSheetContext } from "@/context/bottomsheet.context";
import { TextInput } from "react-native-gesture-handler";
import CurrencInput from "react-native-currency-input"
import * as Yup from "yup"
import { AppButton } from "@/routes/AppButton";
import { useTransactionContext } from "@/context/transaction.context";
import { useErrorHandle } from "@/shared/hooks/useErrorHandle";
import { ErrorMessage } from "@/components/ErrorComponent";
import { SelectCategoryModal } from "@/components/SelectCategoryModal";
import { TransactionTypeSelector } from "@/components/SelectType";
import { transactionSchema } from "./schema";
import { Transaction } from "@/shared/interface/https/transaction";

type ValidationErrorsTypes = Record<keyof UpdateTransactionInterface, string>

interface Params {
    transaction: Transaction;
}

export const EditTransactionForm: React.FC<Params> = ({
    transaction: transactionToUpdate

}) => {

    const { closeBottomSheet } = useBottomSheetContext()
    const { updateTransaction } = useTransactionContext()
    const { handleError } = useErrorHandle()
    const [validationErrors, setValidationErrors] = useState<ValidationErrorsTypes>()
    const [loading, setLoading] = useState(false)

    const [transaction, setTransaction] = useState<UpdateTransactionInterface>({
        id: transactionToUpdate.id,
        categoryId: transactionToUpdate.categoryId,
        description: transactionToUpdate.description,
        typeId: transactionToUpdate.typeId,
        value: transactionToUpdate.value
    })

    async function handleUpdateTransaction() {
        try {
            setLoading(true)
            await transactionSchema.validate(transaction, { abortEarly: false })
            await updateTransaction(transaction)
            closeBottomSheet()
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                const errors = {} as ValidationErrorsTypes;

                error.inner.forEach((err) => {
                    if (err.path) {
                        errors[err.path as keyof UpdateTransactionInterface] = err.message
                    }
                });
                setValidationErrors(errors)
                console.log(validationErrors)
            } else {
                handleError(error, "Falha ao atualizar transação")
            }
        } finally {
            setLoading(false)

        }
    }

    function setTransactionData(key: keyof UpdateTransactionInterface, value: string | number) {
        setTransaction((prevData) => ({ ...prevData, [key]: value }))
    }

    return (
        <View className="px-8 py-5">
            <TouchableOpacity className="w-full flex-row items-center justify-between"

            >
                <Text className="text-white text-xl font-bold">
                    Editar transação
                </Text>
                <MaterialIcons
                    name="close"
                    color={colors.gray["700"]}
                    size={20}
                    onPress={closeBottomSheet}
                />
            </TouchableOpacity>
            <View className="flex-1 mt-8 mb-8">
                <TextInput
                    placeholder="Descrição"
                    placeholderTextColor={colors.gray["700"]}
                    onChangeText={(text) => setTransactionData("description", text)}
                    value={transaction.description}
                    className="text-white text-lg bg-background-primary my-2 rounded-[6] pl-4"
                />
                {
                    validationErrors?.description && (<ErrorMessage>{validationErrors.description}</ErrorMessage>)
                }
                <CurrencInput
                    value={transaction.value}
                    className="text-white text-lg bg-background-primary my-2 rounded-[6] pl-4"
                    prefix="R$ "
                    delimiter="."
                    separator=","
                    precision={2}
                    minValue={0}
                    onChangeValue={(value) => setTransactionData("value", value ?? 0)}
                />
                {
                    validationErrors?.value && (<ErrorMessage>{validationErrors.value}</ErrorMessage>)
                }
                <SelectCategoryModal
                    selectCaregory={transaction.categoryId}
                    onSelect={(categoryId) => setTransactionData("categoryId", categoryId)}
                />
                {
                    validationErrors?.categoryId && (<ErrorMessage>{validationErrors.categoryId}</ErrorMessage>)
                }
                <TransactionTypeSelector
                    typeId={transaction.typeId}
                    setTransactionType={(typeId) => setTransactionData("typeId", typeId)}
                />
                {
                    validationErrors?.typeId && (<ErrorMessage>{validationErrors.typeId}</ErrorMessage>)
                }
                <View className="my-4">
                    <AppButton onPress={handleUpdateTransaction}>
                        {loading ? <ActivityIndicator color={colors.white} /> : "Atualizar"}

                    </AppButton>
                </View>

            </View>
        </View>
    )
}