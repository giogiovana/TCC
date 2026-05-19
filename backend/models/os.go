package models

type OsCreate struct {
	IdCliente             string `json:"id_cliente,omitempty"`
	IdProduto             string `json:"id_produto,omitempty"`
	DataInicio            string `json:"data_inicio,omitempty"`
	DataFim               string `json:"data_fim,omitempty"`
	TotalHorasTrabalhadas string `json:"total_horas_trabalhadas,omitempty"`
	ValorOs               string `json:"valor_os,omitempty"`
	Status                string `json:"status,omitempty"`
	Descricao             string `json:"descricao,omitempty"`
	Observacao            string `json:"observacao,omitempty"`

	Itens []ControleOsCreate `json:"itens,omitempty"`
}

type Os struct {
	IdOs                  string `db:"id_os" json:"id_os"`
	IdCliente             string `db:"id_cliente" json:"id_cliente"`
	IdProduto             string `db:"id_produto" json:"id_produto"`
	DataInicio            string `db:"data_inicio" json:"data_inicio"`
	DataFim               string `db:"data_fim" json:"data_fim"`
	TotalHorasTrabalhadas string `db:"total_horas_trabalhadas" json:"total_horas_trabalhadas"`
	ValorOs               string `db:"valor_os" json:"valor_os"`
	Status                string `db:"status" json:"status"`
	Descricao             string `db:"descricao" json:"descricao"`
	Observacao            string `db:"observacao" json:"observacao"`

	Itens []ControleOsCreate `json:"itens,omitempty"`
}

type OsComControles struct {
	Os
	Itens []ControleOs `json:"itens"`
}

type OsUpdate struct {
	IdCliente             *string `json:"id_cliente,omitempty"`
	IdProduto             *string `json:"id_produto,omitempty"`
	DataInicio            *string `json:"data_inicio,omitempty"`
	DataFim               *string `json:"data_fim,omitempty"`
	TotalHorasTrabalhadas *string `json:"total_horas_trabalhadas,omitempty"`
	ValorOs               *string `json:"valor_os,omitempty"`
	Status                *string `json:"status,omitempty"`
	Descricao             *string `json:"descricao,omitempty"`
	Observacao            *string `json:"observacao,omitempty"`
}
