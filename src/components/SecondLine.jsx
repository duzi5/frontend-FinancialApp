import Licard from "./Licard";
import "./SecondLine.css";
import ReactApexChart from "react-apexcharts";
import { Col, Row } from 'react-bootstrap';



export default (props) => {
  let options = {
    chart: {
        toolbar : {
            show: false,
        }
    },
    colors: ['#023373', '#D9C58B'],
    title: {
        text:'Almejado / Alcançado',
        align: 'left',
        margin: 10,
        offsetX: 0,
        offsetY: 0,
        floating: false,
        style: {
            fontSize:  '19px',
            fontWeight:  'bold',
            color:  '#263238'
        },
        
    } 
    }   
    let series = [
        {
            name: "Esperado",
            data:[20000, 30000, 40000, 50000, 60000, 70000, 80000],
           
        },
        {
            name:"Concretizado",
            data:[10000, 20000, 30000, 40000, 50000, 60000, 70000],
         
        }
    ]
  

  

  return (
    <Row className="linha2">
        <Col xs="12" sm="12" md="6" lg="4" className="col">
            <Licard />
        </Col>
      
        <Col xs="12" sm="12" md="6" lg="8" className="col">
            <ReactApexChart options={options} series={series} width="100%" type="bar" horizontal='false' height='300' />
        </Col>
    </Row>

  );
};
