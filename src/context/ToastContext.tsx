import React, { createContext, useContext, useCallback } from 'react';

import ToastContainer from '../components/toastContainer';

interface ToastContextData {
  addToast(): void;
  removeToast(): void;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

const ToastProvider: React.FC = ({ children }) => {
  const addToast = useCallback(() => {
    console.log('add toast');
  }, []);

  const removeToast = useCallback(() => {
    console.log('remove toast');
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}

      <ToastContainer />
    </ToastContext.Provider>
  )
};

function useToast(): ToastContextData {
  const context = useContext(ToastContext);

  // foi utilizado fora de onde tem acesso
  if (!context) {
    throw new Error("useToast deve ser usado dentro de um ToastProvider")
  }

  return context;
}

export { ToastProvider, useToast };
