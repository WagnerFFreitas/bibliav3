
export const getBibleVerse = async (livro: string, capitulo: number, versiculo: number, versao: string) => {
  console.log(`📖 BibleService: Buscando ${livro} ${capitulo}:${versiculo} (${versao})`);
  
  try {
    // Validação de parâmetros
    if (!livro || !capitulo || !versiculo || !versao) {
      throw new Error('Parâmetros inválidos fornecidos');
    }

    const response = await fetch(`/data/${versao}/${livro}/${capitulo}.json`);
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Capítulo ${capitulo} do livro ${livro} não encontrado na versão ${versao}`);
      }
      throw new Error(`Erro HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log(`📖 BibleService: Dados carregados, ${data.versiculos?.length || 0} versículos`);
    
    if (!data.versiculos || !Array.isArray(data.versiculos)) {
      throw new Error('Formato de dados inválido - versículos não encontrados');
    }

    const verse = data.versiculos.find((v: any) => v.numero === versiculo);
    
    if (!verse) {
      throw new Error(`Versículo ${versiculo} não encontrado no capítulo ${capitulo} de ${livro}`);
    }
    
    console.log(`📖 BibleService: Versículo encontrado com sucesso`);
    return {
      numero: verse.numero,
      texto: verse.texto || 'Texto não disponível'
    };
  } catch (error) {
    console.error('📖 BibleService: Erro detalhado:', {
      livro,
      capitulo,
      versiculo,
      versao,
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    });
    throw error;
  }
};

// Nova função para carregar capítulo completo com cache
export const getBibleChapter = async (livro: string, capitulo: number, versao: string) => {
  console.log(`📖 BibleService: Carregando capítulo ${livro} ${capitulo} (${versao})`);
  
  try {
    if (!livro || !capitulo || !versao) {
      throw new Error('Parâmetros inválidos para carregar capítulo');
    }

    const response = await fetch(`/data/${versao}/${livro}/${capitulo}.json`);
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Capítulo ${capitulo} do livro ${livro} não encontrado na versão ${versao}`);
      }
      throw new Error(`Erro HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (!data.versiculos || !Array.isArray(data.versiculos)) {
      throw new Error('Formato de dados inválido - capítulo sem versículos');
    }

    console.log(`📖 BibleService: Capítulo carregado com ${data.versiculos.length} versículos`);
    return data;
  } catch (error) {
    console.error('📖 BibleService: Erro ao carregar capítulo:', {
      livro,
      capitulo,
      versao,
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    });
    throw error;
  }
};
