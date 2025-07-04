
import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

interface ContentContext {
  currentPage: string;
  pageTitle: string;
  pageDescription: string;
  availableActions: string[];
  contextualInfo: string;
}

const useContentContext = () => {
  const location = useLocation();
  const [context, setContext] = useState<ContentContext>({
    currentPage: '',
    pageTitle: '',
    pageDescription: '',
    availableActions: [],
    contextualInfo: ''
  });

  const analyzeCurrentPage = useCallback(() => {
    const path = location.pathname;
    const searchParams = new URLSearchParams(location.search);
    
    let newContext: ContentContext = {
      currentPage: path,
      pageTitle: '',
      pageDescription: '',
      availableActions: [],
      contextualInfo: ''
    };

    // Analisar o contexto baseado na rota atual
    if (path === '/' || path === '/versoes') {
      newContext = {
        ...newContext,
        pageTitle: 'Página inicial - Versões da Bíblia',
        pageDescription: 'Você está na página de seleção de versões da Bíblia Sagrada. Aqui você pode escolher entre diferentes traduções como NVI, ACF, ARA e outras.',
        availableActions: [
          'Navegar para Gênesis capítulo 1',
          'Explorar diferentes versões da Bíblia',
          'Acessar o dicionário bíblico',
          'Ir para a Harpa Cristã',
          'Visitar o Cantor Cristão'
        ],
        contextualInfo: 'Existem 10 versões da Bíblia disponíveis, incluindo traduções modernas e clássicas.'
      };
    } else if (path.startsWith('/biblia/')) {
      const parts = path.split('/');
      const livro = parts[2] || '';
      const capitulo = parts[3] || '';
      const versao = searchParams.get('versao') || 'nvi';
      
      newContext = {
        ...newContext,
        pageTitle: `Leitura Bíblica - ${formatBookName(livro)} ${capitulo}`,
        pageDescription: `Você está lendo ${formatBookName(livro)}, capítulo ${capitulo} na versão ${versao.toUpperCase()}. Use os comandos de voz para navegar ou ouvir o conteúdo.`,
        availableActions: [
          'Ler o capítulo completo',
          'Navegar para o próximo capítulo',
          'Voltar ao capítulo anterior',
          'Alternar versão da Bíblia',
          'Ativar modo de leitura contínua'
        ],
        contextualInfo: `Este é o livro ${formatBookName(livro)}, que faz parte do ${getTestamentInfo(livro)}. O capítulo ${capitulo} contém vários versículos com ensinamentos importantes.`
      };
    } else if (path === '/dicionario') {
      newContext = {
        ...newContext,
        pageTitle: 'Dicionário e Concordância Bíblica',
        pageDescription: 'Você está no dicionário e concordância bíblica. Aqui você pode pesquisar termos bíblicos e encontrar suas definições e referências nas escrituras.',
        availableActions: [
          'Pesquisar termos bíblicos',
          'Ouvir definições de palavras',
          'Encontrar referências de versículos',
          'Explorar concordância bíblica'
        ],
        contextualInfo: 'O dicionário contém mais de 25 termos bíblicos com suas definições e referências completas.'
      };
    } else if (path === '/harpa') {
      newContext = {
        ...newContext,
        pageTitle: 'Harpa Cristã',
        pageDescription: 'Você está na seção da Harpa Cristã, uma coletânea tradicional de hinos evangélicos usada pelas Assembleias de Deus.',
        availableActions: [
          'Navegar pelos hinos da Harpa',
          'Ouvir a letra dos hinos',
          'Buscar hinos por número ou título',
          'Explorar hinos por categoria'
        ],
        contextualInfo: 'A Harpa Cristã contém centenas de hinos clássicos que edificam a fé cristã.'
      };
    } else if (path === '/hinario') {
      newContext = {
        ...newContext,
        pageTitle: 'Cantor Cristão',
        pageDescription: 'Você está no Cantor Cristão, hinário tradicional amplamente utilizado pelas igrejas batistas no Brasil.',
        availableActions: [
          'Explorar hinos do Cantor Cristão',
          'Ouvir letras dos hinos',
          'Buscar por número ou título',
          'Navegar por temas'
        ],
        contextualInfo: 'O Cantor Cristão é parte da rica tradição de hinários cristãos no Brasil.'
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
