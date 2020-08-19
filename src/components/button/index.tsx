import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

// como não vou sobrescrever nenhuma prop, posso declarar um type ao invés de interface
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

// children é a prop onde vem o conteúdo da tag - o texto do botão - funciona pra todos
const Button: React.FC<ButtonProps> = ({ children, loading, ...restProps }) => (
  <Container type="button" {...restProps}>
    {loading ? 'Carregando...' : children}
  </Container>
);

export default Button;
