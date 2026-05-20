import { useState } from "react";
import Modal from "../modais/modalLogout";
import * as Style from "../../Styles/profileCardStyled";
import { MdLogout, MdSettings } from "react-icons/md";

type UserTagProps = {
  onLogout: () => void;
};

export const UserTag = ({ onLogout }: UserTagProps) => {
  const username = localStorage.getItem("nome");
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Style.Container>
        <div className="admin-card">
          <div className="profile-icon">
            <img src="src/assets/icon-placeholder.png" width="55"></img>
          </div>
          <div className="user-info">
            <div className="welcome">Bem-Vindo</div>
            <div className="role"> {username} </div>
          </div>

          <section>
            <button className="logout" onClick={() => setOpenModal(true)}>
              <MdLogout className="logout-icon" />
            </button>
          </section>

          <Modal
            isOpen={openModal}
            setOpenModal={setOpenModal}
            onLogout={onLogout}
          />
        </div>
      </Style.Container>
    </>
  );
};

export default UserTag;
