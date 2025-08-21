import { FormLoginParams } from "@/screens/login/LoginForm"
import { FormRegisterParams } from "@/screens/Register/RegisterForm"
import { createContext, FC, PropsWithChildren, useContext, useState } from "react"

type AuthContextType ={
    user: null
    token: string | null
    handleAuthenticate: ( params: FormLoginParams) => Promise<void>
    handleRegister: (params: FormRegisterParams) => Promise<void>
    handleLogout: () => void
}

export const AuthContext = createContext<AuthContextType | null>(
    {} as AuthContextType)

 export const AuthContextProvider: FC<PropsWithChildren > = ({ children }) => {
    const [user, setUser] = useState (null)
    const [token, serToken] = useState<string | null>(null)
    
    const handleAuthenticate = async ({email, password}:FormLoginParams) =>{

    }

    const handleRegister = async (formData: FormRegisterParams) => {

    }
    const handleLogout = () =>{

    }

    return(
        <AuthContext.Provider
        value={{
            handleAuthenticate, 
            handleRegister, 
            handleLogout, 
            token, 
            user,
        }}
        >
            {children}
        </AuthContext.Provider>
    );
 }

 export const useAuthContext = () => {
    const context = useContext(AuthContext)

    return context
 }