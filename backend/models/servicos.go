package models

type ServicoCreate struct {
	Nome          string `json:"nome"`
	Descricao     string `json:"descricao"`
	Valor         string `json:"valor_servico"`
	TempoEstimado string `json:"tempo_estimado"`
	Categoria     string `json:"categoria"`
}

type Servico struct {
	IdServico     string `db:"id_servico" json:"id_servico"`
	Nome          string `db:"nome" json:"nome"`
	Descricao     string `db:"descricao" json:"descricao"`
	Valor         string `db:"valor_servico" json:"valor_servico"`
	TempoEstimado string `db:"tempo_estimado" json:"tempo_estimado"`
	Categoria     string `db:"categoria" json:"categoria"`
}

type ServicoUpdate struct {
	Nome          *string `json:"nome"`
	Descricao     *string `json:"descricao"`
	Valor         *string `json:"valor_servico"`
	TempoEstimado *string `json:"tempo_estimado"`
	Categoria     *string `json:"categoria"`
}
