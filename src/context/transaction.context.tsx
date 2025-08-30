import { TransactionCategory } from "@/shared/interface/https/transaction.category.response";
import { createContext, FC, PropsWithChildren, useContext, useState } from "react";
import * as transactionService from "@/shared/service/dt-money/transaction.service"

export type TransactionContextType = {
    fetchCategories: () => Promise<void>;
    categories: TransactionCategory[]
}

export const TransantionContext = createContext({} as TransactionContextType)

export const TransactionContextProvider: FC<PropsWithChildren> = ({ children }) => {
    const [categories, setCategories] = useState<TransactionCategory[]>([])
    console.log(categories)

    const fetchCategories = async () => {
        const categoriesResponse = await transactionService.getTransactionCategories()
        setCategories(categoriesResponse)
    }

    return (
        <TransantionContext.Provider
            value={{
                categories,
                fetchCategories
            }}>
            {children}
        </TransantionContext.Provider>

    )
}

export const useTransactionContext = () => {
    return useContext(TransantionContext)
}