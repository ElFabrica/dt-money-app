import { TransactionCategory } from "@/shared/interface/https/transaction.category.response";
import { createContext, FC, PropsWithChildren, useCallback, useContext, useState } from "react";
import * as transactionService from "@/shared/service/dt-money/transaction.service"
import { CreateTransactionInterface } from "@/shared/interface/https/create-transaction-request";
import { Transaction } from "@/shared/interface/https/transaction";

export type TransactionContextType = {
    fetchCategories: () => Promise<void>;
    categories: TransactionCategory[]
    createTransaction: (transaction:CreateTransactionInterface) => Promise<void>
    fetchTransactions: () => Promise<void>;
}

export const TransantionContext = createContext({} as TransactionContextType)

export const TransactionContextProvider: FC<PropsWithChildren> = ({ children }) => {
    const [categories, setCategories] = useState<TransactionCategory[]>([])
    const [transactions, setTransactions] = useState<Transaction[]>([])

    const fetchCategories = async () => {
        const categoriesResponse = await transactionService.getTransactionCategories()
        setCategories(categoriesResponse)
    }
    async function createTransaction(transaction: CreateTransactionInterface){
        await transactionService.createTransaction(transaction)
    }
    const fetchTransactions = useCallback(async()=>{
        const transactionResponse = await transactionService.getTransactions({
            page:0,
            perPage:10
        });
        console.log(transactionResponse)
        setTransactions(transactionResponse.data)
    }, [])

    return (
        <TransantionContext.Provider
            value={{
                categories,
                fetchCategories,
                createTransaction,
                fetchTransactions
            }}>
            {children}
        </TransantionContext.Provider>

    )
}

export const useTransactionContext = () => {
    return useContext(TransantionContext)
}