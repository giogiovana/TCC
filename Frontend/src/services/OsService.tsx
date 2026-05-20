import api from "../api";
import { Cabecalho } from "../Models/cabecalhoOs";

export async function cadastrarOrdemServico(
  cabecalho: Cabecalho,
): Promise<boolean> {
  try {
    console.log("Payload enviado:", cabecalho);

    if (cabecalho.id_os) {
      const response = await api.put(
        `/ordens-servico/${cabecalho.id_os}`,
        cabecalho,
      );

      console.log("UPDATE STATUS:", response.status);

      return response.status === 200 || response.status === 202;
    }

    const response = await api.post("/ordens-servico", cabecalho);

    return response.status === 201;
  } catch (error: any) {
    console.error("ERRO AO SALVAR ORDEM DE SERVIÇO");

    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Mensagem:", error.response.data);
      console.error("Payload enviado:", JSON.parse(error.config?.data));
    } else if (error.request) {
      console.error("Sem resposta do servidor:", error.request);
    } else {
      console.error("Erro:", error.message);
    }

    return false;
  }
}

export async function consultarOrdemServico(): Promise<any> {
  try {
    const response = await api.get("/ordens-servico");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Erro na consulta de ordemservicos:", error);
    return false;
  }
}

export async function excluirOrdemServico(
  ordemservico: Cabecalho,
): Promise<boolean> {
  if (!ordemservico.id_os) {
    console.warn("OrdemServico não encontrado");
    return false;
  }

  try {
    const response = await api.delete(`/ordens-servico/${ordemservico.id_os}`);
    return response.status === 200 || response.status === 204;
  } catch (error: any) {
    console.error("Erro na exclusão");

    if (error.response) {
      console.log("STATUS:", error.response.status);
      console.log("MSG:", error.response.data);
    }

    return false;
  }
}

export async function consultarOrdemServicoPorId(
  id_os: string,
): Promise<Cabecalho | false> {
  try {
    const response = await api.get(`/ordens-servico/${id_os}/itens`);
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    console.error("Erro ao consultar ordem servico por ID");

    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Mensagem:", error.response.data);
      console.error("URL:", error.config?.url);
    } else if (error.request) {
      console.error("Sem resposta do servidor:", error.request);
    } else {
      console.error("Erro:", error.message);
    }
    return false;
  }
}

export async function consultarStatus(): Promise<any> {
  try {
    const response = await api.get("/status-os");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Erro na consulta de ordens de serviço:", error);
    return false;
  }
}
