import { useEffect, useState } from "react"
import { Keyboard } from "react-native"

export const useKeyboardVisible =() => {
    const [isKeyBoardVisible, setIsKeyBoardVisible] = useState(false)
    useEffect(() =>{
        const keyboardShowListener =  Keyboard.addListener("keyboardDidShow", () => {
            setIsKeyBoardVisible(true)
        })

        const keyboardDidHideListerner = Keyboard.addListener("keyboardDidHide", () => {
            setIsKeyBoardVisible(false)
        })

        return () => {
            keyboardDidHideListerner.remove()
            keyboardShowListener.remove()
        }
    }, [])
    return isKeyBoardVisible
}