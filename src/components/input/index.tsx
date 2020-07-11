import React, { InputHTMLAttributes, useEffect, useRef } from 'react';
import { IconBaseProps } from 'react-icons';
import { useField } from '@unform/core';

import { Container } from './styles';

interface inputProps extends InputHTMLAttributes<HTMLInputElement> {
  // o nome não é obrigatório na classe pai, por isso sobrescrevemos:
  name: string;
  // quando recebo um componente como propriedade:
  icon: React.ComponentType<IconBaseProps>;
}

// hack do react pra q ele entenda q Icon é uma tag, declara o tipo igual o nome da prop mas com a primeira letra maiúscula
const Input: React.FC<inputProps> = ({ name, icon: Icon, ...restProps }) => {
  // Referência do input no DOM pra dar foco, etc...
  const inputRef = useRef(null);
  // Registra no unform cada input
  const { fieldName, defaultValue, error, registerField } = useField(name);

  // Assim que o componente for exibido em tela:
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container>
      { Icon && <Icon size={20} /> }
      <input defaultValue={defaultValue} ref={inputRef} { ...restProps }/>
    </Container>
  );
};

export default Input;
