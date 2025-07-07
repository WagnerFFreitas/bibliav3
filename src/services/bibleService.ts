
export const getBibleVerse = async (livro: string, capitulo: number, versiculo: number, versao: string) => {
  console.log(`📖 BibleService: Buscando ${livro} ${capitulo}:${versiculo} (${versao})`);
  
  try {
    // Carrega o arquivo JSON da versão específica
    const response = await fetch(`/data/${versao}/${livro}/${capitulo}.json`);
    
    if (!response.ok) {
      console.error(`📖 BibleService: Erro HTTP ${response.status} ao carregar ${livro} ${capitulo}`);
      throw new Error(`Erro ao carregar ${livro} ${capitulo} na versão ${versao}`);
    }
    
    const data = await response.json();
    console.log(`📖 BibleService: Dados carregados, ${data.versiculos?.length || 0} versículos`);
    
    // Procura o versículo específico
    const verse = data.versiculos?.find((v: any) => v.numero === versiculo);
    
    if (!verse) {
      console.error(`📖 BibleService: Versículo ${versiculo} não encontrado`);
      throw new Error(`Versículo ${versiculo} não encontrado`);
    }
    
    console.log(`📖 BibleService: Versículo encontrado com sucesso`);
    return {
      numero: verse.numero,
      texto: verse.texto
    };
  } catch (error) {
    console.error('📖 BibleService: Erro geral:', error);
    throw error;
  }
};
