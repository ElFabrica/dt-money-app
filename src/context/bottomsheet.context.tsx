import { createContext, PropsWithChildren, useCallback, useContext, useRef, useState } from "react"
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet"
import { View, TouchableWithoutFeedback } from "react-native"
import { colors } from "@/shared/colors"

interface BottomsheetContextType {
    openBottomSheet: (content: React.ReactNode, index: number) => void
    closeBottomSheet: () => void
}
export const BottomSheetContent = createContext({} as BottomsheetContextType)
export const BottomSheetProvider: React.FC<PropsWithChildren> = ({ children }) => {

    const [content, setContent] = useState<React.ReactNode | null>(null)
    const bottomSheerRef = useRef<BottomSheet | null>(null)
    const snapPoints = ["70%", "90%"]
    const [index, setIndex] = useState(-1)
    const [isOpen, setIsOpen] = useState(false)

    const openBottomSheet = useCallback(
        (newContent: React.ReactNode, index: number) => {
            setIndex(index)
            setContent(newContent)
            setIsOpen(true)
            requestAnimationFrame(() => { 
                bottomSheerRef.current?.snapToIndex(index)
            })
        }, [])
    const closeBottomSheet = useCallback(() => {
        setContent(null)
        setContent(false)
        setIndex(-1)
        bottomSheerRef.current?.close()
    }, [])
        const handleSheetChanges = useCallback((index: number)=> {
            if(index ===-1){
                setIsOpen(false)
            }
    },[]) 
    
    return (
        <BottomSheetContent.Provider
            value={{
                openBottomSheet,
                closeBottomSheet
            }}
        >
            {children}
            {
                isOpen && (
                    <TouchableWithoutFeedback>
                        <View className="absolute insert-0 bg-black/70 z-1">

                        </View>
                    </TouchableWithoutFeedback>
                )}
            <BottomSheet ref={bottomSheerRef}
                snapPoints={snapPoints}
                style={{ zIndex: 2 }}
                index={index}
                enablePanDownToClose
                onChange={handleSheetChanges}
                backgroundStyle={{
                    backgroundColor:colors["background-secondary"],
                    borderTopLeftRadius:32,
                    borderTopRightRadius:32,
                    elevation: 9
                }}

            >
                <BottomSheetScrollView>
                    {content}

                </BottomSheetScrollView>
            </BottomSheet>
        </BottomSheetContent.Provider>
    )
}


export const useBottomSheetContext = () =>  {
    return useContext(BottomSheetContent)
}