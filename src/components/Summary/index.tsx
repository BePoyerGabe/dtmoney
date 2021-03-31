import { useContext } from 'react'
import { Container } from "./styles";
import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import totalImg from '../../assets/total.svg'
import { useTransactions } from '../../hooks/useTransactions';

export function Summary() {
    /**
     *  Duas formas de se utilizar a ContextAPI
     * 
     * 1º - mais antiga, Render props que com os hooks perdeu espaço
     * 
     *      <TransactionContext.Consumer>
                {(data) => {
                    console.log(data)

                    return <p>OK</p>
                }}
            </TransactionContext.Consumer>
     * 
     * 2º - hook "useContext" que será utilizado, excelente!!!!
     * quando o dado passado pelo context mudar, todos os componentes rederizarão a nova informação
     * 
     * */
    const {transactions} = useTransactions()

    const summary = transactions.reduce((acc, transaction) => {
        if(transaction.type === 'deposit') {
            acc.deposits += transaction.amount
            acc.total += transaction.amount
        } else {
            acc.withdraws += transaction.amount
            acc.total -= transaction.amount
        }

        return acc
    }, {
        deposits: 0,
        withdraws: 0,
        total: 0
    })

    return (
        <Container>
            
            <div>
                <header>
                    <p>Entradas</p>
                    <img src={incomeImg} alt="Entradas"/>
                </header>

                <strong>
                    {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    }).format(summary.deposits)}
                </strong>
            </div>
            <div>
                <header>
                    <p>Saídas</p>
                    <img src={outcomeImg} alt="Saídas"/>
                </header>

                <strong>-
                    {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    }).format(summary.withdraws)}    
                </strong>
            </div>
            <div className="backg-highlight">
                <header>
                    <p>Total</p>
                    <img src={totalImg} alt="Total"/>
                </header>

                <strong>
                    {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    }).format(summary.total)}
                </strong>
            </div>
        </Container>
    )
}