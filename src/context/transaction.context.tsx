import { TransactionCategory } from "@/shared/interface/https/transaction.category.response";
import { createContext, FC, PropsWithChildren, useCallback, useContext, useState } from "react";
import * as transactionService from "@/shared/service/dt-money/transaction.service"
import { CreateTransactionInterface } from "@/shared/interface/https/create-transaction-request";
import { Transaction } from "@/shared/interface/https/transaction";
import { TotalTransactions } from "@/shared/interface/https/total-transactions";
import { UpdateTransactionInterface } from "@/shared/interface/https/update-transaction-request";
import { Filters, Pagination } from "@/shared/interface/https/get-transaction.request";

interface FetchTransactionsParams {
    page: number,
}

interface loadings {
    initial: boolean;
    refresh: boolean;
    loadMore: boolean;
}

interface handleLoadingParams {
    key: keyof loadings,
    value: boolean
}

interface HandleFilterParams {
    key: keyof Filters;
    value: Date | Boolean | number; 
}

export type TransactionContextType = {
    fetchCategories: () => Promise<void>;
    categories: TransactionCategory[]
    fetchTransactions: (params: FetchTransactionsParams) => Promise<void>;
    createTransaction: (transaction: CreateTransactionInterface) => Promise<void>
    updateTransaction: (transaction: UpdateTransactionInterface) => Promise<void>
    totalTransactions: TotalTransactions
    transactions: Transaction[]
    refreshTransactions: () => Promise<void>
    loadings: loadings
    loadMoreTransactions: () => Promise<void>
    handleLoadings: (params: handleLoadingParams) => void;
    pagination: Pagination
    setSearchText: (text: string) => void 
    searchText: string
    filters: Filters
    handleFilters: (params: HandleFilterParams) => void
}

export const TransantionContext = createContext({} as TransactionContextType)

export const TransactionContextProvider: FC<PropsWithChildren> = ({ children }) => {

    const [categories, setCategories] = useState<TransactionCategory[]>([])
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [searchText, setSearchText] = useState("")
    const [filters, setFilters] = useState<Filters>({
        categoryIds: {},
        typeId: undefined,
        from: undefined,
        to: undefined
    })
    const [loadings, setLoadings] = useState<loadings>({
        initial: false,
        refresh: false,
        loadMore: false
    })
    const [pagination, setPagination] = useState<Pagination>({
        page: 1,
        perPage: 15,
        totalRows: 0,
        totalPages: 0
    })
    const [totalTransactions, setTotalTransactions] = useState<TotalTransactions>({
        expense: 0,
        revenue: 0,
        total: 0
    })
    const handleLoadings = ({ key, value }: handleLoadingParams) => {
        setLoadings((prevValue) => ({ ...prevValue, [key]: value }))
    }

    const refreshTransactions = useCallback(async () => {

        const { page, perPage } = pagination

        const transactionResponse = await transactionService.getTransactions({
            page: 1,
            perPage: page * perPage
        });
        setTransactions(transactionResponse.data)
        setTotalTransactions(transactionResponse.totalTransactions)
        setPagination({
            ...pagination,
            page,
            totalPages: totalTransactions.total,
            totalRows: transactionResponse.totalRows
        })
    }, [pagination])

    const fetchCategories = async () => {
        const categoriesResponse = await transactionService.getTransactionCategories()
        setCategories(categoriesResponse)
        await refreshTransactions()
    }
    async function createTransaction(transaction: CreateTransactionInterface) {
        await transactionService.createTransaction(transaction)
        await refreshTransactions()
    }
    const fetchTransactions = useCallback(async ({ page = 1 }: FetchTransactionsParams) => {
        const transactionResponse = await transactionService.getTransactions({
            page,
            perPage: pagination.perPage,
            searchText
        });
        if (page === 1) {
            setTransactions(transactionResponse.data);
        }
        else {
            setTransactions((prevState) => [...prevState, ...transactionResponse.data])
        }

        setTotalTransactions(transactionResponse.totalTransactions)
        setPagination({
            ...pagination,
            page,
            totalRows: transactionResponse.totalRows,
            totalPages: transactionResponse.totalPages
        })
    }, [pagination, searchText])
    const updateTransaction = async (transaction: UpdateTransactionInterface) => {
        await transactionService.updateTransaction(transaction)
    }

    const loadMoreTransactions = useCallback(async () => {
        if (loadings.loadMore || pagination.page >= pagination.totalPages) return;
        fetchTransactions({ page: pagination.page + 1 })
    }, [loadings.loadMore, pagination])

    const handleFilters = ({key, value}: HandleFilterParams) =>{
        setFilters((prev) => ({...prev, [key]: value}))

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
                handleLoadings,
                loadMoreTransactions,
                loadings,
                pagination,
                setSearchText,
                searchText,
                filters,
                handleFilters


            }}>
            {children}
        </TransantionContext.Provider>

    )
}

export const useTransactionContext = () => {
    return useContext(TransantionContext)
}