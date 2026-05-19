import * as Style from "../../../Styles/CadastrosStyled";
import { customSelectStyles } from "../../../Styles/customSelectStyles";

import { useEffect, useState } from "react";

import { consultarOrdemServico, consultarStatus } from "./OsFunction";
import { consultarCliente } from "../cliente/Cliente.Function";

import { Cabecalho } from "../../../Models/cabecalhoOs";
import { Cliente } from "../../../Models/cliente";
import { Status } from "../../../Models/status";

import { useNavigate } from "react-router-dom";
import { MdInventory2 } from "react-icons/md";

export const consultarOs = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [status, setStatus] = useState<Status[]>([]);
  const [ordemservicos, setOrdemServicos] = useState<Cabecalho[]>([]);
  const [OrdemServicosFiltrados, setOrdemServicosFiltrados] = useState<Cabecalho[]>([]);
  const navigate = useNavigate();

  const [filtros, setFiltros] = useState({
    id_cliente: "",
    id: "",
    status: "",
  });

  useEffect(() => {
  let filtrados = [...ordemservicos];

  if (filtros.id.trim() !== "") {
    filtrados = filtrados.filter((os) =>
      String(os.id_os).includes(filtros.id)
    );
  }

  if (filtros.id_cliente.trim() !== "") {
    filtrados = filtrados.filter((os) =>
      getClienteNome(os.id_cliente)
        .toLowerCase()
        .includes(filtros.id_cliente.toLowerCase())
    );
  }

  if (filtros.status.trim() !== "") {
    filtrados = filtrados.filter((os) =>
      getStatusDescricao(os.status)
        .toLowerCase()
        .includes(filtros.status.toLowerCase())
    );
  }

  setOrdemServicosFiltrados(filtrados);

}, [filtros, ordemservicos, clientes, status]);

  useEffect(() => {
    async function carregarOrdemServico() {

      const data = await consultarOrdemServico();
      const lista = Array.isArray(data) ? data : [];
      const listaClientes = await consultarCliente();
      const listaStatus = await consultarStatus();
      
      setOrdemServicos(lista);
      setOrdemServicosFiltrados(lista);
      setClientes(listaClientes || []);
      setStatus(listaStatus || []);
    }
    carregarOrdemServico();
  }, []);
  
  const getClienteNome = (id: string) => {
  return (
    clientes.find(
      (c) => String(c.id_cliente) === String(id)
    )?.nome_fantasia || id
  );
};

const getStatusDescricao = (id: string) => {
  return (
    status.find(
      (s) => String(s.id_status) === String(id)
    )?.descricao || id
  );
};

const getStatusClass = (id: string) => {
  const descricao = getStatusDescricao(id).toLowerCase();

  if (descricao.includes("aberta"))
    return "status-aberta";

  if (descricao.includes("andamento"))
    return "status-andamento";

  if (descricao.includes("finalizada"))
    return "status-finalizada";

  if (descricao.includes("cancelada"))
    return "status-cancelada";

  return "";
};

  const handleRowClick = (id_os: string) => {
    if (id_os) navigate(`/CadastroOs/${id_os}`);
  };

  return (
    <Style.Container>
      <p className="icon">
        <MdInventory2 /> Ordens de serviço
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
          <label>Cliente</label>
          <input
            className="input"
            type="text"
            value={filtros.id_cliente}
            onChange={(e) =>
              setFiltros({ ...filtros, id_cliente: e.target.value })
            }
          />
        </div>

        <div>
        <label>Status</label>

        <select
          className="input"
          value={filtros.status}
          onChange={(e) =>
            setFiltros({
              ...filtros,
              status: e.target.value,
            })
          }
        >
          <option value="">Todos</option>

          {status.map((s) => (
            <option
              key={s.id_status}
              value={s.descricao}
            >
              {s.descricao}
            </option>
          ))}
        </select>
      </div>
      </div>

      <div className="tableContainer">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Seviço</th>
              <th>Abertura</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {OrdemServicosFiltrados.length > 0 ? (
              OrdemServicosFiltrados.map((ordemservico) => (
                <tr
                  key={ordemservico.id_os}
                  onClick={() => handleRowClick(ordemservico.id_os)}
                  style={{ cursor: "pointer" }}
                >
                  <td>{ordemservico.id_os}</td>
                  <td>{getClienteNome(ordemservico.id_cliente)}</td>
                  <td>{ordemservico.descricao}</td>
                  <td>{ordemservico.data_inicio}</td>
                  <td>
                      <span className={getStatusClass(ordemservico.status)}>
                        {getStatusDescricao(ordemservico.status)}
                      </span> 
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5}>Nenhuma ordem de serviço encontrada</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <button
        type="button"
        className="Incluir"
        onClick={() => navigate("/CadastroOs")}
      >
        {" "}
        Incluir
      </button>
    </Style.Container>
  );
};

export default consultarOs;
