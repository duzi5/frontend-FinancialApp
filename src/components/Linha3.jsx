import React from 'react'
import Pagination from './Pagination'
import Tabela from './Tabela'
import styled from 'styled-components'

const Linha3 = () => {
  
  
  const Linha3div = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    
  `
  
    return (
    <Linha3div>
        <Tabela />
        <Pagination />
    </Linha3div>

    
  )
}

export default Linha3