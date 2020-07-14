import React from 'react';
import {
  Route as ReactDOMRoute,
  RouteProps as ReactDOMRouteProps,
  Redirect
} from 'react-router-dom';

import { useAuth } from '../context/AuthContext';
import { FiRotateCcw } from 'react-icons/fi';

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}



const Route: React.FC<RouteProps> = ({ isPrivate = false, component: Component, ...restProps }) => {
  const { user } = useAuth();

  return (
    <ReactDOMRoute
      {...restProps}
      // uso do location é para manter o histórico e o voltar funcionar
      render={( { location } ) => {
        // isprivate === issigned
        // true/true = OK
        // true/false = redirecionar para o login
        // false/true = redirecionar para o dashboard
        // false/false = OK

        // se é rota privada e o usuário existe, manda o componente informado na FiRotateCcw, senão redireciona para o login ou para o dashboard se não for privado
        return isPrivate === !!user ? (<Component />) : (<Redirect to={{ pathname: isPrivate ? '/' : '/dashboard', state: { from: location } }} />);
      }}
    />
  );
};

export default Route;
