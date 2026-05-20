import * as Style from "../../Styles/modalServ.Styles";
import { customSelectStyles } from "../../Styles/customSelectStyles";

import { useEffect, useState } from "react";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";

import { carregarLookups } from "../../services/LookupService";
import { Itens, itensVazios, Servico, Tecnico } from "../../Models/index";

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
  itemInicial?: Itens | null;
};

export default function ModalServico({
  isOpen,
  onClose,
  onSave,
  itemInicial,
}: ModalProps) {
  const [servico, setServico] = useState<Servico[]>([]);
  const [tecnico, setTecnico] = useState<Tecnico[]>([]);
  const [servicoSelecionado, setServicoSelecionado] = useState<Servico | null>(
    null,
  );

  const {
    control,
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<Itens>({
    defaultValues: itensVazios,
  });

  const idServicoSelecionado = watch("id_servico");

  useEffect(() => {
    async function carregarDados() {
      const { servicos, tecnicos } = await carregarLookups();

      setServico(Array.isArray(servicos) ? servicos : []);
      setTecnico(Array.isArray(tecnicos) ? tecnicos : []);
    }
    carregarDados();
  }, []);

  useEffect(() => {
    if (itemInicial) {
      reset(itemInicial);
    } else {
      reset(itensVazios);
    }
  }, [itemInicial, reset]);

  if (!isOpen) return null;

  const servicoOptions = servico.map((s) => ({
    value: s.id_servico,
    label: `${s.nome}`,
  }));

  const tecnicoOptions = tecnico.map((t) => ({
    value: t.id_tecnico,
    label: t.nome_fantasia,
  }));

  const onSubmit = (data: Itens) => {
    const itemFinal: Itens = {
      ...data,

      id_servico: String(data.id_servico),
      id_tecnico: String(data.id_tecnico),

      qtd_horas_servico: String(data.qtd_horas_servico),
    };

    onSave(itemFinal);
    reset(itensVazios);
    onClose();
  };

  return (
    <Style.Container>
      <div className="ModalServico">
        <h2>Adicionar Serviço</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="sessao2">
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
                        (opt) => opt.value === String(field.value),
                      ) || null
                    }
                    onChange={(selected) => {
                      const serv = servico.find(
                        (s) => s.id_servico === selected?.value,
                      );

                      setServicoSelecionado(serv || null);

                      field.onChange(String(selected?.value));
                    }}
                    isSearchable
                  />
                )}
              />
              <ErrorMessage error={errors.id_servico?.message} />
            </div>

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
                        (opt) => opt.value === String(field.value),
                      ) || null
                    }
                    onChange={(selected) =>
                      field.onChange(String(selected?.value))
                    }
                    isSearchable
                  />
                )}
              />
              <ErrorMessage error={errors.id_tecnico?.message} />
            </div>

            <div className="dates">
              <div>
                <label>Início</label>
                <input
                  type="date"
                  className="date-input"
                  {...register("data_inicio", {
                    required: "Digite a data de início",
                  })}
                />
                <ErrorMessage error={errors.data_inicio?.message} />
              </div>

              <div>
                <label>Fim</label>
                <input
                  className="date-input"
                  type="date"
                  {...register("data_fim")}
                />
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
                <label>Horas trabalhadas </label>
                <input
                  className="date-input"
                  step="0.01"
                  min="0"
                  {...register("qtd_horas_servico", {
                    required: "Digite a quantidade de horas",
                    pattern: {
                                value: /^\d+$/,
                                message: "Digite apenas números",
                              },
                  })}
                />
                <ErrorMessage error={errors.qtd_horas_servico?.message} />
              </div>
            </div>

            <div>
              <label>Observação</label>
              <input className="obsInput" {...register("observacao")} />
            </div>

            <div className="buttons">
              <button
                type="button"
                onClick={() => {
                  reset(itensVazios);
                  onClose();
                }}
                className="vermelho"
              >
                {" "}
                Cancelar
              </button>

              <button type="submit" className="roxo">
                {" "}
                Salvar
              </button>
            </div>
          </div>
        </form>
      </div>
    </Style.Container>
  );
}
