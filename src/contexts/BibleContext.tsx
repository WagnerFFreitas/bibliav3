
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface BibleContextType {
  versaoBiblia: string;
  setVersaoBiblia: (versao: string) => void;
  versiculoSelecionado: number | null;
  setVersiculoSelecionado: (versiculo: number | null) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const BibleContext = createContext<BibleContextType | undefined>(undefined);

interface BibleProviderProps {
  children: ReactNode;
}

export const BibleProvider: React.FC<BibleProviderProps> = ({ children }) => {
  const [versaoBiblia, setVersaoBiblia] = useState('nvi');
  const [versiculoSelecionado, setVersiculoSelecionado] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const value = {
    versaoBiblia,
    setVersaoBiblia,
    versiculoSelecionado,
    setVersiculoSelecionado,
    searchTerm,
    setSearchTerm,
  };

  return (
    <BibleContext.Provider value={value}>
      {children}
    </BibleContext.Provider>
  );
};

export const useBibleContext = () => {
  const context = useContext(BibleContext);
  if (context === undefined) {
    throw new Error('useBibleContext must be used within a BibleProvider');
  }
  return context;
};
