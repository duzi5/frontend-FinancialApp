import React from "react";
import { Modal, Button } from "react-bootstrap";

const DeletePaymentMethodModal = ({
show,
handleCloseModal,
handleDeletePaymentMethod,
selectedPaymentMethod,
}) => {
const handleDelete = () => {
handleDeletePaymentMethod();
};

return (
<Modal show={show} onHide={handleCloseModal}>
<Modal.Header closeButton>
<Modal.Title>Deletar Método de Pagamento</Modal.Title>
</Modal.Header>
<Modal.Body>
<p>Você tem certeza que deseja deletar este método de pagamento?</p>
</Modal.Body>
<Modal.Footer>
<Button variant="secondary" onClick={handleCloseModal}>
Cancelar
</Button>
<Button variant="danger" onClick={handleDelete}>
Deletar
</Button>
</Modal.Footer>
</Modal>
);
};

export default DeletePaymentMethodModal;