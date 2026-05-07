import * as Style from "../../../Styles/CadastrosStyled";
import Select from "react-select";
import { customSelectStyles } from "../../../Styles/customSelectStyles";

import { MdInventory2 } from "react-icons/md";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import ModalCancel from "../../modais/modalCancel";
import ModalDelete from "../../modais/modalDelete";
import ModalServico from "../../modais/modalServico";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { cadastrarOrdemServico, consultarOrdemServicoPorId, excluirOrdemServico, } from "./OsFunction";
import { cabecalhoVazio, Cabecalho } from "../../../Models/cabecalhoOs";
import { toast } from "react-toastify";

import { Cliente } from "../../../Models/cliente";
import { Produto } from "../../../Models/produto";

// 🔥 IMPORTAR SUAS FUNÇÕES DE CONSULTA
import { consultarCliente } from "../cliente/Cliente.Function";
import { consultarProduto } from "../produto/ProdutoFunction";

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

  const navigate = useNavigate();

  const {
    control,
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<Cabecalho>({
    defaultValues: cabecalhoVazio,
  });

  const ordemAtual = watch();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "itens",
  });

  // 🔥 carregar OS
  useEffect(() => {
    const carregarOrdem = async () => {
      if (id_os) {
        const data = await consultarOrdemServicoPorId(id_os);
        if (data && typeof data !== "boolean") {
          reset(data);
        }
      } else {
        reset(cabecalhoVazio);
      }
    };

    carregarOrdem();
  }, [id_os, reset]);

  // 🔥 carregar selects
  useEffect(() => {
    const carregarDados = async () => {
      const produtos = await consultarProduto();
      const clientes = await consultarCliente();

      setProduto(produtos || []);
      setCliente(clientes || []);
    };

    carregarDados();
  }, []);

  const produtoOptions = produto.map((p) => ({
    value: p.id_produto,
    label: p.descricao,
  }));

  const clienteOptions = cliente.map((c) => ({
    value: c.id_cliente,
    label: c.nome_fantasia,
  }));

  const onSubmit = async (dados: Cabecalho) => {
    const sucesso = await cadastrarOrdemServico(dados);

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

          {/* ✅ CLIENTE */}
          <div>
            <label>Cliente</label>

            <Controller
              name="id_cliente"
              control={control}
              render={({ field }) => (
                <Select
                  styles={customSelectStyles}
                  options={clienteOptions}
                  value={
                    clienteOptions.find(
                      (opt) => opt.value === field.value
                    ) || null
                  }
                  onChange={(selected) =>
                    field.onChange(Number(selected?.value))
                  }
                  isSearchable
                  placeholder="Selecione um cliente"
                />
              )}
            />
          </div>

          {/* ✅ PRODUTO */}
          <div>
            <label>Produto</label>

            <Controller
              name="id_produto"
              control={control}
              render={({ field }) => (
                <Select
                  styles={customSelectStyles}
                  options={produtoOptions}
                  value={
                    produtoOptions.find(
                      (opt) => opt.value === field.value
                    ) || null
                  }
                  onChange={(selected) =>
                    field.onChange(Number(selected?.value))
                  }
                  isSearchable
                  placeholder="Selecione um produto"
                />
              )}
            />
          </div>          

          <div>
            <label>Início</label>
            <input 
            type="date"
            className="input" {...register("data_inicio")} />
          </div>

          <div>
            <label>Fim</label>
            <input 
            type="date"
            className="input" {...register("data_fim")} />
          </div>

          <div>
            <label>Horas trabalhadas</label>
            <input
              className="input"
              {...register("total_horas_trabalhadas")}
            />
          </div>

          <div>
            <label>Valor total</label>
            <input className="input" {...register("valor_os")} />
          </div>

          <div>
            <label>Descrição</label>
            <input className="obsInput" {...register("descricao")} />
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
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {fields.length > 0 ? (
                fields.map((item, index) => (
                  <tr key={item.id}>
                    <td>{item.id_servico}</td>
                    <td>{item.id_tecnico}</td>
                    <td>{item.data_inicio}</td>
                    <td>{item.data_fim}</td>
                    <td>
                      <button
                        type="button"
                        className="excluir"
                        onClick={() => remove(index)}
                      >
                        <FaTrashAlt />
                      </button>

                      <button
                        type="button"
                        className="editar"
                        onClick={() => remove(index)}
                      >
                        <FaEdit />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5}>
                    Nenhum serviço registrado
                  </td>
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
        onClose={() => setOpenModalServico(false)}
        onSave={(item) => {
          append({
            ...item,
            id_os: watch("id_os"),
          });
        }}
      />
    </Style.Container>
  );
}

export default CadastroOs;
