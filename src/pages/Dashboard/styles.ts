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
