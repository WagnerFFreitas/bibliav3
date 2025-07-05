
export const getBibleVerse = async (livro: string, capitulo: number, versiculo: number, versao: string) => {
  try {
    // Carrega o arquivo JSON da versão específica
    const response = await fetch(`/data/${versao}/${livro}/${capitulo}.json`);
    
    if (!response.ok) {
      throw new Error(`Erro ao carregar ${livro} ${capitulo} na versão ${versao}`);
    }
    
    const data = await response.json();
    
    // Procura o versículo específico
    const verse = data.versiculos?.find((v: any) => v.numero === versiculo);
    
    if (!verse) {
      throw new Error(`Versículo ${versiculo} não encontrado`);
    }
    
    return {
      numero: verse.numero,
      texto: verse.texto
    };
  } catch (error) {
    console.error('Erro ao buscar versículo:', error);
    throw error;
  }
};
