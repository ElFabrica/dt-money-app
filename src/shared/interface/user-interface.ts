export interface IUser{
    id: number
    name: string
    email: string
    createAt: Date
    updateAt: Date | null
    deletedAt: string | null
}