
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
    
    // Comandos para descrever elementos da tela
    if (normalizedCommand.includes('descrever tela') || normalizedCommand.includes('o que vejo') || normalizedCommand.includes('elementos da tela')) {
      describeScreenElements(currentContext);
      return true;
    }

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
              // Ler o conteúdo do versículo
              const verseText = verseElement.textContent || '';
              readContent(`Versículo ${verseNumber}: ${verseText}`);
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

      if (normalizedCommand.includes('versículos disponíveis') || normalizedCommand.includes('quantos versículos')) {
        describeAvailableVerses();
        return true;
      }
    }

    // Comandos específicos para dicionário e concordância
    if (currentContext === '/dicionario') {
      if (normalizedCommand.includes('como usar') || normalizedCommand.includes('ajuda dicionário')) {
        explainDictionaryUsage();
        return true;
      }

      if (normalizedCommand.includes('alternar') || normalizedCommand.includes('mudar aba')) {
        readContent('Para alternar entre Dicionário e Concordância, use os botões de aba no topo da tela. O Dicionário mostra definições de termos bíblicos, enquanto a Concordância mostra versículos que contêm palavras específicas.');
        return true;
      }

      if (normalizedCommand.includes('buscar') && normalizedCommand.includes('termo')) {
        readContent('Digite o termo que deseja pesquisar no campo de busca. Por exemplo, digite "amor", "fé", "salvação" ou qualquer palavra bíblica. Os resultados aparecerão automaticamente abaixo.');
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

    if (normalizedCommand.includes('navegar') || normalizedCommand.includes('como navegar')) {
      explainNavigation(currentContext);
      return true;
    }

    return false;
  }, [navigate, readContent]);

  const describeScreenElements = (context: string) => {
    if (context === '/dicionario') {
      readContent('Na tela você vê: No topo há um campo de busca onde pode digitar termos para pesquisar. Logo abaixo há duas abas: "Dicionário" para definições de termos bíblicos, e "Concordância" para encontrar versículos. Abaixo das abas aparecem os resultados da sua busca em cartões que podem ser expandidos para ver mais detalhes.');
    } else if (context.includes('/biblia/')) {
      readContent('Na tela você vê: O cabeçalho com o título do livro e capítulo, um seletor para mudar a versão da Bíblia, o texto completo do capítulo com versículos numerados, controles de navegação para capítulos anterior e próximo, e uma grade com números dos versículos para navegação rápida.');
    } else if (context === '/') {
      readContent('Na tela você vê: No topo o cabeçalho com "Bíblia Sagrada", um campo de busca, e menu com opções como Versões, Dicionário, Harpa e outras. À esquerda uma lista de livros bíblicos como Gênesis, Êxodo, etc. No centro uma mensagem de boas-vindas com botões para começar a leitura e ver versões disponíveis.');
    } else {
      readContent('Descrevendo os elementos visíveis na tela atual...');
    }
  };

  const describeAvailableVerses = () => {
    const verseElements = document.querySelectorAll('[data-verse]');
    const totalVerses = verseElements.length;
    readContent(`Este capítulo contém ${totalVerses} versículos. Você pode navegar para qualquer versículo específico dizendo "ler versículo" seguido do número, ou usar a grade de navegação para pular diretamente para um versículo.`);
  };

  const explainDictionaryUsage = () => {
    readContent('O Dicionário e Concordância funcionam assim: Na aba Dicionário, digite um termo bíblico para ver sua definição e referências. Na aba Concordância, digite uma palavra para encontrar todos os versículos que a contêm, incluindo o texto original em hebraico ou grego. Use o campo de busca no topo e os resultados aparecerão em cartões que você pode expandir para mais detalhes.');
  };

  const explainNavigation = (context: string) => {
    if (context === '/dicionario') {
      readContent('Para navegar no Dicionário: Use Tab para percorrer os elementos, digite no campo de busca, use as setas para alternar entre abas Dicionário e Concordância, e pressione Enter nos cartões para expandir detalhes.');
    } else if (context.includes('/biblia/')) {
      readContent('Para navegar na Bíblia: Use as setas esquerda e direita para mudar capítulos, digite números para pular para versículos específicos, use Tab para percorrer controles, e pressione Enter para ativar botões.');
    } else {
      readContent('Para navegar no site: Use Tab para percorrer links e botões, Enter para ativar, setas para navegar em listas, e o campo de busca para encontrar conteúdo específico.');
    }
  };

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
      readContent(`Você está lendo a Bíblia, especificamente o livro ${book}, capítulo ${chapter}. Na tela há o texto completo do capítulo, controles de navegação, seletor de versão e grade de versículos. Posso ler o conteúdo, navegar entre capítulos ou explicar o contexto.`);
    } else if (currentPage === '/dicionario') {
      readContent('Você está no dicionário e concordância bíblica. Na tela há um campo de busca, duas abas (Dicionário e Concordância), e área para resultados. Posso ajudar você a pesquisar termos bíblicos, explicar definições, ou encontrar versículos específicos.');
    } else if (currentPage === '/harpa') {
      readContent('Você está na seção da Harpa Cristã. Na tela há uma lista de hinos evangélicos organizados por número, com campo de busca e informações sobre cada hino.');
    } else {
      readContent('Você está navegando pelo site da Bíblia Sagrada. Na tela há o menu principal com opções para leitura bíblica, dicionário, hinários e outras ferramentas de estudo.');
    }
  };

  const provideAvailableActions = (context: string) => {
    if (context.includes('/biblia/')) {
      readContent('Você pode: ouvir o capítulo completo, navegar para versículos específicos dizendo o número, ir para o próximo ou anterior capítulo, alterar a versão da Bíblia no seletor, pedir resumos e explicações do conteúdo, ou usar a grade de versículos para navegação rápida.');
    } else if (context === '/dicionario') {
      readContent('Você pode: pesquisar termos bíblicos digitando no campo de busca, alternar entre as abas Dicionário e Concordância, expandir cartões de resultados para ver detalhes completos, ouvir definições, explorar referências bíblicas, e navegar pelos textos originais em hebraico e grego.');
    } else {
      readContent('Você pode navegar para: leitura da Bíblia clicando nos livros da sidebar, dicionário bíblico no menu, Harpa Cristã, Cantor Cristão, usar o campo de busca para encontrar versículos, ou explorar as diferentes versões da Bíblia disponíveis.');
    }
  };

  const provideContextualHelp = (context: string) => {
    if (context.includes('genesis')) {
      readContent('Gênesis é o livro dos começos: criação do mundo, origem da humanidade, chamado de Abraão e a formação do povo de Israel. É fundamental para compreender toda a narrativa bíblica.');
    } else if (context.includes('/harpa')) {
      readContent('A Harpa Cristã é uma coletânea de hinos evangélicos tradicionais. Cada hino foi cuidadosamente selecionado para edificar a fé e promover a adoração cristã.');
    } else if (context === '/dicionario') {
      readContent('O Dicionário Bíblico oferece definições detalhadas de termos das escrituras. A Concordância permite encontrar todos os versículos que contêm uma palavra específica, incluindo os textos originais em hebraico e grego com transliterações.');
    } else {
      readContent('Este conteúdo faz parte do estudo das escrituras sagradas, oferecendo ensinamentos para crescimento espiritual e conhecimento da palavra de Deus.');
    }
  };

  return { executeSmartCommand };
};

export default useSmartCommands;
