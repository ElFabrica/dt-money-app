import { TransactionCategory } from "@/shared/interface/https/transaction.category.response";
import { createContext, FC, PropsWithChildren, useCallback, useContext, useState } from "react";
import * as transactionService from "@/shared/service/dt-money/transaction.service"
import { CreateTransactionInterface } from "@/shared/interface/https/create-transaction-request";
import { Transaction } from "@/shared/interface/https/transaction";
import { TotalTransactions } from "@/shared/interface/https/total-transactions";
import { UpdateTransactionInterface } from "@/shared/interface/https/update-transaction-request";

export type TransactionContextType = {
    fetchCategories: () => Promise<void>;
    categories: TransactionCategory[]
    fetchTransactions: () => Promise<void>;
    createTransaction: (transaction: CreateTransactionInterface) => Promise<void>
    updateTransaction: (transaction: UpdateTransactionInterface) => Promise<void>
    totalTransactions: TotalTransactions
    transactions: Transaction[]
    refreshTransactions: () => Promise<void>
    loading: boolean
}

export const TransantionContext = createContext({} as TransactionContextType)

export const TransactionContextProvider: FC<PropsWithChildren> = ({ children }) => {

    const [categories, setCategories] = useState<TransactionCategory[]>([])
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [loading, setLoading] = useState(false)
    const [totalTransactions, setTotalTransactions] = useState<TotalTransactions>({
        expense: 0,
        revenue: 0,
        total: 0
    })

    const refreshTransactions =async () => {
        setLoading(true)
        const transactionResponse = await transactionService.getTransactions({
            page: 1,
            perPage: 10
        });
        setTransactions(transactionResponse.data)
        setTotalTransactions(transactionResponse.totalTransactions)
        setLoading(false)
    }

    const fetchCategories = async () => {
        const categoriesResponse = await transactionService.getTransactionCategories()
        setCategories(categoriesResponse)
        await refreshTransactions()
    }
    async function createTransaction(transaction: CreateTransactionInterface) {
        await transactionService.createTransaction(transaction)
        await refreshTransactions()
    }
    const fetchTransactions = useCallback(async () => {
        const transactionResponse = await transactionService.getTransactions({
            page: 1,
            perPage: 10
        });
        setTransactions(transactionResponse.data)
        setTotalTransactions(transactionResponse.totalTransactions)

    }, [])
    const updateTransaction = async (transaction: UpdateTransactionInterface) => {
        await transactionService.updateTransaction(transaction)
    }


    return (
        <TransantionContext.Provider
            value={{
                categories,
                fetchCategories,
                createTransaction,
                fetchTransactions,
                totalTransactions,
                transactions,
                updateTransaction,
                refreshTransactions,
                loading
            }}>
            {children}
        </TransantionContext.Provider>

    )
}

export const useTransactionContext = () => {
    return useContext(TransantionContext)
}