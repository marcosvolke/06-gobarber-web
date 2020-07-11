import React, { InputHTMLAttributes, useEffect, useRef, useState, useCallback } from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { useField } from '@unform/core';

import { Container, Error } from './styles';

interface inputProps extends InputHTMLAttributes<HTMLInputElement> {
  // o nome não é obrigatório na classe pai, por isso sobrescrevemos:
  name: string;
  // quando recebo um componente como propriedade:
  icon: React.ComponentType<IconBaseProps>;
}

// hack do react pra q ele entenda q Icon é uma tag, declara o tipo igual o nome da prop mas com a primeira letra maiúscula
const Input: React.FC<inputProps> = ({ name, icon: Icon, ...restProps }) => {
  // Referência do input no DOM pra dar foco, etc...
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  // Registra no unform cada input
  const { fieldName, defaultValue, error, registerField } = useField(name);

  // No Javascript, toda vez q tenho uma função dentro de outra (essa está dentro do componente),
  // ao criar o componente a função é recriada na memória - pra evitar isso, usar o useCallback
  // para funções que podem ficar na memória - só recria a função caso alguma variável no array
  // de dependências seja alterada
  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    if (inputRef.current?.value) {
      setIsFilled(true);
    } else {
      setIsFilled(false);
    }
  }, [])

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  // Assim que o componente for exibido em tela:
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    // Se tiver erro é true, senão é false: !!error
    <Container isErrored={ !!error } isFocused={isFocused} isFilled={isFilled}>
      { Icon && <Icon size={20} /> }
      <input
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        ref={inputRef}
        { ...restProps }
      />

      {error && (
        // O error passa a precisar de uma propriedade que é do Tooltip, pq no style eu atribui o tooltip a esse container
        <Error title={error}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>)
      }
    </Container>
  );
};

export default Input;
