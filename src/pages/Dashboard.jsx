import FirstLine from "../components/FirstLine";
import SecondLine from "../components/SecondLine";
import ThirdLine from "../components/ThirdLine";
import FourthLine from "../components/FourthLine";
import { Container } from "react-bootstrap";
import Modal1 from './Modal1';
export default (props) => {
  return(
    <>
      <Container className="container">
      <FirstLine />
      <SecondLine />
      <ThirdLine />
      <FourthLine />
    </Container>
      <Modal1/>
    </>
  )
  
};
