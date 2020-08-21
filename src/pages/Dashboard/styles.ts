import styled from 'styled-components';

export const Container = styled.div`

`;

export const Header = styled.header`
  padding: 32px 0;
  background: #28262e;
`;

export const HeaderContent = styled.div`
  max-width: 1120px;
  /* dá uma alinhada no centro no header content */
  margin: 0 auto;
  display: flex;
  align-items: center;

  /* estiliza a primeira imagem: a logo */
  > img {
    height: 80px;
  }

  button {
    /* ocupa todo o espaco possivel na esquerda com margem */
    margin-left: auto;
    background: transparent;
    border: 0;

    /* muda cor do icone */
    svg {
      color: #999591;
      height: 20px;
      width: 20px;
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 80px;

  img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
  }

  div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    line-height: 24px;

    span {
      color: #f4ede8;
    }

    strong {
      color: #ff9000;
    }
  }
`;

export const Content = styled.main`
  max-width: 1120px;
  /* 64px em cima em baixo e centraliza na horizontal */
  margin: 64px auto;
  display: flex;
`;

export const Schedule = styled.div`
  /* ocupa todo o espaco possivel menos a largura do calendar */
  flex: 1;
  margin-right: 120px;

  h1 {
    font-size: 36px;
  }

  p {
    margin-top: 8px;
    color: #ff9000;
    font-weight: 500;

    /* aplica somente do segundo span pra frente */
    span + span {
      margin-left: 8px;
      padding-left: 8px;
      border-left: 1px solid #ff9000;
    }
  }
`;

export const NextAppointment = styled.div`
  margin-top: 64px;

  > strong {
    color: #999591;
    font-size: 20px;
    font-weight: 400;
  }

  div {
    background: #3e3b47;
    display: flex;
    align-items: center;
    padding: 16px 24px;
    border-radius: 10px;
    margin-top: 24px;
    position: relative;

    &::before {
      position: absolute;
      height: 80%;
      width: 1px;
      left: 0;
      top: 10%;
      content: '';
      background: #ff9000;
    }

    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }

    strong {
      margin-left: 24px;
      color: #fff;
    }

    span {
      margin-left: auto;
      display: flex;
      align-items: center;
      color: #999591;

      svg {
        color: #ff9000;
        margin-right: 8px;
      }
    }
  }
`;

export const Calendar = styled.aside`
  width: 380px;
`;
