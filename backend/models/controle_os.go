package models

type ControleOsCreate struct {
	IdOs       string `json:"id_os"`
	IdTecnico  string `json:"id_tecnico"`
	IdServico  string `json:"id_servico"`
	DataInicio string `json:"data_inicio"`
	DataFim    string `json:"data_fim"`
	Status     string `json:"status"`
	Observacao string `json:"observacao"`
}

type ControleOs struct {
	IdControle string `db:"id_controle" json:"id_controle"`
	IdOs       string `db:"id_os" json:"id_os"`
	IdTecnico  string `db:"id_tecnico" json:"id_tecnico"`
	IdServico  string `db:"id_servico" json:"id_servico"`
	DataInicio string `db:"data_inicio" json:"data_inicio"`
	DataFim    string `db:"data_fim" json:"data_fim"`
	Status     string `db:"status" json:"status"`
	Observacao string `db:"observacao" json:"observacao"`
}

type ControleOsUpdate struct {
	IdOs       *string `json:"id_os,omitempty"`
	IdTecnico  *string `json:"id_tecnico,omitempty"`
	IdServico  *string `json:"id_servico,omitempty"`
	DataInicio *string `json:"data_inicio,omitempty"`
	DataFim    *string `json:"data_fim,omitempty"`
	Status     *string `json:"status,omitempty"`
	Observacao *string `json:"observacao,omitempty"`
}
