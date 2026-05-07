export type Servico = {
 id_servico: string;
 nome: string;
 descricao: String;
 valor_servico: string;
 tempo_estimado: string;
 categoria: String;
};

export const servicoVazio: Servico = {
 id_servico: "",
 nome: "",
 descricao: "",
 valor_servico: "",
 tempo_estimado: "",
 categoria: "",
};
