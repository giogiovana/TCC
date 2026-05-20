import * as Style from "../../../Styles/CadastrosStyled.tsx";
import { MdSettings } from "react-icons/md";
import { useForm, Controller } from "react-hook-form";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IMaskInput } from "react-imask";
import { toast } from "react-toastify";
import {
  cadastrarServico,
  consultarServicoPorId,
  excluirServico,
} from "../../../services/index.tsx";
import { Servico, servicoVazio } from "../../../Models/index.tsx";
import { ModalDelete, ModalCancel } from "../../modais/index.tsx";

type ErrorMessageProps = {
  error?: string;
};

export const ErrorMessage = ({ error }: ErrorMessageProps) => {
  if (!error) return null;
  return <p className="error-message">{error}</p>;
};

export const CadastroServico = () => {
  const { id_servico } = useParams<{ id_servico?: string }>();
  const [openModal, setOpenModal] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm<Servico>({
    defaultValues: servicoVazio,
  });

  const servicoAtual = watch();

  useEffect(() => {
    const carregarServico = async () => {
      if (id_servico) {
        const data = await consultarServicoPorId(id_servico);

        console.log(data);

        if (data && typeof data !== "boolean") {
          reset(data);
        }
      } else {
        reset(servicoVazio);
      }
    };

    carregarServico();
  }, [id_servico, reset]);
  

  const onSubmit = async (dados: Servico) => {
    const sucesso = await cadastrarServico(dados);
    if (sucesso) {
      toast.success("Serviço salvo com sucesso!");
      navigate("/consultaServico");
    } else {
      toast.error("Erro ao salvar serviço :(");
    }
  };

  const handleExcluir = async (s: Servico) => {
    const sucesso = await excluirServico(s);

    if (sucesso) {
      toast.success("Serviço excluído com sucesso!");
      navigate("/consultaServico");
    } else {
      toast.error("Erro ao excluir serviço.");
    }
  };

  return (
     <Style.Container>
         <p className="icon">
            <MdSettings /> Serviços
        </p>
        
        <form onSubmit={handleSubmit(onSubmit)}>

        <div className="sessao">
          <div>
            <label>ID</label>
            <input className="idInput" readOnly {...register("id_servico")} />
            <ErrorMessage error={errors.id_servico?.message} />
          </div>

          <div>
            <label>Serviço</label>
            <input
              className="input"
              {...register("nome", {
                required: "O campo é obrigatório",
              })}
            />
            <ErrorMessage error={errors.nome?.message} />
          </div>

          <div>
            <label>Descrição</label>
            <input
              className="obsInput"
              {...register("descricao", {
                required: "O campo é obrigatório",
              })}
            />
            <ErrorMessage error={errors.descricao?.message} />
          </div>

          <div>
            <label>Valor do serviço</label>
            <input
              className="input"
              {...register("valor_servico", {
                required: "O campo é obrigatório",
              })}
            />
            <ErrorMessage error={errors.valor_servico?.message} />
          </div>

           <div>
        <label>Tempo estimado</label>
        <input
            className="input"
            step="0.01"
            min="0"
            {...register("tempo_estimado", {
            required: "O campo é obrigatório",
            pattern: {
                value: /^\d+(\.\d+)?$/,
                message: "Digite apenas números",
            },
            })}
        />
        <ErrorMessage error={errors.tempo_estimado?.message} />
        </div>

        <div>
        <label>Categoria</label>
        <input
            className="input"
            {...register("categoria", {
            required: "O campo é obrigatório",
            })}
        />
        <ErrorMessage error={errors.categoria?.message} />
        </div>
        </div>

        </form>

        <div className="Buttons">
                <button
                  type="submit"
                  className="Salvar"
                  onClick={handleSubmit(onSubmit)}
                >
                  {" "}
                  Salvar
                </button>
        
                <button
                  type="button"
                  className="Cancelar"
                  onClick={() => setOpenModal(true)}
                >
                  {" "}
                  Cancelar
                </button>
        
                <button
                  type="button"
                  className="Excluir"
                  onClick={() => setOpenModalDelete(true)}
                >
                  {" "}
                  Excluir
                </button>
              </div>
        
              <ModalCancel
                isOpen={openModal}
                setOpenModal={setOpenModal}
                onConfirm={() => {
                  reset(servicoVazio);
                  setOpenModal(false);
                  navigate("/consultaServico");
                }}
              />
        
              <ModalDelete
                isOpen={openModalDelete}
                setOpenModal={setOpenModalDelete}
                entidade="o servico"
                onConfirm={() => {
                  handleExcluir(servicoAtual);
                  reset(servicoVazio);
                  setOpenModalDelete(false);
                }}
              />

     </Style.Container>
  );
};

export default CadastroServico;
