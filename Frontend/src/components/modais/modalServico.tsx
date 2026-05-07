import * as Style from "../../Styles/modalServ.Styles";
import { customSelectStyles } from "../../Styles/customSelectStyles";

import { Itens } from "../../Models/itensOs";
import { Servico } from "../../Models/servico";
import { Tecnico } from "../../Models/tecnico";

import { useEffect, useState } from "react";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";

import { consultarTecnico } from "../pages/tecnicos/TecnicoFunction";
import { consultarServico } from "../pages/ordemservico/OsFunction";

type ErrorMessageProps = {
  error?: string;
};

export const ErrorMessage = ({ error }: ErrorMessageProps) => {
  if (!error) return null;
  return <p className="error-message">{error}</p>;
};

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: Itens) => void;
  itemEditando?: Itens | null;
};

const itemVazio: Itens = {
  id_os: "",
  id_tecnico: undefined,
  id_servico: undefined,
  data_inicio: "",
  data_fim: "",
  observacao: "",
  total_horas_trabalhadas: 0
};

export default function ModalServico({
  isOpen,
  onClose,
  onSave,
  itemEditando,
}: ModalProps) {
  const [servico, setServico] = useState<Servico[]>([]);
  const [tecnico, setTecnico] = useState<Tecnico[]>([]);
  const [servicoSelecionado, setServicoSelecionado] = useState<Servico | null>(null);

  const {
    control,
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<Itens>({
    defaultValues: itemVazio,
  });

  const idServicoSelecionado = watch("id_servico");

  useEffect(() => {
    if (!isOpen) return;

    async function carregarDados() {
      const servicos = await consultarServico();
      const tecnicos = await consultarTecnico();

      setServico(Array.isArray(servicos) ? servicos : []);
      setTecnico(Array.isArray(tecnicos) ? tecnicos : []);
    }

    carregarDados();
  }, [isOpen]);

useEffect(() => {
    if (itemEditando) {
      reset(itemEditando);
    } else {
      reset(itemVazio);
    }
  }, [itemEditando, reset]);

  if (!isOpen) return null;

  const servicoOptions = servico.map((s) => ({
    value: s.id_servico,
    label: `${s.nome} - R$ ${s.valor_servico}`,
  }));

  const tecnicoOptions = tecnico.map((t) => ({
    value: t.id_tecnico,
    label: t.nome_fantasia,
  }));

  const onSubmit = (data: Itens) => {
    const servicoSelecionado = servico.find(
      (s) => s.id_servico === String(data.id_servico)
    );

    const itemFinal: Itens = {
      ...data,
      id_servico: Number(data.id_servico),
      id_tecnico: Number(data.id_tecnico),
    };

    onSave(itemFinal);
    reset(itemVazio)
    onClose();
  };

  return (
    <Style.Container>
      <div className="ModalServico">
        <h2>Adicionar Serviço</h2>

        <form 
        onSubmit={handleSubmit(onSubmit)}>
        
          <div className="sessao2">

            {/* SERVIÇO */}
            <div>
              <label>Serviço</label>

              <Controller
                name="id_servico"
                control={control}
                rules={{ required: "Selecione um serviço" }}
                render={({ field }) => (
                  <Select
                    styles={customSelectStyles}
                    options={servicoOptions}
                    value={
                      servicoOptions.find(
                        (opt) => opt.value === String(field.value)
                      ) || null
                    }
                    onChange={(selected) => {
                        const serv = servico.find(
                          (s) => s.id_servico === selected?.value
                        );

                        setServicoSelecionado(serv || null);

                        field.onChange(selected?.value);
                     } 
                    }
                    isSearchable
                  />
                )}
              />
              {errors.id_servico && <p>{errors.id_servico.message}</p>}
            </div>

            {/* TECNICO */}
            <div>
              <label>Técnico</label>

              <Controller
                name="id_tecnico"
                control={control}
                rules={{ required: "Selecione um técnico" }}
                render={({ field }) => (
                  <Select
                    styles={customSelectStyles}
                    options={tecnicoOptions}
                    value={
                      tecnicoOptions.find(
                        (opt) => opt.value === String(field.value)
                      ) || null
                    }
                    onChange={(selected) =>
                      field.onChange(Number(selected?.value))
                    }
                    isSearchable
                  />
                )}
              />
              {errors.id_tecnico && <p>{errors.id_tecnico.message}</p>}
            </div>

            {/* DATAS */}
            <div className="dates">
              <div>
                <label>Início</label>
                <input
                  type="date"
                  className="date-input"
                  {...register("data_inicio", {
                  })}
                />
                {errors.data_inicio && <p>{errors.data_inicio.message}</p>}
              </div>

              <div>
                <label>Fim</label>
                <input
                className="date-input"
                  type="date"
                  
                  {...register("data_fim", {
                  })}
                />
                {errors.data_fim && <p>{errors.data_fim.message}</p>}
              </div>
            </div>

            <div className="dates">
            <div>
            <label>Valor do serviço</label>
            <input
              className="disabled"
              value={servicoSelecionado?.valor_servico || 0}
              readOnly
            />
            </div>

            <div>
            <label>Horas trabalhadas</label>
            <input
              type="time"
              className="date-input"
              {...register("total_horas_trabalhadas", )}
            />
          </div>
          </div>

            {/* OBS */}
            <div>
              <label>Observação</label>
              <input 
              className="obsInput"
              {...register("observacao")} />
            </div>

            {/* BOTÕES */}
            <div className="buttons">
              <button 
              type="button" 
               onClick={() => {
                reset(itemVazio);
                onClose();
              }}
              className="vermelho"
              > Cancelar
              </button>

              <button 
              type="submit"
              className="roxo"
              > Salvar
              </button>
            </div>

          </div>
        </form>
      </div>
    </Style.Container>
  );
}
