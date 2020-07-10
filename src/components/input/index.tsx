import React, { InputHTMLAttributes } from 'react';
import { IconBaseProps } from 'react-icons';

import { Container } from './styles';

interface inputProps extends InputHTMLAttributes<HTMLInputElement> {
  // o nome não é obrigatório na classe pai, por isso sobrescrevemos:
  name: string;
  // quando recebo um componente como propriedade:
  icon: React.ComponentType<IconBaseProps>;
}

// hack do react pra q ele entenda q Icon é uma tag, declara o tipo igual o nome da prop mas com a primeira letra maiúscula
const Input: React.FC<inputProps> = ({ icon: Icon, ...restProps }) => (
  <Container>
    { Icon && <Icon size={20} /> }
    <input { ...restProps }/>
  </Container>
);

export default Input;
