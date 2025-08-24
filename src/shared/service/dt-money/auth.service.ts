import { FormLoginParams } from "@/screens/login/LoginForm";
import { dtMoneyApi } from "@/shared/api/dt-money";
import { IAuthenticateRespose } from "@/shared/interface/https/authenticate.response";

export async function authenticate (userData: FormLoginParams): Promise<IAuthenticateRespose> {
    const { data } = await dtMoneyApi.post<IAuthenticateRespose>("/auth/login", userData)

    return data
}

export async function registerUser(userData: FormLoginParams): Promise<IAuthenticateRespose>{
    const { data } = await dtMoneyApi.post<IAuthenticateRespose>("/auth/register", userData)
    return data
}