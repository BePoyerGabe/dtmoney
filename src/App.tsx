import { useState } from "react";
import Modal from "react-modal";
import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { TransactionModal } from "./components/TransactionModal";
import { GlobalStyle } from "./styles/global";
import { TransactionProvider } from "./TransactionsContext";

Modal.setAppElement('#root')

export function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false)

  function handleOpenNewTransactionModalOpen() {
    setIsNewTransactionModalOpen(true)
  }

  function handleCloseNewTransactionModalOpen() {
    setIsNewTransactionModalOpen(false)
  }

  return (
    <TransactionProvider>        
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModalOpen}/>
      <Dashboard />

      <TransactionModal isOpen={isNewTransactionModalOpen} onRequestClose={handleCloseNewTransactionModalOpen}/>


      <GlobalStyle />
    </TransactionProvider>
  );
}

