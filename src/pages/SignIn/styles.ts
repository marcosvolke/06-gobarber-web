import styled from 'styled-components';
import { shade } from 'polished';

import signInBackgroundImg from '../../assets/sign-in-background.png';

export const Container = styled.div`
    /* 100% da parte visível da tela - total da altura */
    height: 100vh;

    display: flex;
    /* para os dois componentes dentro (content e background) ocuparem todo o espaço vertical, como se tivessem tb 100vh agora */
    align-items: stretch;
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    /* dá pra trocar os 2 abaixo somente por place-content: center */
    align-items: center;
    justify-content: center;

    /* nunca vai reduzir o tamanho do conteúdo e nunca vai passar do tamanho de 700px */
    width: 100%;
    max-width: 700px;

    form {
        /* margem de 80 em cima e embaixo */
        margin: 80px 0;
        width: 340px;
        text-align: center;

        h1 {
            margin-bottom: 24px;
        }

        input {
            background: #232129;
            border-radius: 10px;
            border: 2px solid #232129;
            padding: 16px;
            width: 100%;
            color: #f4ede8;

            &::placeholder {
                color: #666360;
            }

            & + input {
                margin-top: 8px;
            }
        }

        button {
            background: #FF9000;
            height: 56px;
            border-radius: 10px;
            border: 0;
            /* padding só nas laterais */
            padding: 0 16px;
            color: #312e38;
            width: 100%;
            font-weight: 500;
            margin-top: 16px;
            transition: background-color 0.2s;

            &:hover {
                background: ${shade(0.2, '#FF9000')}
            }
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

    }

    /* estilo somente para a que está dentro do meu content, dentro dos filhos de content não */
    > a {
        color: #FF9000;
        display: block;
        margin-top: 24px;
        text-decoration: none;
        transition: color 0.2s;

        /* alinhar ícone com o texto na vertical */
        display: flex;
        align-items: center;

        &:hover {
            color: ${shade(0.2, '#FF9000')}
        }

        svg {
            margin-right: 16px;
        }
    }
`;

export const Background = styled.div`
    /* vai fazer ocupar todo o espaço menos os 700px q defini no content */
    flex: 1;
    background: url(${signInBackgroundImg}) no-repeat center;
    /* pra cobrir todo o tamanho sobrando */
    background-size: cover;
`;