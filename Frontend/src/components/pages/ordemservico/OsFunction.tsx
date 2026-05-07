import api from "../../../api";
import { Cabecalho } from "../../../Models/cabecalhoOs";
import { Servico } from "../../../Models/servico";


export async function cadastrarOrdemServico(cabecalho: Cabecalho): Promise<boolean> {
  try {
    if (cabecalho.id_os) {
      const response = await api.put(
        `/controle-os/${cabecalho.id_os}`,
        cabecalho,
      );
      console.log(response.status);
      return response.status === 200;
    }

    const response = await api.post("controle-os", cabecalho);
    return response.status === 201;

  } catch (error:any) {
    console.error("❌ ERRO AO SALVAR ORDEM DE SERVIÇO");

  if (error.response) {
    // 🔴 Backend respondeu (400, 500 etc)
    console.error("Status:", error.response.status);
    console.error("Mensagem:", error.response.data);
    console.error("URL:", error.config?.url);
    console.error("Método:", error.config?.method);
    console.error("Payload enviado:", error.config?.data);
  } else if (error.request) {
    // 🟡 Request foi feita mas sem resposta
    console.error("Sem resposta do servidor:", error.request);
  } else {
    // ⚫ Erro ao montar a request
    console.error("Erro:", error.message);
  }

    return false;
  }
}

export async function consultarOrdemServico(): Promise<any> {
  try {
    const response = await api.get("/ordemservicos");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Erro na consulta de ordemservicos:", error);
    return false;
  }
}

export async function excluirOrdemServico(ordemservico: Cabecalho): Promise<boolean> {
  
    if (!ordemservico.id_os){
    console.warn("OrdemServico não encontrado")
    return false;
    }

    try {
    const response = await api.delete(`/ordemservicos/${ordemservico.id_os}`);
    return response.status === 200 || response.status === 204;

  } catch (error) {
    console.error("Erro na exclusão de ordemservicos:", error);
    return false;
  }
}

export async function consultarOrdemServicoPorId(
  id_os: string,
): Promise<Cabecalho | false> {
  try {
    const response = await api.get(`/ordemservicos/${id_os}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Erro ao consultar ordem servico por ID:", error);
    return false;
  }
}


export async function consultarServico(): Promise<any> {
  try {
    const response = await api.get("/servicos");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Erro na consulta de ordemservicos:", error);
    return false;
  }
}