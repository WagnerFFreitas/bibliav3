
import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

interface ContentContext {
  currentPage: string;
  pageTitle: string;
  pageDescription: string;
  availableActions: string[];
  contextualInfo: string;
  screenElements: string[];
  navigationOptions: string[];
}

const useContentContext = () => {
  const location = useLocation();
  const [context, setContext] = useState<ContentContext>({
    currentPage: '',
    pageTitle: '',
    pageDescription: '',
    availableActions: [],
    contextualInfo: '',
    screenElements: [],
    navigationOptions: []
  });

  const analyzeCurrentPage = useCallback(() => {
    const path = location.pathname;
    const searchParams = new URLSearchParams(location.search);
    
    let newContext: ContentContext = {
      currentPage: path,
      pageTitle: '',
      pageDescription: '',
      availableActions: [],
      contextualInfo: '',
      screenElements: [],
      navigationOptions: []
    };

    // Analisar o contexto baseado na rota atual
    if (path === '/' || path === '/versoes') {
      newContext = {
        ...newContext,
        pageTitle: 'Página inicial - Versões da Bíblia',
        pageDescription: 'Você está na página principal do site da Bíblia Sagrada. Na tela há um cabeçalho com campo de busca, menu de navegação e uma sidebar com lista de livros bíblicos.',
        availableActions: [
          'Navegar para Gênesis capítulo 1',
          'Explorar diferentes versões da Bíblia',
          'Acessar o dicionário bíblico',
          'Ir para a Harpa Cristã',
          'Visitar o Cantor Cristão',
          'Usar o campo de busca no cabeçalho',
          'Escolher livros da Bíblia na sidebar esquerda'
        ],
        contextualInfo: 'Existem 10 versões da Bíblia disponíveis, incluindo traduções modernas e clássicas.',
        screenElements: [
          'Cabeçalho com título "Bíblia Sagrada"',
          'Campo de busca com botão "Buscar"',
          'Menu de navegação horizontal com: Slide, Versões, Dicionário e Concordância, Harpa e Hinário, Baixar, Utilidades, Contato, Sobre',
          'Sidebar esquerda com lista de livros: Gênesis, Êxodo, Levítico, Números, Deuteronômio, Josué, Juízes, Rute, 1º Samuel, 2º Samuel, 1º Reis, 2º Reis, 1º Crônicas, 2º Crônicas, Esdras',
          'Área principal com mensagem de boas-vindas',
          'Botões "Começar a Leitura" e "Ver Versões Disponíveis"',
          'Seção "Versículo do Dia" com Gênesis 1:1'
        ],
        navigationOptions: [
          'Clicar em qualquer livro da sidebar para iniciar leitura',
          'Usar o menu superior para acessar outras seções',
          'Utilizar o campo de busca para encontrar versículos específicos'
        ]
      };
    } else if (path.startsWith('/biblia/')) {
      const parts = path.split('/');
      const livro = parts[2] || '';
      const capitulo = parts[3] || '';
      const versao = searchParams.get('versao') || 'nvi';
      
      newContext = {
        ...newContext,
        pageTitle: `Leitura Bíblica - ${formatBookName(livro)} ${capitulo}`,
        pageDescription: `Você está lendo ${formatBookName(livro)}, capítulo ${capitulo} na versão ${versao.toUpperCase()}. A tela mostra o texto completo do capítulo com versículos numerados.`,
        availableActions: [
          'Ler o capítulo completo',
          'Navegar para o próximo capítulo',
          'Voltar ao capítulo anterior',
          'Alternar versão da Bíblia',
          'Ativar modo de leitura contínua',
          'Ler versículo específico pelo número',
          'Acessar controles de navegação'
        ],
        contextualInfo: `Este é o livro ${formatBookName(livro)}, que faz parte do ${getTestamentInfo(livro)}. O capítulo ${capitulo} contém vários versículos com ensinamentos importantes.`,
        screenElements: [
          'Cabeçalho com navegação',
          'Título do livro e capítulo',
          'Seletor de versão da Bíblia',
          'Texto completo do capítulo com versículos numerados',
          'Controles de navegação: capítulo anterior e próximo',
          'Grade de versículos para navegação rápida'
        ],
        navigationOptions: [
          'Usar setas do teclado para navegar entre capítulos',
          'Clicar nos números dos versículos na grade',
          'Alterar versão da Bíblia no seletor'
        ]
      };
    } else if (path === '/dicionario') {
      newContext = {
        ...newContext,
        pageTitle: 'Dicionário e Concordância Bíblica',
        pageDescription: 'Você está na seção de pesquisa bíblica. A tela possui abas para Dicionário e Concordância, com campo de busca e resultados detalhados.',
        availableActions: [
          'Pesquisar termos no dicionário bíblico',
          'Buscar palavras na concordância bíblica',
          'Alternar entre abas Dicionário e Concordância',
          'Ouvir definições de palavras',
          'Explorar referências bíblicas',
          'Expandir resultados para ver mais detalhes'
        ],
        contextualInfo: 'O dicionário contém mais de 25 termos bíblicos com definições completas. A concordância mostra versículos que contêm palavras específicas com texto original em hebraico e grego.',
        screenElements: [
          'Campo de busca no topo',
          'Duas abas: "Dicionário" e "Concordância"',
          'Lista de resultados com cartões expansíveis',
          'No Dicionário: termo, definição e referências bíblicas',
          'Na Concordância: palavra, texto original, transliteração e versículos'
        ],
        navigationOptions: [
          'Digite termos no campo de busca',
          'Clique nas abas para alternar entre Dicionário e Concordância',
          'Clique nos cartões para expandir informações detalhadas'
        ]
      };
    } else if (path === '/harpa') {
      newContext = {
        ...newContext,
        pageTitle: 'Harpa Cristã',
        pageDescription: 'Você está na seção da Harpa Cristã. A tela exibe uma lista organizada de hinos evangélicos tradicionais das Assembleias de Deus.',
        availableActions: [
          'Navegar pelos hinos da Harpa',
          'Ouvir a letra dos hinos',
          'Buscar hinos por número ou título',
          'Explorar hinos por categoria',
          'Acessar informações sobre cada hino'
        ],
        contextualInfo: 'A Harpa Cristã contém centenas de hinos clássicos organizados por número, com letras completas e informações sobre compositores.',
        screenElements: [
          'Título "Harpa Cristã"',
          'Campo de busca para hinos',
          'Lista numerada de hinos',
          'Cada hino mostra: número, título e primeira estrofe'
        ],
        navigationOptions: [
          'Buscar hinos pelo número ou título',
          'Clicar em qualquer hino para ver a letra completa',
          'Usar controles de navegação para percorrer a lista'
        ]
      };
    } else if (path === '/hinario') {
      newContext = {
        ...newContext,
        pageTitle: 'Cantor Cristão',
        pageDescription: 'Você está no Cantor Cristão, hinário tradicional das igrejas batistas. A tela apresenta uma coleção organizada de hinos clássicos.',
        availableActions: [
          'Explorar hinos do Cantor Cristão',
          'Ouvir letras dos hinos',
          'Buscar por número ou título',
          'Navegar por temas e categorias',
          'Acessar informações históricas dos hinos'
        ],
        contextualInfo: 'O Cantor Cristão é parte da rica tradição de hinários cristãos no Brasil, amplamente utilizado pelas comunidades batistas.',
        screenElements: [
          'Título "Cantor Cristão"',
          'Sistema de busca e filtros',
          'Lista organizada de hinos com números',
          'Informações sobre cada hino: título, tema, compositor'
        ],
        navigationOptions: [
          'Utilizar a busca para encontrar hinos específicos',
          'Navegar pela lista numerada',
          'Filtrar por temas ou ocasiões'
        ]
      };
    }

    setContext(newContext);
  }, [location]);

  useEffect(() => {
    analyzeCurrentPage();
  }, [analyzeCurrentPage]);

  const formatBookName = (book: string): string => {
    const names: Record<string, string> = {
      'genesis': 'Gênesis',
      'exodo': 'Êxodo',
      'levitico': 'Levítico',
      'numeros': 'Números',
      'deuteronomio': 'Deuteronômio',
      'josue': 'Josué',
      'mateus': 'Mateus',
      'marcos': 'Marcos',
      'lucas': 'Lucas',
      'joao': 'João'
    };
    return names[book] || book.charAt(0).toUpperCase() + book.slice(1);
  };

  const getTestamentInfo = (book: string): string => {
    const oldTestament = ['genesis', 'exodo', 'levitico', 'numeros', 'deuteronomio', 'josue', 'juizes', 'rute', 'samuel', 'reis', 'cronicas'];
    return oldTestament.some(b => book.includes(b)) ? 'Antigo Testamento' : 'Novo Testamento';
  };

  return { context, analyzeCurrentPage };
};

export default useContentContext;
