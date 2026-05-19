ALTER TABLE controle_os
DROP CONSTRAINT fk_controle_os_01;

ALTER TABLE controle_os
ADD CONSTRAINT fk_controle_os_01
FOREIGN KEY (id_os)
REFERENCES ordens_servico(id_os)
ON DELETE CASCADE;