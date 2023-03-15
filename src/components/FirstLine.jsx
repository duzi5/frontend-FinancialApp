import { Row,Col} from "react-bootstrap"
import "./FirstLine.css"
import {MdNotifications} from "react-icons/md"
import {BsPerson} from "react-icons/bs";


export default props => { 
    return(
       <Row className="first-line">
        <Col md="4">
        <h3>{props.companyName || "@ Your Company"}</h3> 
        </Col>
        <Col col xs="12" sm="8" md="6" lg =" 4" xl="3" className="profile-infos">
            <div className="notificacoes">
                <div id="bolinha-do-sino">2</div>
                <MdNotifications id="sino" />
            </div>
            <div className="nomedescricao">
                <div id="nome">Antobio Netto</div>
                <span>Full Stack Developer</span>
            </div>
            <div className="profile-image">
                <div className="circulo">
                    <BsPerson id="person" />
                </div>
            </div>
        </Col>
       </Row>
    )
}