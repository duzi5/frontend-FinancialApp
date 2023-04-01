import React from "react";
import { Container, Button } from "react-bootstrap";
import FirstLine from "../components/FirstLine";
import Linha1 from "../components/Linha1";
import Linha2 from "../components/Linha2";
import Linha3 from "../components/Linha3";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  return (
    <div style={{ paddingLeft: "60px" }}>
      <Container>
         <h1>Bem vindo, {JSON.parse(localStorage.getItem("user"))["name"]}</h1>
        <FirstLine />
        <Linha1 />
        <Linha2 />
        <Linha3 />
      </Container>
    </div>
  );
}

export default Dashboard;
