import { consultarCliente } from "./ClienteService";
import { consultarProduto } from "./ProdutoService";
import { consultarOrdemServico, consultarStatus } from "./OsService";
import { consultarTecnico } from "./TecnicoService";
import { consultarServico } from "./ServicoService";

export async function carregarLookups() {
  try {
    const [clientes, produtos, tecnicos, servicos, ordensServico, status] =
      await Promise.all([
        consultarCliente(),
        consultarProduto(),
        consultarTecnico(),
        consultarServico(),
        consultarOrdemServico(),
        consultarStatus(),
      ]);

    return {
      clientes: clientes || [],
      produtos: produtos || [],
      servicos: servicos || [],
      tecnicos: tecnicos || [],
      ordensServico: ordensServico || [],
      status: status || [],
    };
  } catch (error) {
    console.error("Erro ao carregar lookups:", error);

    return {
      clientes: [],
      produtos: [],
      ordensServico: [],
      servicos: [],
      tecnicos: [],
      status: [],
    };
  }
}
