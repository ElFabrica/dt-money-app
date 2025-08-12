import { FormLoginParams } from "@/screens/Login/LoginForm"
import { FormRegisterParams } from "@/screens/Register/RegisterForm"
import { createContext, FC, PropsWithChildren, useState } from "react"

type AuthContextType ={
    user: null
    token: string | null
    handleAuthenticate: ( params: FormLoginParams) => Promise<void>
    handleRegister: (params: FormRegisterParams) => Promise<void>
    handleLogout: () => void
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

 export const AuthContextProvider: FC<PropsWithChildren > = ({ children }) => {
    const [user, setUser] = useState (null)
    const [token, serToken] = useState<string | null>(null)
     


    return(
        <AuthContext.Provider
        value={{
            
        }}
        >
            {children}
        </AuthContext.Provider>
    )
 }