import axios from "axios"
import { Platform } from "react-native"
import { string } from "yup"


const baseURL = Platform.select({
    ios: "https://localhost:3001",
    android: "http://10.0.2.2.:3001"
})
export const dtMoney = axios.create({
    baseURL
})