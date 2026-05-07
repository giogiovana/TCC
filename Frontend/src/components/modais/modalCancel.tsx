import * as Style from "../../Styles/modal.Styled";

type ModalProps = {
  onConfirm: () => void;
  isOpen: boolean;
  setOpenModal: (open: boolean) => void;
};

export default function Modal({ isOpen, setOpenModal, onConfirm }: ModalProps) {
  if (!isOpen) return null;

  return (
    <Style.Container>
      <div className="ModalStyle">
        <p>Tem certeza que deseja cancelar?</p>

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
