alter table ordens_servico
add column status int2;

update ordens_servico os
set status = co.status
from (
	select distinct on (id_os) id_os, status
	from controle_os
	order by id_os, id_controle desc
) co
where os.id_os = co.id_os;

alter table ordens_servico
add constraint fk_os_04 foreign key (status)
references status_os (id_status);

alter table controle_os
drop column status;
