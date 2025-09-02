import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons"
import { colors } from "@/shared/colors";
import { useState } from "react";
import { DeletModal } from "./DeletModel";
import * as transactionService from "@/shared/service/dt-money/transaction.service"
import { useErrorHandle } from "@/shared/hooks/useErrorHandle";
import { useSnacbarContext } from "@/context/snackbar.context";

interface Params {
    transactionId: number
}

export const RightAction: React.FC<Params> = ({ transactionId }) => {

    const [modalVisible, setModalVisible] = useState(false)

    const showModal = () => setModalVisible(true)
    const hideModal = () => setModalVisible(false)
    const [loading, setLoading] = useState(false)
    const {notify} = useSnacbarContext()

    const { handleError } = useErrorHandle()

    const handleDeletTransaction = async () => {
        try {
            setLoading(true)
            await transactionService.deletTransaction(transactionId)
            hideModal()
            notify({
                message:"Transação deletada com sucesso!",
                messageType:"SUCCESS"
            })
        } catch (error) {
            handleError(error, "Falha ao deletar a transação")
        }finally{
            setLoading(false)
        }
    }

    return (
        <>
            <TouchableOpacity
                activeOpacity={0.8}
                className="h-[140] bg-accent-red-background-primary w-[80] rounded-r-[6] justify-center items-center"
                onPress={showModal}
            >
                <MaterialIcons name="delete-outline" color={colors.white} size={30} />
            </TouchableOpacity>
            <DeletModal loading={loading} visible={modalVisible} hideModal={hideModal} handleDeleteTransaction={handleDeletTransaction} />
        </>
    )
}