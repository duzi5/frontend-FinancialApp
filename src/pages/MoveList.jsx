import React, { useState, useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import { api } from "../api/axios";
import styled from "styled-components";
import { BsPencil, BsTrash } from "react-icons/bs";

const StyledTable = styled(Table)`
  thead {
    background-color: #8B008B;
    color: #FFFFFF;
  }

  tbody tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  tbody tr:hover {
    background-color: #32CD32;
    color: #FFFFFF;
  }
`;

const IconButton = styled.button`
  background-color: transparent;
  border: none;
  padding: 0;
  color: ${(props) => (props.delete ? "#FF0000" : "#8B008B")};
  cursor: pointer;

  &:hover {
    color: ${(props) => (props.delete ? "#FF6347" : "#32CD32")};
  }
`;

export const MoveList = ({ referenceMonth }) => {
  const [moves, setMoves] = useState([]);
console.log('o componente movelist também está sendo renderizado')
  useEffect(() => {
    const fetchMoves = async () => {
      try {
        const response = await api.get(`/moves/month/${referenceMonth}`);
        setMoves(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMoves();
  }, [referenceMonth]);

  const handleEdit = (move) => {
    // Lógica para editar a movimentação selecionada
  };

  const handleDelete = (move) => {
    // Lógica para deletar a movimentação selecionada
  };

  return (
  <Container>
      <StyledTable striped bordered hover>
      <thead>
        <tr>
          <th>Descrição</th>
          <th>Valor</th>
          <th>Natureza</th>
          <th>Categoria</th>
          <th>Método de Pagamento</th>
          <th>Data</th>
          <th>Parcela</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {moves.map((move) => (
          <tr key={move._id}>
            <td>{move.description}</td>
            <td>{move.value}</td>
            <td>{move.nature}</td>
            <td>{move.category}</td>
            <td>{move.paymentMethod}</td>
            <td>{move.date}</td>
            <td>{move.installmentInfo}</td>
            <td>
              <IconButton onClick={() => handleEdit(move)}>
                <BsPencil />
              </IconButton>
              <IconButton delete onClick={() => handleDelete(move)}>
                <BsTrash />
              </IconButton>
            </td>
          </tr>
        ))}
      </tbody>
    </StyledTable>
  </Container>
  );
};

