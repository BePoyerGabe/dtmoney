import Modal from "react-modal"

interface TransactionModalProps {
    isOpen: boolean,
    onRequestClose: () => void
}

export function TransactionModal({isOpen, onRequestClose} : TransactionModalProps) {

  return (
    <Modal 
      isOpen={isOpen}
      onRequestClose={onRequestClose}
    >
      <h2>Cadastrar transação</h2>
    </Modal>

  )
}