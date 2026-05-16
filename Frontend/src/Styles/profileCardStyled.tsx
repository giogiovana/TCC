import styled from "styled-components";

export const Container = styled.div`
  .admin-card {
    background-color: #1d1d1d;
    border-radius: 10px;
    padding: 0.7rem;
    display: flex;
    align-items: center;
    gap: 15px;
    width: 100%;
  }

  .profile-icon {
    width: 50px;
    height: 50px;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .user-info {
    display: flex;
    flex-direction: column;
  }

  .user-info .welcome {
    font-size: 17px;
    font-weight: 600;
    color: #6b7f9e;
    margin-bottom: 5px;
  }

  .user-info .role {
    font-size: 14px;
    font-weight: 600;
  }

  .section {
    margin-left: auto;
    display: flex;
    flex-direction: column;
    cursor: pointer;
    gap: 7px;
  }

  .logout-icon {
    color: #d50101;
    font-size: 20px;
  }

  .settings-icon {
    color: #858585;
    font-size: 20px;
  }

  .settings-icon:hover {
    opacity: 0.5;
  }

  .logout-icon:hover {
    opacity: 0.5;
  }
`;
