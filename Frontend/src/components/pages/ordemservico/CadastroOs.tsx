import * as Style from "../../../Styles/CadastrosStyled";
import Select from "react-select";
import { customSelectStyles } from "../../../Styles/customSelectStyles";

import { MdInventory2 } from "react-icons/md";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { Cliente } from "../../../Models/cliente";
import { Produto } from "../../../Models/produto";
import { Servico } from "../../../Models/servico";
import { cabecalhoVazio, Cabecalho } from "../../../Models/cabecalhoOs";

import ModalCancel from "../../modais/modalCancel";
import ModalDelete from "../../modais/modalDelete";
import ModalServico from "../../modais/modalServico";

import { consultarCliente } from "../cliente/Cliente.Function";
import { consultarProduto } from "../produto/ProdutoFunction";
import { consultarServico, cadastrarOrdemServico, consultarOrdemServicoPorId, excluirOrdemServico, } from "./OsFunction";


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

  const { fields, append, remove } = useFieldArray({
    control,
    name: "itens",
  });

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

  useEffect(() => {
    const carregarDados = async () => {
      const produtos = await consultarProduto();
      const clientes = await consultarCliente();
      const servicos = await consultarServico();


      setProduto(produtos || []);
      setCliente(clientes || []);
      setServico(servicos || []);

    };

    carregarDados();
  }, []);

  useEffect(() => {

  // TOTAL HORAS
  const totalHoras = fields.reduce((acc, item) => {
    return acc + Number(item.qtd_horas_servico || 0);
  }, 0);

  setValue(
    "total_horas_trabalhadas",
    totalHoras.toFixed(2)
  );

  // TOTAL VALOR
  const totalValor = fields.reduce((acc, item) => {

    const servicoEncontrado = servico.find(
      (s) => String(s.id_servico) === String(item.id_servico)
    );

    const valorHora = Number(
      String(servicoEncontrado?.valor_servico || "0")
        .replace("R$", "")
        .replace(",", ".")
        .trim()
    );

    const horas = Number(item.qtd_horas_servico || 0);

    return acc + (valorHora * horas);

  }, 0);

  setValue(
    "valor_os",
    totalValor.toFixed(2)
  );

}, [fields, servico, setValue]);

  const produtoOptions = produto.map((p) => ({
    value: p.id_produto,
    label: p.descricao,
  }));

  const clienteOptions = cliente.map((c) => ({
    value: c.id_cliente,
    label: c.nome_fantasia,
  }));
  

  const converterHoraParaDecimal = (hora: string) => {
  const [h, m] = hora.split(":").map(Number);
  return (h + m / 60).toFixed(2);
  };

  const calcularTotalHoras = () => {

  const total = fields.reduce((acc, item) => {
    return acc + Number(item.qtd_horas_servico || 0);
  }, 0);
  return total.toFixed(2);
  };

  const onSubmit = async (dados: Cabecalho) => {

  const dadosTratados: Cabecalho = {
    ...dados,

    usuario: "admin",
    status: "1",
    id_cliente: String(dados.id_cliente),
    id_produto: String(dados.id_produto),

    valor_os: String(dados.valor_os),

    total_horas_trabalhadas: String(
      dados.total_horas_trabalhadas
    ),
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
              render={({ field }) => (
                <Select
                  styles={customSelectStyles}
                  options={clienteOptions}
                  value={
                    clienteOptions.find(
                      (opt) => String(opt.value) === String(field.value)
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
          </div>

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
                      (opt) => String(opt.value) === String(field.value)
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
              value={watch("total_horas_trabalhadas")}
              readOnly
            />
          </div>

          <input
            className="input"
            value={watch("valor_os")}
            readOnly
          />

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
