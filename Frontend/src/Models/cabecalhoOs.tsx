import { Itens } from "../Models/itensOs";

export type Cabecalho = {
    id_os: string;
	usuario: string;
	id_cliente: string;
	id_produto: string;
	data_inicio: string;
	data_fim: string;
	total_horas_trabalhadas: string;
	valor_os: string;
	descricao: string;
    observacao: string;
    itens: Itens[];
};

export const cabecalhoVazio: Cabecalho = {
    id_os: "",
    usuario: "",
	id_cliente: "",
	id_produto: "",
	data_inicio: "",
	data_fim: "",
	total_horas_trabalhadas: "",
	valor_os: "",
	descricao: "",
    observacao: "",
    itens: [],
};

