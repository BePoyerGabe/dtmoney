import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { api } from '../services/api'

// Para q todos os componentes tenham acesso aos dados do contexto, eles devem ser englobados
//pelo Provider que vem do createContext

interface Transaction {
    id: number,
    title: string,
    amount: number,
    type: string,
    category: string,
    createdAt: string
}

interface TransactionProviderProps {
    children: ReactNode         //permite q o componente do contexto englobe demais componentes, tags, textos, etc..
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>

interface TransactionContextData {
    transactions: Transaction[],
    createTransaction: (transaction: TransactionInput) => Promise<void>     //permite o async/await
}

//const - pq n é um componente                                           força a tipagem
const TransactionContext = createContext<TransactionContextData>({} as TransactionContextData)


export function TransactionProvider({ children }: TransactionProviderProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([])

    useEffect(() => {
        api.get('transaction')
        .then(response => setTransactions(response.data.transactions))
    }, [])

    async function createTransaction(transactionInput: TransactionInput) {
        //retorna o obj criado no miragejs
    
        const response = await api.post('/transaction', {
            ...transactionInput,
            createdAt: new Date()
        })

        const { transaction } = response.data

        setTransactions([...transactions, transaction])


    }

    return (
        <TransactionContext.Provider value={{ transactions, createTransaction }}>
            { children }
        </TransactionContext.Provider>
    )
}

export function useTransactions() {
    const context = useContext(TransactionContext)

    return context
}