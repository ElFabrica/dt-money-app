import { CreateTransactionInterface } from "@/shared/interface/https/create-transaction-request";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import {MaterialIcons} from "@expo/vector-icons"
import { colors } from "@/shared/colors";
import { useBottomSheetContext } from "@/context/bottomsheet.context";
import { TextInput } from "react-native-gesture-handler";
import CurrencInput from "react-native-currency-input"
import { TransactionTypeSelector } from "../SelectType";
import { SelectCategoryModal } from "../SelectCategoryModal";

export function NewTransaction() {

    const { closeBottomSheet } = useBottomSheetContext()

    const [transaction, setTransaction] = useState<CreateTransactionInterface>({
        categoryId: 0,
        description: "",
        typeId: 0,
        value: 0
        
    })

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

                <SelectCategoryModal/>
                
                <TransactionTypeSelector
                 typeId={transaction.typeId}
                 setTransactionType={(typeId) => setTransactionData("typeId", typeId) }
                  />
                
            </View>
        </View>
    )
}