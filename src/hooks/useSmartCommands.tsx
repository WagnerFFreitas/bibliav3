
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

interface SmartCommand {
  trigger: string[];
  action: (params?: any) => void;
  description: string;
  context?: string[];
}

const useSmartCommands = (readContent: (text: string) => void) => {
  const navigate = useNavigate();

  const executeSmartCommand = useCallback((command: string, currentContext: string) => {
    const normalizedCommand = command.toLowerCase().trim();
    
    // Comandos contextuais inteligentes
    if (currentContext.includes('/biblia/')) {
      // Comandos específicos para leitura bíblica
      if (normalizedCommand.includes('ler') && normalizedCommand.includes('versículo')) {
        const verseMatch = normalizedCommand.match(/versículo\s+(\d+)/);
        if (verseMatch) {
          const verseNumber = verseMatch[1];
          readContent(`Localizando e lendo o versículo ${verseNumber}`);
          // Scroll para o versículo específico
          setTimeout(() => {
            const verseElement = document.querySelector(`[data-verse="${verseNumber}"]`);
            if (verseElement) {
              verseElement.scrollIntoView({ behavior: 'smooth' });
            }
          }, 1000);
          return true;
        }
      }

      if (normalizedCommand.includes('próximo capítulo') || normalizedCommand.includes('avançar')) {
        readContent('Navegando para o próximo capítulo');
        // Lógica para próximo capítulo seria implementada aqui
        return true;
      }

      if (normalizedCommand.includes('capítulo anterior') || normalizedCommand.includes('voltar')) {
        readContent('Voltando para o capítulo anterior');
        return true;
      }

      if (normalizedCommand.includes('resumo') || normalizedCommand.includes('contexto')) {
        provideChapterSummary(currentContext);
        return true;
      }
    }

    // Comandos gerais inteligentes
    if (normalizedCommand.includes('onde estou') || normalizedCommand.includes('localização')) {
      provideCurrentLocation();
      return true;
    }

    if (normalizedCommand.includes('o que posso fazer') || normalizedCommand.includes('opções')) {
      provideAvailableActions(currentContext);
      return true;
    }

    if (normalizedCommand.includes('explicar') || normalizedCommand.includes('ensinar')) {
      provideContextualHelp(currentContext);
      return true;
    }

    return false;
  }, [navigate, readContent]);

  const provideChapterSummary = (context: string) => {
    if (context.includes('genesis/1')) {
      readContent('Este é o primeiro capítulo de Gênesis, que narra a criação do mundo por Deus em seis dias. Ele criou a luz, o céu, a terra, os mares, as plantas, os astros, os animais e, por fim, o homem à sua imagem e semelhança.');
    } else if (context.includes('genesis')) {
      readContent('Você está no livro de Gênesis, o primeiro livro da Bíblia, que conta sobre a criação do mundo, a história de Adão e Eva, Noé, Abraão, Isaque, Jacó e José.');
    } else {
      readContent('Este capítulo contém ensinamentos importantes das escrituras sagradas.');
    }
  };

  const provideCurrentLocation = () => {
    const currentPage = window.location.pathname;
    if (currentPage.includes('/biblia/')) {
      const parts = currentPage.split('/');
      const book = parts[2];
      const chapter = parts[3];
      readContent(`Você está lendo a Bíblia, especificamente o livro ${book}, capítulo ${chapter}. Posso ler o conteúdo, navegar entre capítulos ou explicar o contexto.`);
    } else if (currentPage === '/dicionario') {
      readContent('Você está no dicionário e concordância bíblica. Posso ajudar você a pesquisar termos bíblicos e suas definições.');
    } else if (currentPage === '/harpa') {
      readContent('Você está na seção da Harpa Cristã. Posso ajudar você a navegar pelos hinos e ouvir suas letras.');
    } else {
      readContent('Você está navegando pelo site da Bíblia Sagrada. Posso ajudar você a ir para qualquer seção.');
    }
  };

  const provideAvailableActions = (context: string) => {
    if (context.includes('/biblia/')) {
      readContent('Você pode: ouvir o capítulo completo, navegar para versículos específicos, ir para o próximo ou anterior capítulo, alterar a versão da Bíblia, ou pedir resumos e explicações do conteúdo.');
    } else if (context === '/dicionario') {
      readContent('Você pode: pesquisar termos bíblicos, ouvir definições, encontrar referências de versículos, ou explorar a concordância bíblica.');
    } else {
      readContent('Você pode navegar para: leitura da Bíblia, dicionário bíblico, Harpa Cristã, ou Cantor Cristão. Também posso ler qualquer conteúdo da página atual.');
    }
  };

  const provideContextualHelp = (context: string) => {
    if (context.includes('genesis')) {
      readContent('Gênesis é o livro dos começos: criação do mundo, origem da humanidade, chamado de Abraão e a formação do povo de Israel. É fundamental para compreender toda a narrativa bíblica.');
    } else if (context.includes('/harpa')) {
      readContent('A Harpa Cristã é uma coletânea de hinos evangélicos tradicionais. Cada hino foi cuidadosamente selecionado para edificar a fé e promover a adoração cristã.');
    } else {
      readContent('Este conteúdo faz parte do estudo das escrituras sagradas, oferecendo ensinamentos para crescimento espiritual e conhecimento da palavra de Deus.');
    }
  };

  return { executeSmartCommand };
};

export default useSmartCommands;
