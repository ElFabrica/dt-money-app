import { useTransactionContext } from "@/context/transaction.context"
import clsx from "clsx"
import { Checkbox } from "expo-checkbox"
import { useMemo, useState } from "react"
import { FlatList, Modal, Text, TouchableOpacity,TouchableWithoutFeedback, View } from "react-native"

interface Props {
    selectCaregory: number;
    onSelect: (categotyId: number) => void
}

export const SelectCategoryModal: React.FC<Props> = ({
    onSelect,
    selectCaregory
}) => {

    const [showModal, setShowModal] = useState(false)
    const handleModal = () => setShowModal((prevState) => !prevState)
    const handleSelect = (categoryId: number) => {
        onSelect(categoryId);
        setShowModal(false)
    }
    const { categories } = useTransactionContext()
    const selected = useMemo(() => categories.find(({ id }) => id === selectCaregory),
        [categories, selectCaregory])

    return (
        <>
            <TouchableOpacity onPress={handleModal} 
            className="h-[50] bg-background-primary my-2 rounded-[6] pl-4 justify-center">
                <Text className={clsx("text-gray-700 text-lg", selected ? "text-white" : "text-gray-700")}>
                    {selected?.name ?? "Categoria"}
                </Text>
            </TouchableOpacity>

            <Modal visible={showModal} transparent animationType="slide">
                <TouchableWithoutFeedback onPress={handleModal} >
                    <View className="flex-1 justify-center items-center bg-black/50">
                        <View className="w-[90%] bg-background-secondary p-4 rounded-xl">
                            <Text className="text-white text-lg mb-4">Selecione uma categoria</Text>
                            <FlatList
                                keyExtractor={(item) => `category-${item.id}`}
                                data={categories}
                                renderItem={({ item }) => (
                                    <TouchableOpacity className="flex-row items-center bg-gray-800 rounded-lg mb-2 p-4"
                                        onPress={() => handleSelect(item.id)}
                                    >

                                        <Checkbox
                                            value={selected?.id === item.id}
                                            onValueChange={() => handleSelect(item.id)}
                                            className="mr-2"
                                        />
                                        <Text className="text-white text-lg">{item.name}</Text>
                                    </TouchableOpacity>
                                )}/>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </>
    )
}