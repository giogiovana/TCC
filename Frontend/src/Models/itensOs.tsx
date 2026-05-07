export type Itens = {
    id_os: string;
	id_servico: number | undefined;
	id_tecnico: number | undefined;
	data_inicio: string;
	data_fim: string;
	// status: String;
	total_horas_trabalhadas: number;
	observacao: string;
};

export const itensVazios: Itens = {
    id_os: "",
	id_tecnico: 0,
	id_servico: 0,
	data_inicio: "",
	data_fim: "",
	// status: "",
	observacao: "",
	total_horas_trabalhadas: 0
};