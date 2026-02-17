alter table servicos
alter column tempo_estimado type real;

insert into status_os (id_status, descricao) values (1, 'ORÇAMENTO');
insert into status_os (id_status, descricao) values (2, 'ABERTA');
insert into status_os (id_status, descricao) values (3, 'EM ATENDIMENTO');
insert into status_os (id_status, descricao) values (4, 'AGUARDANDO');
insert into status_os (id_status, descricao) values (5, 'FINALIZADA');
insert into status_os (id_status, descricao) values (6, 'FATURADA');
insert into status_os (id_status, descricao) values (7, 'ENTREGUE');
insert into status_os (id_status, descricao) values (8, 'CANCELADA');

insert into servicos (nome, descricao, valor_servico, tempo_estimado, categoria) values
('Diagnóstico técnico', 'Avaliação inicial para identificar causa do problema e propor solução.', 80.00, 60, 'Diagnóstico');

insert into servicos (nome, descricao, valor_servico, tempo_estimado, categoria) values
('Visita técnica', 'Deslocamento e atendimento no local do cliente (sem materiais inclusos).', 120.00, 90, 'Atendimento');

insert into servicos (nome, descricao, valor_servico, tempo_estimado, categoria) values
('Mão de obra - simples', 'Execução de ajuste ou reparo simples (sem necessidade de desmontagens complexas).', 70.00, 45, 'Mão de obra');

insert into servicos (nome, descricao, valor_servico, tempo_estimado, categoria) values
('Mão de obra - padrão', 'Execução de reparo padrão com desmontagem/montagem moderada.', 150, 120, 'Mão de obra');

insert into servicos (nome, descricao, valor_servico, tempo_estimado, categoria) values
('Mão de obra - avançada', 'Reparo avançado com maior complexidade e testes adicionais.', 250, 240, 'Mão de obra');

insert into servicos (nome, descricao, valor_servico, tempo_estimado, categoria) values
('Instalação e configuração', 'Instalação do equipamento/sistema e configuração inicial conforme necessidade do cliente.', 180.00, 150, 'Instalação');

insert into servicos (nome, descricao, valor_servico, tempo_estimado, categoria) values
('Atualização de sistema/firmware', 'Atualização de versão, validação de compatibilidade e testes pós-atualização.', 130.00, 90, 'Atualização');

insert into servicos (nome, descricao, valor_servico, tempo_estimado, categoria) values
('Manutenção preventiva', 'Checklist preventivo, limpeza, reapertos e testes gerais para evitar falhas.', 200.00, 180, 'Preventiva');

insert into servicos (nome, descricao, valor_servico, tempo_estimado, categoria) values
('Limpeza técnica', 'Limpeza interna/externa com inspeção visual e testes básicos.', 90.00, 60, 'Preventiva');

insert into servicos (nome, descricao, valor_servico, tempo_estimado, categoria) values
('Calibração/ajuste fino', 'Calibração e ajustes finos para melhor desempenho e precisão.', 160.00, 120, 'Ajuste');

insert into servicos (nome, descricao, valor_servico, tempo_estimado, categoria) values
('Treinamento rápido', 'Treinamento básico de uso para o cliente/usuários (presencial ou remoto).', 150.00, 60, 'Treinamento');

insert into servicos (nome, descricao, valor_servico, tempo_estimado, categoria) values
('Suporte remoto (30 min)', 'Atendimento remoto para orientação, ajustes e validações (até 30 minutos).', 50.00, 30, 'Suporte');

insert into servicos (nome, descricao, valor_servico, tempo_estimado, categoria) values
('Suporte remoto (60 min)', 'Atendimento remoto para correções e configurações (até 60 minutos).', 90.00, 60, 'Suporte');

insert into servicos (nome, descricao, valor_servico, tempo_estimado, categoria) values
('Reinstalação/configuração completa', 'Reinstalação completa e reconfiguração, com validação final do funcionamento.', 220.00, 180, 'Instalação');

insert into servicos (nome, descricao, valor_servico, tempo_estimado, categoria) values
('Teste e validação final', 'Testes funcionais, checklist de entrega e evidências (quando aplicável).', 60.00, 30, 'Qualidade');
