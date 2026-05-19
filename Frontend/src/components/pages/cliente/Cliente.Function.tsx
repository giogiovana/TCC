import api from "../../../api";
import { Cliente } from "../../../Models/cliente";

export async function cadastrarCliente(cliente: Cliente): Promise<boolean> {
  try {
    if (cliente.id_cliente) {
      const response = await api.put(
        `/clientes/${cliente.id_cliente}`,
        cliente,
      );
      console.log(response.status);
      return response.status === 200;
    }

    const response = await api.post("/clientes", cliente);
    return response.status === 201;
  } catch (error) {
    console.error("Erro no cadastro de clientes:", error);
    console.log();
    return false;
  }
}

export async function consultarCliente(): Promise<any> {
  try {
    const response = await api.get("/clientes");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Erro na consulta de clientes:", error);
    return false;
  }
}

export async function excluirCliente(cliente: Cliente): Promise<boolean> {
  if (!cliente.id_cliente) {
    console.warn("Cliente não encontrado");
    return false;
  }

  try {
    const response = await api.delete(`/clientes/${cliente.id_cliente}`);
    return response.status === 200 || response.status === 204;
  } catch (error) {
    console.error("Erro na exclusão de clientes:", error);
    return false;
  }
}

export async function consultarClientePorId(
  id_cliente: string,
): Promise<Cliente | false> {
  try {
    const response = await api.get(`/clientes/${id_cliente}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Erro ao consultar cliente por ID:", error);
    return false;
  }
}
