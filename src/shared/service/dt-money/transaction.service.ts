import { dtMoneyApi } from "@/shared/api/dt-money";
import { CreateTransactionInterface } from "@/shared/interface/https/create-transaction-request";
import { GetTransactionsParams, GetTransactionResponse } from "@/shared/interface/https/get-transaction.request";
import { TransactionCategory } from "@/shared/interface/https/transaction.category.response";
import qs from "qs"


export const getTransactionCategories = async (): Promise<TransactionCategory[]> => {
    const { data } = await dtMoneyApi.get<TransactionCategory[]>(
        "/transaction/categories",);
    return data
}

export async function createTransaction(transaction: CreateTransactionInterface) {
    await dtMoneyApi.post("/transaction", transaction)
}

export async function getTransactions(params: GetTransactionsParams): Promise<GetTransactionResponse> {
    const { data } = await dtMoneyApi.get<GetTransactionResponse>("/transaction",{
        params,
        paramsSerializer: (p) =>qs.stringify(p, {arrayFormat:"repeat"}),
    })

    return data
} 