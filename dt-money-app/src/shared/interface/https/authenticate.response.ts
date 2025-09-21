import { IUser } from "../user-interface";

export interface IAuthenticateRespose { 
    user: IUser
    token: string
}