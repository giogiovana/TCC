export type Tecnico = {
  id_tecnico: string;
  cpf_cnpj: string;
  rg_ie: string;
  fg_tipo: string;
  razao_social: string;
  nome_fantasia: string;
  email: string;
  telefone: string;
  cep: string;
  logradouro: string;
  numero: string;
  bairro: string;
  cidade: string;
  uf: string;
  usuario: string;
  especialidade: string;
  fg_ativo: "S" | "N";
};

export const tecnicoVazio: Tecnico = {
  id_tecnico: "",
  cpf_cnpj: "",
  rg_ie: "",
  razao_social: "",
  nome_fantasia: "",
  email: "",
  telefone: "",
  cep: "",
  logradouro: "",
  numero: "",
  bairro: "",
  cidade: "",
  uf: "",
  usuario: "",
  especialidade: "",
  fg_ativo: "S",
  fg_tipo: "F",
};
