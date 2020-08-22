import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
    > header {
      height: 144px;
      background: #28262e;

      display: flex;
      align-items: center;

      div {
        width: 100%;
        max-width: 1120px;
        margin: 0 auto;

        svg {
          color: #999591;
          width: 32px;
          height: 32px;
        }
      }
    }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  /* dá pra trocar os 2 abaixo somente por place-content: center */
  align-items: center;
  justify-content: center;

  /* centralizar na tela na horizontal */
  /* margin top de -180 auto nas laterais e embaixo 0 */
  margin: -180px auto 0;

  /* nunca vai reduzir o tamanho do conteúdo e nunca vai passar do tamanho de 700px */
  width: 100%;
`;

const appearFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

// criado para conseguir animar tela
export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* dá pra trocar os 2 abaixo somente por place-content: center */
  align-items: center;
  justify-content: center;

  animation: ${appearFromRight} 1s;

  form {
      /* margem de 80 em cima e embaixo */
      margin: 80px 0;
      width: 340px;
      text-align: center;

      display: flex;
      flex-direction: column;

      h1 {
          margin-bottom: 24px;
          font-size: 20px;
          /* text-align: left; */
      }

      a {
          color: #F4EDE8;
          display: block;
          margin-top: 24px;
          text-decoration: none;
          transition: color 0.2s;

          &:hover {
              color: ${shade(0.2, '#F4EDE8')}
          }
      }

      input[name='old_password'] {
        margin-top: 24px;
      }
  }
`;

export const AvatarInput = styled.div`
  margin-bottom: 32px;
  position: relative;
  width: 186px;

  /* centraliza proprio elemento se dentro de um elemento com display flex e flex-direction = column */
  align-self: center;

  img {
    width: 186px;
    height: 186px;
    border-radius: 50%;
  }

  label {
    position: absolute;
    width: 48px;
    height: 48px;
    background: #ff9000;
    border-radius: 50%;
    right: 0;
    bottom: 0;
    border: 0;
    cursor: pointer;

    transition: background-color 0.2s;

    display: flex;
    align-items: center;
    justify-content: center;

    input {
      display: none;
    }

    svg {
      width: 20px;
      height: 20px;
      color: #312e38;
    }

    &:hover {
      background: ${shade(0.2, '#ff9000')}
    }
  }
`;
