import * as Style from "../../Styles/modal.Styled";

type ModalProps = {
  onLogout: () => void;
  isOpen: boolean;
  setOpenModal: (open: boolean) => void;
};

export default function Modal({ isOpen, setOpenModal, onLogout }: ModalProps) {
  if (!isOpen) return null;

  return (
    <Style.Container>
      <div className="ModalStyle">
        <p>Tem certeza que deseja sair?</p>

        <div className="Buttons">
          <button className="transparente" onClick={onLogout}>
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
