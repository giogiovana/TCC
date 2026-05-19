export type Itens = {
  id_os: string;
  id_servico: string;
  id_tecnico: string;
  data_inicio: string;
  data_fim: string;
  qtd_horas_servico: string;
  observacao: string;
};

export const itensVazios: Itens = {
  id_os: "",
  id_tecnico: "",
  id_servico: "",
  data_inicio: "",
  data_fim: "",
  observacao: "",
  qtd_horas_servico: "",
};
