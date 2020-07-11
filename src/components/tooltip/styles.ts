import styled from 'styled-components';

export const Container = styled.div`
  /* assim todo position absolute que tá dentro desse container vai ser relativo ao container e nao ao restante da tela: */
  position: relative;

  span {
    width: 160px;
    background: #FF9000;
    padding: 8px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;

    /* deixa span invisível até ocorrer o hover: */
    opacity: 0;
    transition: opacity 0.4s;
    /* Esconde elemento pra não pegar o hover fora do ícone: */
    visibility: hidden;

    position: absolute;
    /* posiciona acima do input: */
    bottom: calc(100% + 12px);

    /* hack pra ficar no centro do elemento de baixo que é o ícone: */
    left: 50%;
    transform: translateX(-50%);

    color: #312e38;

    &::before {
      /* se não colocar o content não mostra */
      content: '';
      border-style: solid;
      border-color: #ff9000 transparent;
      border-width: 6px 6px 0 6px;
      /* bottom: 20px; */
      top: 100%;
      position: absolute;
      /* hack pra ficar no centro do elemento de baixo que é o ícone: */
      left: 50%;
      transform: translateX(-50%);
    }
  }

  /* Ao passar o mouse pelo container, mostra o span */
  &:hover span {
    opacity: 1;
    /* como ocultei o elemento acima, preciso exibí-lo novamente: */
    visibility: visible;
  }

`;
