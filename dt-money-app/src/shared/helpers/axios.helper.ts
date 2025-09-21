import AsyncStorage from "@react-native-async-storage/async-storage";
import { AxiosInstance } from "axios";
import { IAuthenticateRespose } from "../interface/https/authenticate.response";

export const addTokenToRequest = ( axiosInstance: AxiosInstance ) => {
    axiosInstance.interceptors.request.use(async (config) => {
        const userData = await AsyncStorage.getItem("dt-money-user")

        if(userData) {
            const { token } = JSON.parse(userData) as  IAuthenticateRespose
            if(token){
                config.headers.Authorization = `Bearer ${token}`
            }
        }
        return config
    })
}