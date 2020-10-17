import React from 'react';

import { Container } from './styles';

interface TooltipProps {
  title: string;
  // propriedade necessária pra estilizar esse componente do componente pai (input):
  className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({ title, className = '', children }) => {
  return (
    <Container className={className}>
      {children}
      <span>{title}</span>
    </Container>
    // propriedade className necessária pra estilizar esse componente do componente pai (input)
  );
};

export default Tooltip;
