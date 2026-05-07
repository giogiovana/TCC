import styled from "styled-components";

export const Container = styled.div`

  position: fixed;
  inset: 0;
  display: grid;
  place-items: center;
  z-index: 1000;
  background-color: #00000050;

  .ModalStyle {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    background-color: #414141;
    border-radius: 6px;
    color: #ffffff;
    padding: 2rem;
    font-size: 15px;
    font-family: "Inter", sans-serif;
  }

  .Buttons {
    display: flex;
    gap: 1.2rem;
    justify-content: center;
    width: 100%;
  }

  .transparente {
    background-color: #212121;
    padding: 1rem 1.5rem 1rem 1.5rem;
    border-radius: 6px;
    font-family: "Inter", sans-serif;
    font-size: 15px;
    color: #ffffff;
    cursor: pointer;
  }
  
 .transparente:hover {
    opacity: 0.5;
  }

  .vermelho {
    border: 3px #c72e2e solid;
    color: #c72e2e;
    padding: 1rem 1.5rem 1rem 1.5rem;
    border-radius: 6px;
    font-family: "Inter", sans-serif;
    font-size: 15px;
    cursor: pointer;
  }
  
 .vermelho:hover {
    opacity: 0.5;
  }

  .roxo {
    background-color: #6b7f9e;
    padding: 1rem 1.5rem 1rem 1.5rem;
    border-radius: 6px;
    font-family: "Inter", sans-serif;
    font-size: 15px;
    color: #ffffff;
    cursor: pointer;
  }
  .roxo:hover {
    opacity: 0.5;
  }
  
  label {
    display: flex;
  }
`;
