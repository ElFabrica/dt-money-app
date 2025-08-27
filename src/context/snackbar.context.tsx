import { createContext, FC, PropsWithChildren, useState } from "react";

export type SnackbarMessageType = "ERROR"| "SUCESS"

interface NotifyMessageParams {
    message: string,
    messageType: SnackbarMessageType
}

export type SnackBarContextType = {
    message: string | null
    type: SnackbarMessageType
    notify: (parame: NotifyMessageParams) => void
}

const SnackbarContext = createContext({} as SnackBarContextType)

export const SnackBarContextProvider: FC<PropsWithChildren> = ({children }) => {

    const [message, setMessage] = useState<string|null>(null)
    const [type, setType] = useState <SnackbarMessageType | null>(null)

    const notify = ({ message, messageType }: NotifyMessageParams) =>{
        setMessage(message)
        setType(messageType)
        setTimeout(() =>{
            setMessage(null)    
            setType(null)
        }, 3000)
    }
return(
<SnackbarContext.Provider value={{
    message,
    type,
    notify
}}>
{children}
</SnackbarContext.Provider>
)
}