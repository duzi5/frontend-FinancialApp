import React from 'react'
import { Row, Col } from "react-bootstrap"
import GraficoBarras from './GraficoBarras'
import { GraficoPizza } from './GraficoPizza'
import "./Linha2.css"





export const Linha2 = () => {
    


    
    return (
    <Row>
        <Col lg="8" >
            <GraficoBarras />
        </Col>
        <Col lg="4" id="pizza">
            <GraficoPizza />
        </Col>

    </Row>
  )
}
export default Linha2