import * as Style from "../../../Styles/CadastrosStyled";
import { consultarProduto } from "./ProdutoFunction";
import { useEffect, useState } from "react";
import { Produto } from "../../../Models/produto";
import { useNavigate } from "react-router-dom";
import { MdInventory2 } from "react-icons/md";

export const ConsultaProduto = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [ProdutosFiltrados, setProdutosFiltrados] = useState<Produto[]>([]);
  const navigate = useNavigate();

  const [filtros, setFiltros] = useState({
    descricao: "",
    id: "",
  });

  useEffect(() => {
    let filtrados = [...produtos];

    if (filtros.id.trim() !== "") {
      filtrados = filtrados.filter((c) =>
        String(c.id_produto).includes(filtros.id),
      );
    }

    if (filtros.descricao.trim() !== "") {
      filtrados = filtrados.filter((c) =>
        c.descricao.toLowerCase().includes(filtros.descricao.toLowerCase()),
      );
    }

    setProdutosFiltrados(filtrados);
  }, [filtros, produtos]);

  useEffect(() => {
    async function carregarProduto() {
      const data = await consultarProduto();
      const lista = Array.isArray(data) ? data : [];
      setProdutos(lista);
      setProdutosFiltrados(lista);
    }
    carregarProduto();
  }, []);

  const handleRowClick = (id_produto: string) => {
    if (id_produto) navigate(`/CadastroProduto/${id_produto}`);
  };

  return (
    <Style.Container>
      <p className="icon">
        <MdInventory2 /> Produtos
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
          <label>Descrição</label>
          <input
            className="input"
            type="text"
            value={filtros.descricao}
            onChange={(e) =>
              setFiltros({ ...filtros, descricao: e.target.value })
            }
          />
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
            </tr>
          </thead>

          <tbody>
            {ProdutosFiltrados.length > 0 ? (
              ProdutosFiltrados.map((produto) => (
                <tr
                  key={produto.id_produto}
                  onClick={() => handleRowClick(produto.id_produto)}
                  style={{ cursor: "pointer" }}
                >
                  <td>{produto.id_produto}</td>
                  <td>{produto.descricao}</td>
                  <td>{produto.marca}</td>
                  <td>{produto.modelo}</td>
                  <td>{produto.categoria}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5}>Nenhum produto encontrado</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <button
        type="button"
        className="Incluir"
        onClick={() => navigate("/CadastroProduto")}
      >
        {" "}
        Incluir
      </button>
    </Style.Container>
  );
};

export default ConsultaProduto;
