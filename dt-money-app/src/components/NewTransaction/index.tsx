import { CreateTransactionInterface } from "@/shared/interface/https/create-transaction-request";
import { useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import {MaterialIcons} from "@expo/vector-icons"
import { colors } from "@/shared/colors";
import { useBottomSheetContext } from "@/context/bottomsheet.context";
import { TextInput } from "react-native-gesture-handler";
import CurrencInput from "react-native-currency-input"
import { TransactionTypeSelector } from "../SelectType";
import { SelectCategoryModal } from "../SelectCategoryModal";
import { transactionSchema } from "./schema";
import * as Yup from "yup"
import { AppButton } from "@/routes/AppButton";
import { ErrorMessage } from "../ErrorComponent";
import { useTransactionContext } from "@/context/transaction.context";
import { useErrorHandle } from "@/shared/hooks/useErrorHandle";

type ValidationErrorsTypes = Record<keyof CreateTransactionInterface, string>

export function NewTransaction() {

    const { closeBottomSheet } = useBottomSheetContext()
    const { createTransaction } = useTransactionContext()
    const { handleError } = useErrorHandle()
    const [validationErrors, setValidationErrors] = useState<ValidationErrorsTypes>()
    const [loading, setLoading] = useState(false)

    const [transaction, setTransaction] = useState<CreateTransactionInterface>({
        categoryId: 0,
        description: "",
        typeId: 0,
        value: 0
        
    })

    async function handleCreateTransaction() {
        try {
            setLoading(true)
            await transactionSchema.validate(transaction, {abortEarly: false})
            await createTransaction(transaction)
            closeBottomSheet()
        } catch (error) {
            if(error instanceof Yup.ValidationError){
                const errors = {} as ValidationErrorsTypes;

                error.inner.forEach((err)=> {
                    if(err.path){
                        errors[err.path as keyof CreateTransactionInterface] = err.message
                    }
                });
                setValidationErrors(errors)
                console.log(validationErrors)
            }else{
                handleError(error, "Falha ao criar transação")
            }
        }finally{
            setLoading(false)
            
        }
    }

    function setTransactionData(key: keyof CreateTransactionInterface, value: string | number){
        setTransaction((prevData) => ({...prevData, [key]: value}))
    }

    return(
        <View className="px-8 py-5">
            <TouchableOpacity className="w-full flex-row items-center justify-between"
          
            >
                <Text className="text-white text-xl font-bold">
                    Nova Transação
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
                onChangeText={(text) => setTransactionData("description", text) }
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
                onSelect={(categoryId)=> setTransactionData("categoryId", categoryId)}
                />
                {
                        validationErrors?.categoryId && (<ErrorMessage>{validationErrors.categoryId}</ErrorMessage>)
                    }
                <TransactionTypeSelector
                 typeId={transaction.typeId}
                 setTransactionType={(typeId) => setTransactionData("typeId", typeId) }
                  />
                  {
                        validationErrors?.typeId && (<ErrorMessage>{validationErrors.typeId}</ErrorMessage>)
                    }
                  <View className="my-4">
                    <AppButton onPress={handleCreateTransaction}>
                        {loading ? <ActivityIndicator color={colors.white}/> : "Registrar"} 
                         
                    </AppButton>
                  </View>
                
            </View>
        </View>
    )
}