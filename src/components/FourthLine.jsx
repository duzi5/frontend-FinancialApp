import "./FourthLine.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { React } from "react";
import { BsImageAlt } from "react-icons/bs";

export default (props) => {
  return (
    <Row className="row linha4 mt-3">
      <Col md="12" lg="6" sm="12" xs="12" className="coluna-timeline">
        <h5>System Log</h5>
        <div className="timeline">
          <div className="item">
            <div className="bolinha"></div>
            <div className="conteudo-timeline">
              <p> Lorem ipsum dolor sit amet</p>
              <span>Today</span>
            </div>
          </div>
          <div className="item">
            <div className="bolinha"></div>
            <div className="conteudo-timeline">
              <p> Lorem ipsum dolor sit amet </p>
              <span>Yesterday</span>
            </div>
          </div>
          <div className="item">
            <div className="bolinha"></div>
            <div className="conteudo-timeline">
              <p> Lorem ipsum dolor sit amet </p>
              <span>Tomorow</span>
            </div>
          </div>
          <div className="item">
            <div className="bolinha"></div>
            <div className="conteudo-timeline">
              <p> Lorem ipsum dolor sit amet </p>
              <span>a week ago</span>
            </div>
          </div>
          <div className="item">
            <div className="bolinha"></div>
            <div className="conteudo-timeline">
              <p> Lorem ipsum dolor sit amet </p>
              <span>a mounth ago</span>
            </div>
          </div>
          <div className="item">
            <div className="bolinha"></div>
            <div className="conteudo-timeline">
              <p> Lorem ipsum dolor sit amet </p>
              <span>a year ago</span>
            </div>
          </div>
        </div>
      </Col>
      <Col lg="6" md="12" xs="12" sm="12" className="notes col-12 col-md-8">
        <h5>Anotações</h5>
        <div className="conjunto-notes">
          <div className="note">
            <div className="alternative-photo">
              <BsImageAlt />
            </div>
            <div className="nome-data">
              <h6>Vanessa Gomes</h6>
              <span>2 days ago</span>
            </div>
            <span>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Architecto quo animi molestias nesciunt odio, perferendis aut{" "}
            </span>
          </div>
          <div className="note">
            <div className="alternative-photo">
              <BsImageAlt />
            </div>
            <div className="nome-data">
              <h6>Vanessa Gomes</h6>
              <span>2 days ago</span>
            </div>
            <span>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Architecto quo animi molestias nesciunt odio, perferendis aut{" "}
            </span>
          </div>
          <div className="note">
            <div className="alternative-photo">
              <BsImageAlt />
            </div>
            <div className="nome-data">
              <h6>Vanessa Gomes</h6>
              <span>2 days ago</span>
            </div>
            <span>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Architecto quo animi molestias nesciunt odio, perferendis aut{" "}
            </span>
          </div>
        </div>
      </Col>
    </Row>
  );
};
