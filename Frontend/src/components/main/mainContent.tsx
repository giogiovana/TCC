import { Routes, Route } from "react-router-dom";
import * as Style from "../../Styles/main.Styled";
import Home from "../pages/home/Home";
import CadastroCliente from "../pages/cliente/CadastroCliente";
import ConsultaCliente from "../pages/cliente/ConsultaCliente";
import CadastroProduto from "../pages/produto/CadastroProdutos";
import ConsultaProduto from "../pages/produto/ConsultaProduto";
import CadastroTecnico from "../pages/tecnicos/CadastroTecnico";
import ConsultaTecnico from "../pages/tecnicos/ConsultaTecnico";
import ConsultaOs from "../pages/ordemservico/ConsultaOs";
import CadastroOs from "../pages/ordemservico/CadastroOs";


export const MainContent = () => {
  return (
    <>
      <Style.Container>
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ConsultaCliente" element={<ConsultaCliente />} />
            <Route
              path="/CadastroCliente/:id_cliente?"
              element={<CadastroCliente />}
            />
            <Route path="/ConsultaProduto" element={<ConsultaProduto />} />
              <Route
              path="/CadastroProduto/:id_produto?"
              element={<CadastroProduto />}
            />
             <Route path="/ConsultaTecnico" element={<ConsultaTecnico />} />
              <Route
              path="/CadastroTecnico/:id_tecnico?"
              element={<CadastroTecnico />}
            />
            <Route path="/ConsultaOs" element={<ConsultaOs />} />
              <Route
              path="/CadastroOs/:id_os?"
              element={<CadastroOs />}
            />
          </Routes>
        </div>
      </Style.Container>
    </>
  );
};

export default MainContent;
