
import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

interface UseKeyboardNavigationProps {
  livro: string;
  capitulo: number;
  versaoBiblia: string;
  onVersiculoChange?: (versiculo: number) => void;
  versiculoAtual?: number;
  totalVersiculos?: number;
}

const useKeyboardNavigation = ({
  livro,
  capitulo,
  versaoBiblia,
  onVersiculoChange,
  versiculoAtual,
  totalVersiculos
}: UseKeyboardNavigationProps) => {
  const navigate = useNavigate();

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    // Ignorar se o usuário estiver digitando em um input
    if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
      return;
    }

    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        if (capitulo > 1) {
          navigate(`/biblia/${livro}/${capitulo - 1}?versao=${versaoBiblia}`);
        }
        break;
      
      case 'ArrowRight':
        event.preventDefault();
        navigate(`/biblia/${livro}/${capitulo + 1}?versao=${versaoBiblia}`);
        break;
      
      case 'ArrowUp':
        event.preventDefault();
        if (onVersiculoChange && versiculoAtual && versiculoAtual > 1) {
          onVersiculoChange(versiculoAtual - 1);
        }
        break;
      
      case 'ArrowDown':
        event.preventDefault();
        if (onVersiculoChange && versiculoAtual && totalVersiculos && versiculoAtual < totalVersiculos) {
          onVersiculoChange(versiculoAtual + 1);
        }
        break;
      
      case 'Home':
        event.preventDefault();
        navigate(`/biblia/${livro}/1?versao=${versaoBiblia}`);
        break;
      
      case 'b':
        if (event.ctrlKey || event.metaKey) {
          event.preventDefault();
          navigate('/pesquisar');
        }
        break;
      
      case 'h':
        if (event.ctrlKey || event.metaKey) {
          event.preventDefault();
          navigate('/versoes');
        }
        break;
    }
  }, [livro, capitulo, versaoBiblia, navigate, onVersiculoChange, versiculoAtual, totalVersiculos]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  return {
    // Atalhos de teclado disponíveis
    shortcuts: {
      'Seta Esquerda': 'Capítulo anterior',
      'Seta Direita': 'Próximo capítulo',
      'Seta Cima': 'Versículo anterior',
      'Seta Baixo': 'Próximo versículo',
      'Home': 'Primeiro capítulo',
      'Ctrl/Cmd + B': 'Buscar',
      'Ctrl/Cmd + H': 'Início'
    }
  };
};

export default useKeyboardNavigation;
