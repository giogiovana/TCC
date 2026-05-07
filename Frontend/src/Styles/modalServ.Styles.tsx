import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  inset: 0;
  display: grid;
  place-items: center;
  z-index: 1000;
  background-color: #00000050; 
  overflow: visible;

 .ModalServico {
    display: flex;
    flex-direction: column;
    align-items: left;
    background-color: #303030;
    border-radius: 6px;
    color: #ffffff;
    padding: 2rem;
    font-size: 15px;
    font-family: "Inter", sans-serif;
  }

  form{
    margin: 0;
  }

   .sessao2 {
    display: grid;
    gap: 1rem;
    width: 100%;
  }

  .buttons {
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

  .roxo {
    background-color: #6b7f9e;
    padding: 1rem 1.5rem 1rem 1.5rem;
    border-radius: 6px;
    font-family: "Inter", sans-serif;
    font-size: 15px;
    color: #ffffff;
    cursor: pointer;
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

  .transparente:hover {
    opacity: 0.5;
  }

  .roxo:hover {
    opacity: 0.5;
  }

  .obsInput{
    all: unset;
    background-color: #414141;
    border: 2px solid transparent;
    box-sizing: border-box;
    padding: 0.5rem;
    border-radius: 6px;
    font-family: "Inter", sans-serif;
    font-size: 15px;
    box-sizing: border-box;
    width: 100%;
    min-height: 4rem;
  }

  .obsInput:focus{
    border: 2px #dededee0 solid;
  }

  .dates{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    width: 100%;
  }

  .disabled{
    background: #414141;
    border: 2px solid transparent;
    color: #6b6b6b;
    padding: 8px;
    border-radius: 6px;
    font-family: "Inter", sans-serif;
    font-size: 15px;
    box-sizing: border-box;
    width: 100%;
  }

  .date-input {
  background: #414141;
  border: 2px solid transparent;
  color: #fff;
  padding: 8px;
  border-radius: 6px;
  font-family: "Inter", sans-serif;
  font-size: 15px;
  box-sizing: border-box;
  width: 100%;
  }

  .date-input:focus {
  outline: none;
  border-color: #dededee0;
}

 .disabled:focus {
  outline: none;
  border: 2px solid transparent;
}

  `;
