
import { toast } from "sonner";

export interface Versiculo {
  título?: string;
  texto?: string;
  traducao?: string;
}

export interface CapituloBiblico {
  livro: string;
  capítulo: number;
  versículos: Record<string, string | Versiculo>;
}

export interface VersaoBiblia {
  id: string;
  nome: string;
  abreviacao: string;
  descricao: string;
  ano: number | null;
}

export interface LivroBiblia {
  id: string;
  nome: string;
  abreviacao: string;
  testamento: "antigo" | "novo";
  capitulos: number;
}

/**
 * Carrega os dados do capítulo bíblico
 */
export const loadChapter = async (
  versao: string, 
  livro: string, 
  capitulo: number
): Promise<CapituloBiblico | null> => {
  try {
    const response = await fetch(`/src/data/${versao}/${livro}/${capitulo}.json`);
    
    if (!response.ok) {
      console.error(`Erro ao carregar capítulo: ${response.status}`);
      return null;
    }
    
    const data = await response.json();
    return data as CapituloBiblico;
  } catch (error) {
    console.error("Erro ao carregar capítulo:", error);
    toast.error(`Erro ao carregar o capítulo ${capitulo} de ${livro}. Por favor, tente novamente.`);
    return null;
  }
};

/**
 * Carrega as versões disponíveis da Bíblia
 */
export const loadVersions = async (): Promise<VersaoBiblia[]> => {
  try {
    const response = await fetch('/src/data/versoes.json');
    
    if (!response.ok) {
      console.error(`Erro ao carregar versões: ${response.status}`);
      return [];
    }
    
    const data = await response.json();
    return data.versoes as VersaoBiblia[];
  } catch (error) {
    console.error("Erro ao carregar versões:", error);
    toast.error("Erro ao carregar as versões da Bíblia. Por favor, tente novamente.");
    return [];
  }
};

/**
 * Carrega os livros da Bíblia
 */
export const loadBooks = async (): Promise<LivroBiblia[]> => {
  try {
    const response = await fetch('/src/data/livros.json');
    
    if (!response.ok) {
      console.error(`Erro ao carregar livros: ${response.status}`);
      return [];
    }
    
    const data = await response.json();
    return data.livros as LivroBiblia[];
  } catch (error) {
    console.error("Erro ao carregar livros:", error);
    toast.error("Erro ao carregar os livros da Bíblia. Por favor, tente novamente.");
    return [];
  }
};

/**
 * Formata texto do versículo
 */
export const formatVerseText = (verse: string | Versiculo): string => {
  if (typeof verse === 'string') {
    return verse;
  }
  
  if (verse.texto) {
    return verse.traducao ? `${verse.texto}\n(Tradução: ${verse.traducao})` : verse.texto;
  }
  
  return '';
};

/**
 * Obtém o título do versículo, se existir
 */
export const getVerseTitle = (verse: string | Versiculo): string | undefined => {
  if (typeof verse === 'object' && verse.título) {
    return verse.título;
  }
  return undefined;
};
