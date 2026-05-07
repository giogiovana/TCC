import * as Style from "../../Styles/modal.Styled";

type ModalProps = {
  onConfirm: () => void;
  isOpen: boolean;
  setOpenModal: (open: boolean) => void;
  entidade: string;
};

export default function Modal({ isOpen, setOpenModal, onConfirm, entidade }: ModalProps) {
  if (!isOpen) return null;

  return (
    <Style.Container>
      <div className="ModalStyle">
        <p>Tem certeza que deseja excluir {entidade}?</p>

        <div className="Buttons">
          <button className="transparente" onClick={onConfirm}>
            Sim
          </button>
 
          <button className="roxo" onClick={() => setOpenModal(false)}>
            Não
          </button>
        </div>
      </div>
    </Style.Container>
  );
}
