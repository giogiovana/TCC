import styled from "styled-components";

export const Container = styled.div`
  label {
    display: flex;
  }

  form {
    overflow-y: auto;  
    flex: 1;        
    gap: 1.5rem;

    background-color: #303030;
    padding: 1rem;
    border-radius: 5px;
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;

    max-width: 100%;
    max-height: 75vh;
    box-sizing: border-box; 

    display: flex;
    flex-direction: column;
 }

  .input {
    all: unset;
    background-color: #414141;
    border: 2px solid transparent;
    box-sizing: border-box;
    padding: 0.5rem;
    border-radius: 6px;
    font-family: "Inter", sans-serif;
    font-size: 15px;
    color: #dededee0;
  }

  .input:focus {
    border: 2px #dededee0 solid;
  }

  .idInput {
    all: unset;
    background-color: #414141;
    border: 2px solid transparent;
    box-sizing: border-box;
    padding: 0.5rem;
    border-radius: 6px;
    font-family: "Inter", sans-serif;
    font-size: 15px;
    color: #747474df;
    width: 3rem;
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
    width: 40rem;
  }

  .sessao {
    border: 2px #dededee0 solid;
    border-radius: 6px;
    display: flex;
    flex-wrap: wrap;
    padding: 1rem;
    gap: 2rem;
    width: 100%;
    box-sizing: border-box;
  }

  .icon {
    font-size: 20px;
    font-weight: 500;
    display: flex;
    gap: 10px;
    align-items: center;
  }

  .eraser{
    font-size: 1.5rem;
    align-items: center;
    color: #6b7f9e;
  }
  
  .inputFiltro{
    display: flex;
    gap: 1rem;
    margin: 1rem 0rem 1rem 0rem
  }

  .btnFiltro{
    all:unset
  }

//Buttons

  .Buttons {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 1.2rem;
  }

  button{
    padding: 1rem;
    border-radius: 6px;
    font-size: 15px;
    font-family: "Inter", sans-serif;    cursor: pointer;
    min-width: 150px;
    max-width: 150px;
    font-weight: 600;
    transition: all 0.2s ease-in-out;
  }

  .Cancelar {
    border: 3px #6b7f9e solid;
    color: #6b7f9e;
  }

  .Salvar {
    background-color: #6b7f9e;
    color: #ffffff;
  }

  .Excluir{
    border: 3px #c72e2e solid;
    color: #c72e2e;
    margin-left: auto;
  }

   .Incluir{
    background-color: #6b7f9e;
    color: #ffffff;

  }

  .btnAdd{
    background-color: #6b7f9e;
    color: #ffffff;
  }

  button:hover {
    opacity: 0.5;
  }

  .error-message {
    color: #c20a0a;
  }

  //Checkbox
  .checkbox-wrapper {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .checkbox-custom {
    all: unset;
    width: 16px;
    height: 16px;
    border: 2px solid #333;
    border-radius: 4px;
    background-color: #414141;
    cursor: pointer;
    display: inline-block;
    position: relative;
  }

  .checkbox-custom:checked::after {
    content: "";
    position: absolute;
    top: 2px;
    left: 4px;
    width: 6px;
    height: 10px;
    border: solid #fff;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }

  //Radio
  .radio-wrapper {
    display: flex;
    align-items: center;
    gap: 8px; /* espaço entre checkbox e label */
  }

  .radio-custom {
    all:unset;
    width: 16px;
    height: 16px;
    border: 2px solid #333;
    border-radius: 50%; /* círculo */
    background-color: #414141;
    cursor: pointer;
    display: inline-block;
    position: relative;
  }

  .radio-wrapper label {
    gap: 0.5rem;
  }

  .radio-custom:checked::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 8px;
    height: 8px;
    background-color: #6b7f9e;
    border-radius: 50%;
    transform: translate(-50%, -50%);
  }

  /* tabela */
  .tableContainer{
    max-height: 65vh; 
    /* min-height:  65vh;  */
    overflow-y: auto;        
    border-radius: 8px; 
    background-color: #333;
    z-index: 0;

  }
  
  .tableContainer table {
    border-collapse: separate;
    width: 100%;
    border-spacing: 0
  }

  .tableContainer thead th {
  position: sticky;       
  top: 0;
  font-weight: 600;
  padding: 15px;
  z-index: 5;
  background-color: #6b7f9e;
}

.tableContainer tbody td {
  padding: 15px 10px;
  text-align: center;

}

.tableContainer tbody tr:nth-child(even) {
  background-color: #3d3d3d;
}

.tableContainer tbody tr:hover {
  background-color: #181818;
}

`;
