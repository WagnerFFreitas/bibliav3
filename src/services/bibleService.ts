
export const getBibleVerse = async (livro: string, capitulo: number, versiculo: number, versao: string) => {
  console.log(`📖 BibleService: Buscando ${livro} ${capitulo}:${versiculo} (${versao})`);
  
  try {
    // Validação de parâmetros
    if (!livro || !capitulo || !versiculo || !versao) {
      throw new Error('Parâmetros inválidos fornecidos');
    }

    // Carregar do caminho correto baseado na estrutura de arquivos
      const response = await fetch(`/data/${versao}/${livro}/${capitulo}.json`);
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Capítulo ${capitulo} do livro ${livro} não encontrado na versão ${versao}`);
      }
      throw new Error(`Erro HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log(`📖 BibleService: Dados carregados:`, data);
    
    if (!data.versículos) {
      throw new Error('Formato de dados inválido - versículos não encontrados');
    }

    // Buscar o versículo específico
    const verse = data.versículos[versiculo.toString()];
    
    if (!verse) {
      throw new Error(`Versículo ${versiculo} não encontrado no capítulo ${capitulo} de ${livro}`);
    }
    
    // Extrair o texto do versículo (pode ser string simples ou objeto com texto)
    const texto = typeof verse === 'string' ? verse : verse.texto || 'Texto não disponível';
    
    console.log(`📖 BibleService: Versículo encontrado com sucesso`);
    return {
      numero: versiculo,
      texto: texto
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

// Nova função para carregar capítulo completo
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
    
    if (!data.versículos) {
      throw new Error('Formato de dados inválido - capítulo sem versículos');
    }

    console.log(`📖 BibleService: Capítulo carregado com ${Object.keys(data.versículos).length} versículos`);
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
