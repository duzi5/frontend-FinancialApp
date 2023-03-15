import ListGroup from "react-bootstrap/ListGroup";
import "./Licard.css";

export default (props) => {
  return (
    <div id="list-group">
      <div className="listitem list-item">
        <div className="esquerda">
          <h5>Objetivo</h5>
          <p>lista objetivo / filtra objetivo</p>
        </div>
        <div className="direita">
          <h2>{props.valorTotal || 1340}</h2>
        </div>
      </div>

      <div className="list-item listitem">
        <div className="esquerda">
          <h5>Valor Acumulado</h5>
          <p>até aqui</p>
        </div>
        <div className="direita">
          <h2>{props.valorTotal || "1235"}</h2>
        </div>
      </div>

      <div className="list-item listitem">
        <div className="esquerda">
          <h5>Quanto falta?</h5>
          <p>informa quanto falta</p>
        </div>
        <div className="direita">
        <h2>{props.valorTotal || 76}</h2>
        </div>
      </div>
    </div>
  );
};
