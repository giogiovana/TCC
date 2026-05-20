import * as Style from "../../../Styles/CadastrosStyled.tsx";
import Select from "react-select";
import { customSelectStyles } from "../../../Styles/customSelectStyles.tsx";
import { MdInventory2 } from "react-icons/md";
import { FaTrashAlt, FaEdit } from "react-icons/fa";

import { useForm, useFieldArray, Controller } from "react-hook-form";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import {
  Cliente,
  Produto,
  Servico,
  Status,
  Tecnico,
  cabecalhoVazio,
  Cabecalho,
} from "../../../Models/index";
import { ModalCancel, ModalDelete, ModalServico } from "../../modais/index.tsx";
import { carregarLookups } from "../../../services/LookupService.tsx";
import {
  cadastrarOrdemServico,
  consultarOrdemServicoPorId,
  excluirOrdemServico} from "../../../services/index.tsx";

type ErrorMessageProps = {
  error?: string;
};

export const ErrorMessage = ({ error }: ErrorMessageProps) => {
  if (!error) return null;
  return <p className="error-message">{error}</p>;
};

export function CadastroOs() {
  const { id_os } = useParams<{ id_os?: string }>();

  const [openModal, setOpenModal] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openModalServico, setOpenModalServico] = useState(false);

  const [produto, setProduto] = useState<Produto[]>([]);
  const [cliente, setCliente] = useState<Cliente[]>([]);
  const [servico, setServico] = useState<Servico[]>([]);
  const [status, setStatus] = useState<Status[]>([]);
  const [tecnico, setTecnico] = useState<Tecnico[]>([]);
  const [itemEditando, setItemEditando] = useState<number | null>(null);

  const navigate = useNavigate();

  const {
    control,
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Cabecalho>({
    defaultValues: cabecalhoVazio,
  });

  const ordemAtual = watch();

  const { fields, append, remove, replace, update } = useFieldArray({
    control,
    name: "itens",
  });

  useEffect(() => {
    const carregarOrdem = async () => {
      if (id_os) {
        const data = await consultarOrdemServicoPorId(id_os);
        console.log("📦 OS carregada:", data);
        if (data && typeof data !== "boolean") {
          reset(data);
          replace(data.itens || []);
        }
      } else {
        reset(cabecalhoVazio);
        replace([]);
      }
    };
    carregarOrdem();
  }, [id_os, reset, replace]);

  useEffect(() => {
    async function carregarDados() {
      const { clientes, produtos, status, servicos, tecnicos } =
        await carregarLookups();

      setProduto(produtos || []);
      setCliente(clientes || []);
      setServico(servicos || []);
      setTecnico(tecnicos || []);
      setStatus(status || null);
    }

    carregarDados();
  }, []);

  useEffect(() => {
    const totalHoras = fields.reduce((acc, item) => {
      return acc + Number(item.qtd_horas_servico || 0);
    }, 0);

    setValue("total_horas_trabalhadas", totalHoras.toFixed(2));

    const totalValor = fields.reduce((acc, item) => {
      const servicoEncontrado = servico.find(
        (s) => String(s.id_servico) === String(item.id_servico),
      );

      const valorHora = Number(
        String(servicoEncontrado?.valor_servico || "0")
          .replace("R$", "")
          .replace(",", ".")
          .trim(),
      );

      const horas = Number(item.qtd_horas_servico || 0);

      return acc + valorHora * horas;
    }, 0);

    setValue("valor_os", totalValor.toFixed(2));
  }, [fields, servico, setValue]);

  const produtoOptions = produto.map((p) => ({
    value: p.id_produto,
    label: p.descricao,
  }));

  const clienteOptions = cliente.map((c) => ({
    value: c.id_cliente,
    label: c.nome_fantasia,
  }));

  const statusOptions = status.map((s) => ({
    value: s.id_status,
    label: s.descricao,
  }));

  const onSubmit = async (dados: Cabecalho) => {
    const dadosTratados: Cabecalho = {
      ...dados,
      valor_os: String(dados.valor_os),
      total_horas_trabalhadas: String(dados.total_horas_trabalhadas),
    };

    console.log("Payload enviado:", dadosTratados);

    const sucesso = await cadastrarOrdemServico(dadosTratados);

    if (sucesso) {
      toast.success("Ordem de serviço salva com sucesso!");
      navigate("/consultaOs");
    } else {
      toast.error("Erro ao salvar ordem de serviço :(");
    }
  };

  const handleExcluir = async (dados: Cabecalho) => {
    const sucesso = await excluirOrdemServico(dados);

    if (sucesso) {
      toast.success("Ordem de serviço excluída com sucesso!");
      navigate("/consultaOs");
    } else {
      toast.error("Erro ao excluir ordem de serviço.");
    }
  };

  const getTecnicoNome = (id: string) => {
    return (
      tecnico.find((t) => String(t.id_tecnico) === String(id))?.nome_fantasia ||
      id
    );
  };

  return (
    <Style.Container>
      <p className="icon">
        <MdInventory2 /> Ordens de serviço
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="sessao">
          <div>
            <label>ID</label>
            <input className="idInput" readOnly {...register("id_os")} />
          </div>

          <div>
            <label>Cliente</label>

            <Controller
              name="id_cliente"
              control={control}
              rules={{ required: "Selecione um cliente" }}
              render={({ field }) => (
                <Select
                  styles={customSelectStyles}
                  options={clienteOptions}
                  value={
                    clienteOptions.find(
                      (opt) => String(opt.value) === String(field.value),
                    ) || null
                  }
                  onChange={(selected) =>
                    field.onChange(String(selected?.value))
                  }
                  isSearchable
                  placeholder="Selecione um cliente"
                />
              )}
            />
            <ErrorMessage error={errors.id_cliente?.message} />
          </div>

          <div>
            <label>Produto</label>

            <Controller
              name="id_produto"
              rules={{ required: "Selecione um produto" }}
              control={control}
              render={({ field }) => (
                <Select
                  styles={customSelectStyles}
                  options={produtoOptions}
                  value={
                    produtoOptions.find(
                      (opt) => String(opt.value) === String(field.value),
                    ) || null
                  }
                  onChange={(selected) =>
                    field.onChange(String(selected?.value))
                  }
                  isSearchable
                  placeholder="Selecione um produto"
                />
              )}
            />
            <ErrorMessage error={errors.id_produto?.message} />
          </div>

          <div>
            <label>Início</label>
            <input
              type="date"
              className="input"
              {...register("data_inicio", {
                required: "Selecione a data de início",
              })}
            />
            <ErrorMessage error={errors.data_inicio?.message} />
          </div>

          <div>
            <label>Fim</label>
            <input type="date" className="input" {...register("data_fim")} />
          </div>

          <div>
            <label>Horas trabalhadas</label>
            <input
              className="disabled"
              value={watch("total_horas_trabalhadas")}
              readOnly
            />
          </div>

          <div>
            <label>Valor total</label>
            <input className="disabled" value={watch("valor_os")} readOnly />
          </div>

          <div>
            <label>Descrição</label>
            <input
              className="obsInput"
              {...register("descricao", { required: "Digite a descrição" })}
            />
            <ErrorMessage error={errors.descricao?.message} />
          </div>

          <div>
            <label>Status</label>

            <Controller
              name="status"
              control={control}
              rules={{ required: "Selecione um status" }}
              render={({ field }) => (
                <Select
                  styles={customSelectStyles}
                  options={statusOptions}
                  value={
                    statusOptions.find(
                      (s) => String(s.value) === String(field.value),
                    ) || null
                  }
                  onChange={(selected) =>
                    field.onChange(String(selected?.value))
                  }
                  isSearchable
                  placeholder="Selecione um status"
                />
              )}
            />
            <ErrorMessage error={errors.status?.message} />
          </div>
        </div>

        <button
          type="button"
          className="btnAdd"
          onClick={() => setOpenModalServico(true)}
        >
          Adicionar serviço
        </button>

        <div className="tableContainer">
          <table>
            <thead>
              <tr>
                <th>Serviço</th>
                <th>Técnico</th>
                <th>Início</th>
                <th>Fim</th>
                <th>Horas</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {fields.length > 0 ? (
                fields.map((item, index) => (
                  <tr key={item.id}>
                    <td>{item.id_servico}</td>
                    <td>{getTecnicoNome(item.id_tecnico)}</td>
                    <td>{item.data_inicio}</td>
                    <td>{item.data_fim}</td>
                    <td>{item.qtd_horas_servico}</td>
                    <td>
                      <div className="acoes">
                        <button
                          type="button"
                          className="excluir"
                          onClick={() => remove(index)}
                        >
                          {" "}
                          <FaTrashAlt />
                        </button>

                        <button
                          type="button"
                          className="editar"
                          onClick={() => {
                            setItemEditando(index);
                            setOpenModalServico(true);
                          }}
                        >
                          {" "}
                          <FaEdit />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6}>Nenhum serviço registrado</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </form>

      <div className="Buttons">
        <button
          type="submit"
          className="Salvar"
          onClick={handleSubmit(onSubmit)}
        >
          Salvar
        </button>

        <button
          type="button"
          className="Cancelar"
          onClick={() => setOpenModal(true)}
        >
          Cancelar
        </button>

        <button
          type="button"
          className="Excluir"
          onClick={() => setOpenModalDelete(true)}
        >
          Excluir
        </button>
      </div>

      <ModalCancel
        isOpen={openModal}
        setOpenModal={setOpenModal}
        onConfirm={() => {
          reset(cabecalhoVazio);
          setOpenModal(false);
          navigate("/consultaOs");
        }}
      />

      <ModalDelete
        isOpen={openModalDelete}
        setOpenModal={setOpenModalDelete}
        entidade="a ordem de serviço"
        onConfirm={() => {
          handleExcluir(ordemAtual);
          reset(cabecalhoVazio);
          setOpenModalDelete(false);
        }}
      />

      <ModalServico
        isOpen={openModalServico}
        itemInicial={itemEditando !== null ? fields[itemEditando] : undefined}
        onClose={() => {
          setOpenModalServico(false);
          setItemEditando(null);
        }}
        onSave={(item) => {
          const itemNovo = {
            ...item,
            id_os: watch("id_os"),
          };

          if (itemEditando !== null) {
            update(itemEditando, itemNovo);
          } else {
            append(itemNovo);
          }
          setItemEditando(null);
          setOpenModalServico(false);
        }}
      />
    </Style.Container>
  );
}

export default CadastroOs;
