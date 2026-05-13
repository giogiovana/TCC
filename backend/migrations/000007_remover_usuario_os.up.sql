drop index if exists idx_os_01;

alter table ordens_servico
drop constraint if exists fk_os_01;

alter table ordens_servico
drop column if exists usuario;
