package models

type StatusOs struct {
	IdStatus  string `db:"id_status" json:"id_status"`
	Descricao string `db:"descricao" json:"descricao"`
}
