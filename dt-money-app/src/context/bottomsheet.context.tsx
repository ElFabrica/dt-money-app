import { createContext, PropsWithChildren, useCallback, useContext, useRef, useState } from "react"
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet"
import { View, TouchableWithoutFeedback } from "react-native"
import { colors } from "@/shared/colors"

interface BottomSheetContextType {
    openBottomSheet: (content: React.ReactNode, index: number) => void
    closeBottomSheet: () => void
}
export const BottomSheetContent = createContext<BottomSheetContextType>({} as BottomSheetContextType)


export const BottomSheetProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [content, setContent] = useState<React.ReactNode | null>(null)
    const bottomSheerRef = useRef<BottomSheet>(null)
    const snapPoints = ["70%", "90%"]
    const [index, setIndex] = useState(-1)
    const [isOpen, setIsOpen] = useState(false)

    const openBottomSheet = useCallback(
        (newContent: React.ReactNode, index: number) => {
            setIndex(index)
            setIsOpen(true)
            setContent(newContent)
            requestAnimationFrame(() => {
                bottomSheerRef.current?.snapToIndex(index)
            })
        },
        [],
    )
    const closeBottomSheet = useCallback(() => {
        setContent(null)
        setIsOpen(false)
        setIndex(-1)
        bottomSheerRef.current?.close()
    }, [])
    const handleSheetChanges = useCallback((index: number) => {
        if (index === -1) {
            setIsOpen(false)
        }
    }, [])

    return (
        <BottomSheetContent.Provider
            value={{
                openBottomSheet,
                closeBottomSheet
            }}>
            {children}
            {
                isOpen && (
                    <TouchableWithoutFeedback
                        onPress={closeBottomSheet}
                    >
                        <View className="absolute inset-0 bg-black/70 z-1"/>
           
                    </TouchableWithoutFeedback>
                )}

            <BottomSheet
                ref={bottomSheerRef}
                snapPoints={snapPoints}
                style={{ zIndex: 2 }}
                index={index}
                enablePanDownToClose
                onChange={handleSheetChanges}
                backgroundStyle={{
                    backgroundColor: colors["background-secondary"],
                    borderTopLeftRadius: 32,
                    borderTopRightRadius: 32,
                    elevation: 9
                }}

            >
                <BottomSheetScrollView>{content}</BottomSheetScrollView>

            </BottomSheet>
        </BottomSheetContent.Provider>
    )
}


export const useBottomSheetContext = () => {
    return useContext(BottomSheetContent)
}