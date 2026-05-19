import * as Style from "../../../Styles/CadastrosStyled";
import { MdPerson } from "react-icons/md";
import { useForm, Controller } from "react-hook-form";
import ModalCancel from "../../modais/modalCancel";
import ModalDelete from "../../modais/modalDelete";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  cadastrarCliente,
  consultarClientePorId,
  excluirCliente,
} from "./Cliente.Function";
import { Cliente, clienteVazio } from "../../../Models/cliente";
import { useParams } from "react-router-dom";
import { IMaskInput } from "react-imask";
import { toast } from "react-toastify";

type ErrorMessageProps = {
  error?: string;
};

export const ErrorMessage = ({ error }: ErrorMessageProps) => {
  if (!error) return null;
  return <p className="error-message">{error}</p>;
};

export function CadastroCliente() {
  const { id_cliente } = useParams<{ id_cliente?: string }>();
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
  } = useForm<Cliente>({
    defaultValues: clienteVazio,
  });

  const tipo = watch("fg_tipo");
  const fg_ativo = watch("fg_ativo");
  const clienteAtual = watch();

  useEffect(() => {
    const carregarCliente = async () => {
      if (id_cliente) {
        const data = await consultarClientePorId(id_cliente);

        console.log(data);

        if (data && typeof data !== "boolean") {
          reset(data);
        }
      } else {
        reset(clienteVazio);
      }
    };

    carregarCliente();
  }, [id_cliente, reset]);

  const onSubmit = async (dados: Cliente) => {
    const sucesso = await cadastrarCliente(dados);
    if (sucesso) {
      toast.success("Cliente salvo com sucesso!");
      navigate("/consultaCliente");
    } else {
      toast.error("Erro ao salvar cliente :(");
    }
  };

  const handleExcluir = async (cliente: Cliente) => {
    const sucesso = await excluirCliente(cliente);

    if (sucesso) {
      toast.success("Cliente excluído com sucesso!");
      navigate("/consultaCliente");
    } else {
      toast.error("Erro ao excluir cliente.");
    }
  };

  return (
    <Style.Container>
      <p className="icon">
        <MdPerson /> Clientes
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* personal info */}

        <div className="sessao">
          <div>
            <label>ID</label>
            <input className="idInput" readOnly {...register("id_cliente")} />
            <ErrorMessage error={errors.id_cliente?.message} />
          </div>

          <div>
            <label>Razão social</label>
            <input
              className="input"
              {...register("razao_social", {
                required: "O campo é obrigatório",
              })}
            />
            <ErrorMessage error={errors.razao_social?.message} />
          </div>

          <div>
            <label>Fantasia</label>
            <input className="input" {...register("nome_fantasia")} />
            <ErrorMessage error={errors.nome_fantasia?.message} />
          </div>

          <div>
            <label>{tipo === "F" ? "CPF" : "CNPJ"}</label>
            <Controller
              name="cpf_cnpj"
              control={control}
              rules={{
                required: "O campo é obrigatório",
              }}
              render={({ field }) => (
                <IMaskInput
                  {...field}
                  mask={tipo === "F" ? "000.000.000-00" : "00.000.000/0000-00"}
                  className="input"
                  placeholder={
                    tipo === "F" ? "000.000.000-00" : "00.000.000/0000-00"
                  }
                  onAccept={(value) => field.onChange(value)}
                />
              )}
            />
            <ErrorMessage error={errors.cpf_cnpj?.message} />
          </div>

          <div>
            <label>{tipo === "F" ? "RG" : "IE"}</label>
            <input
              className="input"
              type="text"
              {...register("rg_ie", {
                required: "O campo é obrigatório",
              })}
            />
            <ErrorMessage error={errors.rg_ie?.message} />
          </div>

          <div>
            <label>Limite de crédito</label>
            <input
              className="input"
              type="text"
              {...register("limite_credito")}
            />
          </div>

          <div>
            <label>Observação</label>
            <input
              className="obsInput"
              type="text"
              {...register("observacao")}
            />
          </div>

          <div className="radio-wrapper">
            <label>
              <input
                className="radio-custom"
                type="radio"
                value="F"
                {...register("fg_tipo")}
              />
              PF
            </label>
            <label>
              <input
                className="radio-custom"
                type="radio"
                value="J"
                {...register("fg_tipo")}
              />
              PJ
            </label>
          </div>

          <div className="checkbox-wrapper">
            <input
              type="checkbox"
              id="fg_ativo"
              className="checkbox-custom"
              checked={fg_ativo === "S"}
              onChange={(e) =>
                setValue("fg_ativo", e.target.checked ? "S" : "N")
              }
            />
            <label htmlFor="fg_ativo">Ativo?</label>
          </div>
        </div>

        {/* Contato */}

        <div className="sessao">
          <div>
            <label>Email</label>
            <input
              className="input"
              type="email"
              {...register("email", { required: "O campo é obrigatório" })}
            />
            <ErrorMessage error={errors.email?.message} />
          </div>

          <div>
            <label>Telefone</label>
            <Controller
              name="telefone"
              control={control}
              rules={{
                required: "O campo é obrigatório",
              }}
              render={({ field }) => (
                <IMaskInput
                  {...field}
                  mask="(00) 00000-0000"
                  className="input"
                  placeholder="(00) 00000-0000"
                  onAccept={(value) => field.onChange(value)}
                />
              )}
            />
            <ErrorMessage error={errors.telefone?.message} />
          </div>
        </div>

        {/* Endereço */}

        <div className="sessao">
          <div>
            <label>CEP</label>
            <input
              className="input"
              type="text"
              {...register("cep", {
                required: "O campo é obrigatório",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Digite apenas números",
                },
              })}
            />
            <ErrorMessage error={errors.cep?.message} />
          </div>

          <div>
            <label>Rua</label>
            <input
              className="input"
              {...register("logradouro", { required: "O campo é obrigatório" })}
            />
            <ErrorMessage error={errors.logradouro?.message} />
          </div>

          <div>
            <label>Bairro</label>
            <input
              className="input"
              {...register("bairro", { required: "O campo é obrigatório" })}
            />
            <ErrorMessage error={errors.bairro?.message} />
          </div>

          <div>
            <label>Número</label>
            <input
              className="input"
              {...register("numero", {
                required: "O campo é obrigatório",
              })}
            />
            <ErrorMessage error={errors.numero?.message} />
          </div>

          <div>
            <label>Cidade</label>
            <input
              className="input"
              {...register("cidade", { required: "O campo é obrigatório" })}
            />
            <ErrorMessage error={errors.cidade?.message} />
          </div>

          <div>
            <label>UF</label>
            <input
              className="input"
              {...register("uf", {
                required: "O campo é obrigatório",
                maxLength: { value: 2, message: "O UF deve ter duas letras" },
              })}
            />
            <ErrorMessage error={errors.uf?.message} />
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
          reset(clienteVazio);
          setOpenModal(false);
          navigate("/consultaCliente");
        }}
      />

      <ModalDelete
        isOpen={openModalDelete}
        setOpenModal={setOpenModalDelete}
        entidade="o cliente"
        onConfirm={() => {
          handleExcluir(clienteAtual);
          reset(clienteVazio);
          setOpenModalDelete(false);
        }}
      />
    </Style.Container>
  );
}

export default CadastroCliente;
