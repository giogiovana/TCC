import api from "../api";
import { Produto } from "../Models/produto";

export async function cadastrarProduto(produto: Produto): Promise<boolean> {
  try {
    if (produto.id_produto) {
      const response = await api.put(
        `/produtos/${produto.id_produto}`,
        produto,
      );
      console.log(response.status);
      return response.status >= 200 &&
       response.status < 300;
    }

    const response = await api.post("/produtos", produto);
    return response.status === 201;
  } catch (error) {
    console.error("Erro no cadastro de produto:", error);
    console.log();
    return false;
  }
}

export async function consultarProduto(): Promise<any> {
  try {
    const response = await api.get("/produtos");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Erro na consulta de produtos:", error);
    return false;
  }
}

export async function excluirProduto(produto: Produto): Promise<boolean> {
  if (!produto.id_produto) {
    console.warn("Produto não encontrado");
    return false;
  }

  try {
    const response = await api.delete(`/produtos/${produto.id_produto}`);
    return response.status === 200 || response.status === 204;
  } catch (error) {
    console.error("Erro na exclusão de produtos:", error);
    return false;
  }
}

export async function consultarProdutoPorId(
  id_produto: string,
): Promise<Produto | false> {
  try {
    const response = await api.get(`/produtos/${id_produto}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Erro ao consultar produto por ID:", error);
    return false;
  }
}
