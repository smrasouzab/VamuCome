import { useState, createContext, useContext, useEffect, type ReactNode } from 'react';
import api from '../api';
import { set } from 'react-hook-form';

interface StorageType {
  idPedido: number;
  timer: number;
}

interface AvaliacaoContextType {
  idPedido: number;
  showModal: boolean;
  closeModal: () => void;
}

const AvaliacaoContext = createContext<AvaliacaoContextType>({} as AvaliacaoContextType);

export const AvaliacaoProvider = ({ children }: { children: ReactNode }) => {
  const [idPedido, setIdPedido] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [timer, setTimer] = useState<number>(() => {
    const storedData = localStorage.getItem('pedido-atual');
    if (!storedData) return -1;

    try {
      const parsedData: StorageType = JSON.parse(storedData);
      if (parsedData.idPedido > 0 && parsedData.timer > 0) {
        return parsedData.timer;
      }
    } catch {
      return -1;
    }

    return -1;
  });

  const closeModal = () => setShowModal(false);

  useEffect(() => {
    const storedData = localStorage.getItem('pedido-atual');
    if (storedData) {
      try {
        const parsedData: StorageType = JSON.parse(storedData);
        if (parsedData.idPedido > 0) {
          setIdPedido(parsedData.idPedido);
        }
      } catch {
        // ignore
      }
    }
  }, []);

  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => {
        const newTime = prev - 1;

        if (newTime <= 0) {
          clearInterval(interval);
          localStorage.removeItem('pedido-atual');
          localStorage.setItem('id-pedido', JSON.stringify(idPedido));
          setShowModal(true);
          return 0;
        } else if (newTime === 20) {
          api.put(`cliente/pedido/atualizar/status-pedido/${idPedido}`, {
            statusPedido: 'Entregue',
          })
        } else if (newTime === 40) {
          api.put(`cliente/pedido/atualizar/status-pedido/${idPedido}`, {
            statusPedido: 'Enviado',
          })
        } else if (newTime === 60) {
          api.put(`cliente/pedido/atualizar/status-pedido/${idPedido}`, {
            statusPedido: 'Em Preparo',
          })
        }

        // Atualiza o localStorage a cada segundo
        localStorage.setItem('pedido-atual', JSON.stringify({ idPedido, timer: newTime }));

        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timer, idPedido]);

  return (
    <AvaliacaoContext.Provider value={{ idPedido, showModal, closeModal }}>
      {children}
    </AvaliacaoContext.Provider>
  );
};

export const useAvaliacao = (): AvaliacaoContextType => {
  const context = useContext(AvaliacaoContext);
  if (!context) {
    throw new Error('useAvaliacao must be used within an AvaliacaoProvider');
  }
  return context;
};
