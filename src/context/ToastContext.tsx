import React, { createContext, useContext, useCallback, useState } from 'react';
import { uuid } from 'uuidv4';

import ToastContainer from '../components/toastContainer';

interface ToastContextData {
  addToast(message: Omit<ToastMessage, 'id'>): void;
  removeToast(id: string): void;
}

export interface ToastMessage {
  id: string;
  type?: 'success' | 'error' | 'info';
  title: string;
  description?: string;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

const ToastProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  const addToast = useCallback(({ type, title, description }: Omit<ToastMessage, 'id'>) => {
    const id = uuid();

    const toast = {
      id,
      type,
      title,
      description,
    };

    setMessages(oldMesages => [ ...oldMesages, toast ])
  }, []);

  const removeToast = useCallback((id: string) => {
    setMessages(oldMessages => oldMessages.filter(message => message.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}

      <ToastContainer messages={messages} />
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
