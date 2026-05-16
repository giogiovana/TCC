import { Itens } from "../Models/itensOs";

export type Cabecalho = {
  id_os: string;
  id_cliente: string;
  id_produto: string;
  data_inicio: string;
  data_fim: string;
  total_horas_trabalhadas: string;
  valor_os: string;
  descricao: string;
  observacao: string;
  status: string;
  itens: Itens[];
};

export const cabecalhoVazio: Cabecalho = {
  id_os: "",
  id_cliente: "",
  id_produto: "",
  data_inicio: "",
  data_fim: "",
  total_horas_trabalhadas: "",
  valor_os: "",
  descricao: "",
  observacao: "",
  itens: [],
  status: "",
};
