export type Produto = {
  id_produto: string;
  marca: String;
  modelo: String;
  tipo: String;
  descricao: String;
  categoria: String;
  observacao: String;
};

export const produtoVazio: Produto = {
  id_produto: "",
  marca: "",
  modelo: "",
  tipo: "",
  descricao: "",
  categoria: "",
  observacao: "",
};
