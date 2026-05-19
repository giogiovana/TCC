import * as Style from "../../../Styles/CadastrosStyled";
import { consultarTecnico } from "./TecnicoFunction";
import { useEffect, useState } from "react";
import { Tecnico } from "../../../Models/tecnico";
import { useNavigate } from "react-router-dom";
import { GrUserWorker } from "react-icons/gr";

export const ConsultaTecnico = () => {
  const [tecnicos, setTecnico] = useState<Tecnico[]>([]);
  const [tecnicosFiltrados, setTecnicosFiltrados] = useState<Tecnico[]>([]);
  const navigate = useNavigate();

  const [filtros, setFiltros] = useState({
    nome: "",
    id: "",
    ativo: "",
  });

  useEffect(() => {
    let filtrados = [...tecnicos];

    if (filtros.id.trim() !== "") {
      filtrados = filtrados.filter((c) =>
        String(c.id_tecnico).includes(filtros.id),
      );
    }

    if (filtros.nome.trim() !== "") {
      filtrados = filtrados.filter((c) =>
        c.razao_social.toLowerCase().includes(filtros.nome.toLowerCase()),
      );
    }

    if (filtros.ativo !== "") {
      filtrados = filtrados.filter((c) => c.fg_ativo === filtros.ativo);
    }

    setTecnicosFiltrados(filtrados);
  }, [filtros, tecnicos]);

  useEffect(() => {
    async function carregarTecnico() {
      const data = await consultarTecnico();
      const lista = Array.isArray(data) ? data : [];
      setTecnico(lista);
      setTecnicosFiltrados(lista);
    }
    carregarTecnico();
  }, []);

  const handleRowClick = (id_tecnico: string) => {
    if (id_tecnico) navigate(`/CadastroTecnico/${id_tecnico}`);
  };

  useEffect(() => {
    console.log(tecnicosFiltrados.map((t) => t.id_tecnico));
  }, [tecnicosFiltrados]);

  return (
    <Style.Container>
      <p className="icon">
        <GrUserWorker /> Técnicos
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
          <label>Nome</label>
          <input
            className="input"
            type="text"
            value={filtros.nome}
            onChange={(e) => setFiltros({ ...filtros, nome: e.target.value })}
          />
        </div>

        <div>
          <label>Ativo?</label>
          <select
            className="input"
            value={filtros.ativo}
            onChange={(e) => setFiltros({ ...filtros, ativo: e.target.value })}
          >
            <option value="">Todos</option>
            <option value="S">Ativo</option>
            <option value="N">Inativo</option>
          </select>
        </div>
      </div>

      <div className="tableContainer">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Especialidade</th>
              <th>Telefone</th>
              <th>Email</th>
              <th>Ativo</th>
            </tr>
          </thead>

          <tbody>
            {tecnicosFiltrados.length > 0 ? (
              tecnicosFiltrados.map((tecnico) => (
                <tr
                  key={tecnico.id_tecnico}
                  onClick={() => handleRowClick(tecnico.id_tecnico)}
                  style={{ cursor: "pointer" }}
                >
                  <td>{tecnico.id_tecnico}</td>
                  <td>{tecnico.razao_social}</td>
                  <td>{tecnico.nome_fantasia}</td>
                  <td>{tecnico.telefone}</td>
                  <td>{tecnico.email}</td>
                  <td>{tecnico.fg_ativo}</td>
                </tr>
              ))
            ) : (
              <tr key="no-data">
                <td colSpan={6}>Nenhum técnico encontrado</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <button
        type="button"
        className="Incluir"
        onClick={() => navigate("/CadastroTecnico")}
      >
        {" "}
        Incluir
      </button>
    </Style.Container>
  );
};

export default ConsultaTecnico;
