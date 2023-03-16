import React from "react"
import FirstLine from "../components/FirstLine"
import { Container} from "react-bootstrap"
import Linha1 from "../components/Linha1"
import { Linha2 } from "../components/Linha2"
import Linha3 from "../components/Linha3"

export default props => {
    return(
       <Container>
         <FirstLine />
          <Linha1 /> 
          <Linha2 />
          <Linha3 /> 
       </Container>
    )
}