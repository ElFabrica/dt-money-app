import { createContext, PropsWithChildren, useCallback, useState } from "react"

interface BottomsheetContextType {
    openBottomSheet: (content: React.ReactNode, index: number) => void
    closeBottomSheet: () => void
}

export const BottomSheetContent = createContext({} as BottomsheetContextType)
export const BottomSheetProvider: React.FC<PropsWithChildren> = ({children}) => {

    const [content, setContent] = useState<React.ReactNode | null >(null)

    const openBottomSheet = useCallback(
        (newContent: React.ReactNode, index: number) => {
            setContent(newContent )
    }, [])
    const closeBottomSheet = useCallback(()=> {
        setContent(null)
    }, [])
    return (
        <BottomSheetContent.Provider
            value={{
                openBottomSheet,
                closeBottomSheet
            }}
        >
            {children}
        </BottomSheetContent.Provider>
    )
}