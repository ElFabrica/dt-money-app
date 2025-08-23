import { FormLoginParams } from "@/screens/login/LoginForm"
import { FormRegisterParams } from "@/screens/Register/RegisterForm"
import React, { createContext, useContext, useState } from "react"
import * as authService from "@/shared/service/dt-money/auth.service"
import { IUser } from "@/shared/interface/user-interface"
type AuthContextType = {
    user: IUser | null
    token: string | null
    handleAuthenticate: (params: FormLoginParams) => Promise<void>
    handleRegister: (params: FormRegisterParams) => Promise<void>
    handleLogout: () => void
}

export const AuthContext = createContext<AuthContextType>(
    {} as AuthContextType)

export function AuthContextProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<IUser | null>(null)
    const [token, setToken] = useState<string | null>(null)

    const handleAuthenticate = async ( userData : FormLoginParams) => {
        const { token, user } = await authService.authenticate(userData)
        setUser(user)
        setToken(token)
        console.log(token, user)
    }

    const handleRegister = async (formData: FormRegisterParams) => {

    }
    const handleLogout = () => {

    }

    return (
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
    if (!context) {
        throw new Error("useAuthContext deve ser usado dentro de AuthContextProvider")
    }
    return context
}