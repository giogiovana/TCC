import styled from "styled-components";

export const Container = styled.div`
  width: 300px;
  height: 100vh;
  background-color: #303030;
  padding: 1.5rem 1rem 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .card-menu {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .p {
    font-size: 12px;
    color: #6b7f9e;
    font-weight: 500;
    margin-top: 10px;
  }

  .logo {
    text-align: center;
  }

  .logo img {
    width: 60px;
  }

  .Links {
    .section-title {
      font-size: 16px;
      margin-top: 1.2rem;
      margin-bottom: 0.5rem;
      font-weight: 500;
    }

    li {
      list-style: none;
    }

    a {
      all: unset;
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 0.8rem 0.8rem 0.8rem 0rem;
      cursor: pointer;
    }

    a:hover {
      color: #6b7f9e;
    }

    a.active {
      color: #6b7f9e;
      font-weight: 600;
    }

    .icon {
      font-size: 1.5rem;
    }

    ul {
      margin-left: 1rem;
    }
  }
`;
