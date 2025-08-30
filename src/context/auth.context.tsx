import { FormLoginParams } from "@/screens/login/LoginForm"
import { FormRegisterParams } from "@/screens/Register/RegisterForm"
import React, { createContext, useContext, useState } from "react"
import * as authService from "@/shared/service/dt-money/auth.service"
import { IUser } from "@/shared/interface/user-interface"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { IAuthenticateRespose } from "@/shared/interface/https/authenticate.response"

type AuthContextType = {
    user: IUser | null
    token: string | null
    handleAuthenticate: (params: FormLoginParams) => Promise<void>
    handleRegister: (params: FormRegisterParams) => Promise<void>
    handleLogout: () => void
    restoreUserSession: () => Promise<String|null>
}

export const AuthContext = createContext<AuthContextType>(
    {} as AuthContextType)

export function AuthContextProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<IUser | null>(null)
    const [token, setToken] = useState<string | null>(null)

    const handleAuthenticate = async ( userData : FormLoginParams) => {
        const { token, user } = await authService.authenticate(userData)
        await AsyncStorage.setItem("dt-money-user", JSON.stringify({user, token}))
        setUser(user)
        setToken(token)
        console.log(token, user)
    }

    const handleRegister = async (formData: FormRegisterParams) => {
        const { token, user} = await authService.registerUser(formData)
        await AsyncStorage.setItem("dt-money-user", JSON.stringify({user, token}))
        
        setUser(user)
        setToken(token)
    }
    const handleLogout = async () => {
         await AsyncStorage.clear()
         setToken(null)
         setUser(null)
    }
    async function restoreUserSession() {
        const userData = await AsyncStorage.getItem("dt-money-user")
    
    if(userData) {
        const {token, user} = JSON.parse(userData) as IAuthenticateRespose
        setUser(user)
        setToken(token)
    }
    return userData 
}

    return (
        <AuthContext.Provider
            value={{
                handleAuthenticate,
                handleRegister,
                handleLogout,
                restoreUserSession,
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
    if (!context) {
        throw new Error("useAuthContext deve ser usado dentro de AuthContextProvider")
    }
    return context
}