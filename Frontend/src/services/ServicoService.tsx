import api from "../api";
import { Servico } from "../Models/servico";

export async function consultarServico(): Promise<any> {
  try {
    const response = await api.get("/servicos");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Erro na consulta de ordens de serviço:", error);
    return false;
  }
}

export async function consultarServicoPorId(
  id_servico: string,
): Promise<Servico | false> {
  try {
    const response = await api.get(`/servicos/${id_servico}`);
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    console.error("Erro ao consultar servico por ID");

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

export async function cadastrarServico(servico: Servico): Promise<boolean> {
  try {
    console.log("Payload enviado:", servico);

    if (servico.id_servico) {
      const response = await api.put(
        `/servicos/${servico.id_servico}`,
        servico,
      );
      console.log("UPDATE STATUS:", response.status);
      return response.status === 200 || response.status === 202;
    }
    const response = await api.post("/servicos", servico);
    return response.status === 201;
  } catch (error: any) {
    console.error("ERRO AO SALVAR SERVIÇO");

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

export async function excluirServico(servico: Servico): Promise<boolean> {
  if (!servico.id_servico) {
    console.warn("Servico não encontrado");
    return false;
  }

  try {
    const response = await api.delete(`/servicos/${servico.id_servico}`);
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
