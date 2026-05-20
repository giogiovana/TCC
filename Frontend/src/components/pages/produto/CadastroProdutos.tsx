import * as Style from "../../../Styles/CadastrosStyled.tsx";
import { MdInventory2 } from "react-icons/md";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { cadastrarProduto, consultarProdutoPorId, excluirProduto} from "../../../services/ProdutoService.tsx";
import { ModalDelete, ModalCancel } from "../../modais/index.tsx";
import { Produto, produtoVazio } from "../../../Models/produto.tsx";

type ErrorMessageProps = {
  error?: string;
};

export const ErrorMessage = ({ error }: ErrorMessageProps) => {
  if (!error) return null;
  return <p className="error-message">{error}</p>;
};

export function CadastroProduto() {
  const { id_produto } = useParams<{ id_produto?: string }>();
  const [openModal, setOpenModal] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Produto>({
    defaultValues: produtoVazio,
  });

  const produtoAtual = watch();

  useEffect(() => {
    const carregarProduto = async () => {
      if (id_produto) {
        const data = await consultarProdutoPorId(id_produto);

        console.log(data);

        if (data && typeof data !== "boolean") {
          reset(data);
        }
      } else {
        reset(produtoVazio);
      }
    };

    carregarProduto();
  }, [id_produto, reset]);

  const onSubmit = async (dados: Produto) => {
    const sucesso = await cadastrarProduto(dados);
    if (sucesso) {
      toast.success("Produto salvo com sucesso!");
      navigate("/consultaProduto");
    } else {
      toast.error("Erro ao salvar produto :(");
    }
  };

  const handleExcluir = async (produto: Produto) => {
    const sucesso = await excluirProduto(produto);

    if (sucesso) {
      toast.success("Produto excluído com sucesso!");
      navigate("/consultaProduto");
    } else {
      toast.error("Erro ao excluir produto.");
    }
  };

  return (
    <Style.Container>
      <p className="icon">
        <MdInventory2 /> Produtos
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="sessao">
          <div>
            <label>ID</label>
            <input className="idInput" readOnly {...register("id_produto")} />
            <ErrorMessage error={errors.id_produto?.message} />
          </div>

          <div>
            <label>Descricao</label>
            <input
              className="input"
              {...register("descricao", {
                required: "O campo é obrigatório",
              })}
            />
            <ErrorMessage error={errors.descricao?.message} />
          </div>

          <div>
            <label>Marca</label>
            <input
              className="input"
              {...register("marca", {
                required: "O campo é obrigatório",
              })}
            />
            <ErrorMessage error={errors.marca?.message} />
          </div>

          <div>
            <label>modelo</label>
            <input
              className="input"
              {...register("modelo", {
                required: "O campo é obrigatório",
              })}
            />
            <ErrorMessage error={errors.modelo?.message} />
          </div>

          <div>
            <label>Tipo</label>
            <input
              className="input"
              {...register("tipo", {
                required: "O campo é obrigatório",
              })}
            />
            <ErrorMessage error={errors.tipo?.message} />
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

          <div>
            <label>Observação</label>
            <input
              className="obsInput"
              {...register("observacao", {
                required: "O campo é obrigatório",
              })}
            />
            <ErrorMessage error={errors.observacao?.message} />
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
          reset(produtoVazio);
          setOpenModal(false);
          navigate("/consultaProduto");
        }}
      />

      <ModalDelete
        isOpen={openModalDelete}
        setOpenModal={setOpenModalDelete}
        entidade="o produto"
        onConfirm={() => {
          handleExcluir(produtoAtual);
          reset(produtoVazio);
          setOpenModalDelete(false);
        }}
      />
    </Style.Container>
  );
}

export default CadastroProduto;
