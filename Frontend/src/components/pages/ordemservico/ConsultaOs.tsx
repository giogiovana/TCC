import * as Style from "../../../Styles/CadastrosStyled";
import { consultarOrdemServico } from "./OsFunction";
import { useEffect, useState } from "react";
import { Cabecalho } from "../../../Models/cabecalhoOs";
import { useNavigate } from "react-router-dom";
import { MdInventory2 } from "react-icons/md";

export const consultarOs = () => {
    const [ordemservicos, setOrdemServicos] = useState<Cabecalho[]>([]);
    const [OrdemServicosFiltrados, setOrdemServicosFiltrados] = useState<Cabecalho[]>([]);
    const navigate = useNavigate();
  
    const [filtros, setFiltros] = useState({
      id_cliente: "",
      id: "",
    });
  
     useEffect(() => {
        let filtrados = [...ordemservicos];
    
        if (filtros.id.trim() !== "") {
          filtrados = filtrados.filter((c) =>
            String(c.id_os).includes(filtros.id)
          );
        }
    
        if (filtros.id_cliente.trim() !== "") {
          filtrados = filtrados.filter((c) =>
            c.id_cliente.toLowerCase().includes(filtros.id_cliente.toLowerCase())
          );
        }
    
        setOrdemServicosFiltrados(filtrados);
      }, [filtros, ordemservicos]); 
    
      useEffect(() => {
        async function carregarOrdemServico() {
          const data = await consultarOrdemServico();
          const lista = Array.isArray(data) ? data : [];
          setOrdemServicos(lista);
          setOrdemServicosFiltrados(lista);
        }
        carregarOrdemServico();
      }, []);
    
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
                <label>ID Order</label>
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
                  onChange={(e) => setFiltros({ ...filtros, id_cliente: e.target.value })}
                />
              </div>
      
            </div>
            
            <div className="tableContainer">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Seviço</th>
                    <th>Cliente</th>
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
                        <td>{ordemservico.id_cliente}</td>
                        <td>{ordemservico.data_inicio}</td>

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
            > Incluir
            </button>
      
          </Style.Container>
  );
};

export default consultarOs
