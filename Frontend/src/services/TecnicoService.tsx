import api from "../api";
import { Tecnico } from "../Models/index";

export async function cadastrarTecnico(
  tecnico: Tecnico
): Promise<boolean> {

  try {

    if (tecnico.id_tecnico) {

      const response = await api.put(
        `/tecnicos/${tecnico.id_tecnico}`,
        tecnico
      );

      console.log(
        "STATUS ALTERAÇÃO:",
        response.status
      );

      return (
        response.status >= 200 &&
        response.status < 300
      );
    }

    const response = await api.post(
      "/tecnicos",
      tecnico
    );

    console.log(
      "STATUS INCLUSÃO:",
      response.status
    );

    return (
      response.status >= 200 &&
      response.status < 300
    );

  } catch (error:any) {

    console.error(
      "Erro no cadastro de técnicos:",
      error
    );

    if (error.response) {

      console.log(
        "STATUS:",
        error.response.status
      );

      console.log(
        "MSG:",
        error.response.data
      );

      console.log(
        "PAYLOAD:",
        JSON.parse(error.config?.data)
      );
    }

    return false;
  }
}

export async function consultarTecnico(): Promise<Tecnico[]> {
  try {
    const response = await api.get("/tecnicos");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Erro na consulta de tecnicos:", error);
    return [];
  }
}

export async function excluirTecnico(tecnico: Tecnico): Promise<boolean> {
  if (!tecnico.id_tecnico) {
    console.warn("Tecnico não encontrado");
    return false;
  }

  try {
    const response = await api.delete(`/tecnicos/${tecnico.id_tecnico}`);
    return response.status === 200 || response.status === 204;
  } catch (error) {
    console.error("Erro na exclusão de tecnicos:", error);
    return false;
  }
}

export async function consultarTecnicoPorId(
  id_tecnico: string,
): Promise<Tecnico | false> {
  try {
    const response = await api.get(`/tecnicos/${id_tecnico}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Erro ao consultar tecnico por ID:", error);
    return false;
  }
}
