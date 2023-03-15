import ReactApexChart from "react-apexcharts";
import "./ThirdLine.css";
import { Col, Row } from "react-bootstrap";

export default (props) => {
  let options = {
    chart: {
      type:'area',
      toolbar: {
        show: false,
      }
    },
    colors: ["#023373", "#D9C58B"],
    stroke: {
      curve: "smooth",
    },
    responsive: [{
        breakpoint: 600,
        options: {
            width:"100%"
        },
    }],
    title: {
      text: "Gráfico do tempo até o objetivo",
      align: "left",
      margin: 10,
      offsetX: 0,
      offsetY: 0,
      floating: false,
      style: {
        fontSize: "19px",
        fontWeight: "bold",
        fontFamily: "sans-serif",
        color: "#263238",
      },
    },
  };
  let series = [
    {
      name: "Esperado",
      data: [40000, 20000, 70000, 50000, 60000, 40000, 80000],
    },
    {
      name: "Concretizado",
      data: [20000, 1000, 3000, 40000, 20000, 10000, 70000],
    },
  ];

  return (
    <Row className="terceira-linha row">
      <Col xs="12" >
        <ReactApexChart
          options={options}
          series={series}
          height="300"
          width="100%"
        />
      </Col>
    </Row>
  );
};
