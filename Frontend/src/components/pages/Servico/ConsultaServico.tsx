import * as Style from "../../../Styles/CadastrosStyled";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdSettings } from "react-icons/md";
import { consultarServico } from "../../../services/index";
import { Servico } from "../../../Models/index";

export const consultaServico = () => {
  const [servicos, setServico] = useState<Servico[]>([]);
  const [servicosFiltrados, setServicosFiltrados] = useState<Servico[]>([]);
  const navigate = useNavigate();

  const [filtros, setFiltros] = useState({
    id: "",
    nome: "",
  });

  useEffect(() => {
    let filtrados = [...servicos];
    if (filtros.id.trim() !== "") {
      filtrados = filtrados.filter((c) =>
        String(c.id_servico).includes(filtros.id),
      );
    }
    if (filtros.nome.trim() !== "") {
      filtrados = filtrados.filter((c) =>
        String(c.nome).includes(filtros.nome),
      );
    }
    setServicosFiltrados(filtrados);
  }, [filtros, servicos]);

  useEffect(() => {
    async function carregarServicos() {
      const data = await consultarServico();
      const lista = Array.isArray(data) ? data : [];
      setServico(lista);
      setServicosFiltrados(lista);
    }
    carregarServicos();
  }, []);

  const handleRowClick = (id_servico: string) => {
    if (id_servico) navigate(`/CadastroServico/${id_servico}`);
  };

  useEffect(() => {
    console.log(servicosFiltrados.map((s) => s.id_servico));
  }, [servicosFiltrados]);

  return (
    <Style.Container>
      
      <p className="icon">
        <MdSettings /> Serviços
      </p>

      <div className="inputFiltro">
        <div>
          <label>ID</label>
          <input
            className="idInput"
            type="text"
            value={filtros.id}
            onChange={(e) => setFiltros({ ...filtros, id: e.target.value })}
          />
        </div>

        <div>
          <label>Serviço</label>
          <input
            className="input"
            type="text"
            value={filtros.nome}
            onChange={(e) => setFiltros({ ...filtros, nome: e.target.value })}
          />
        </div>
      </div>

      <div className="tableContainer">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Descrição</th>
            </tr>
          </thead>

          <tbody>
            {servicosFiltrados.length > 0 ? (
              servicosFiltrados.map((servico) => (
                <tr
                  key={servico.id_servico}
                  onClick={() => handleRowClick(servico.id_servico)}
                  style={{ cursor: "pointer" }}
                >
                  <td>{servico.id_servico}</td>
                  <td>{servico.nome}</td>
                  <td>{servico.descricao}</td>
                </tr>
              ))
            ) : (
              <tr key="no-data">
                <td colSpan={3}>Nenhum serviço encontrado</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <button
        type="button"
        className="Incluir"
        onClick={() => navigate("/CadastroServico")}
      >
        {" "}
        Incluir
      </button>
    </Style.Container>
  );
};

export default consultaServico;
