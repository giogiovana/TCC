import * as Style from "../../../Styles/CadastrosStyled";
import { consultarCliente } from "./Cliente.Function";
import { useEffect, useState } from "react";
import { Cliente } from "../../../Models/cliente";
import { useNavigate } from "react-router-dom";
import { MdPerson } from "react-icons/md";

export function ConsultaCliente() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [clientesFiltrados, setClientesFiltrados] = useState<Cliente[]>([]);
  const navigate = useNavigate();

  const [filtros, setFiltros] = useState({
    nome: "",
    id: "",
    ativo: "",
  });

  useEffect(() => {
    let filtrados = [...clientes];

    if (filtros.id.trim() !== "") {
      filtrados = filtrados.filter((c) =>
        String(c.id_cliente).includes(filtros.id),
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

    setClientesFiltrados(filtrados);
  }, [filtros, clientes]);

  useEffect(() => {
    async function carregarClientes() {
      const data = await consultarCliente();
      const lista = Array.isArray(data) ? data : [];
      setClientes(lista);
      setClientesFiltrados(lista);
    }
    carregarClientes();
  }, []);

  const handleRowClick = (id_cliente: string) => {
    if (id_cliente) navigate(`/CadastroCliente/${id_cliente}`);
  };

  return (
    <Style.Container>
      <p className="icon">
        <MdPerson /> Clientes
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
              <th>Razão social</th>
              <th>Fantasia</th>
              <th>Telefone</th>
              <th>Email</th>
              <th>Ativo</th>
            </tr>
          </thead>

          <tbody>
            {clientesFiltrados.length > 0 ? (
              clientesFiltrados.map((cliente) => (
                <tr
                  key={cliente.id_cliente}
                  onClick={() => handleRowClick(cliente.id_cliente)}
                  style={{ cursor: "pointer" }}
                >
                  <td>{cliente.id_cliente}</td>
                  <td>{cliente.razao_social}</td>
                  <td>{cliente.nome_fantasia}</td>
                  <td>{cliente.telefone}</td>
                  <td>{cliente.email}</td>
                  <td>{cliente.fg_ativo}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6}>Nenhum cliente encontrado</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <button
        type="button"
        className="Incluir"
        onClick={() => navigate("/CadastroCliente")}
      >
        {" "}
        Incluir
      </button>
    </Style.Container>
  );
}

export default ConsultaCliente;
