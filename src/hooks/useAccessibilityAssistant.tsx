import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import useContentContext from './useContentContext';
import useSmartCommands from './useSmartCommands';

// Declarações de tipo para Web Speech API
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
  isFinal: boolean;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionConstructor {
  new (): SpeechRecognitionInstance;
}

interface SpeechRecognitionInstance extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onend: (() => void) | null;
  onerror: ((event: Event) => void) | null;
}

declare global {
  interface Window {
    SpeechRecognition: SpeechRecognitionConstructor;
    webkitSpeechRecognition: SpeechRecognitionConstructor;
  }
}

interface VoiceCommand {
  command: string;
  action: () => void;
  description: string;
}

interface UseAccessibilityAssistantReturn {
  isActive: boolean;
  isListening: boolean;
  isReading: boolean;
  currentContent: string;
  activateAssistant: () => void;
  deactivateAssistant: () => void;
  readContent: (content: string) => void;
  stopReading: () => void;
  startListening: () => void;
  stopListening: () => void;
  availableCommands: VoiceCommand[];
}

const useAccessibilityAssistant = (): UseAccessibilityAssistantReturn => {
  const [isActive, setIsActive] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isReading, setIsReading] = useState(false);
  const [currentContent, setCurrentContent] = useState('');
  const [recognition, setRecognition] = useState<SpeechRecognitionInstance | null>(null);
  const [synthesis, setSynthesis] = useState<SpeechSynthesis | null>(null);
  const navigate = useNavigate();
  
  const { context } = useContentContext();
  const { executeSmartCommand } = useSmartCommands(readContentWithContext);

  function readContentWithContext(content: string) {
    readContent(content);
  }

  const readContent = useCallback((content: string) => {
    if (!synthesis) return;
    
    stopReading();
    setCurrentContent(content);
    setIsReading(true);
    
    const utterance = new SpeechSynthesisUtterance(content);
    utterance.lang = 'pt-BR';
    utterance.rate = 0.9;
    utterance.pitch = 1;
    
    utterance.onend = () => {
      setIsReading(false);
    };
    
    synthesis.speak(utterance);
  }, []);

  const stopReading = useCallback(() => {
    if (synthesis) {
      synthesis.cancel();
      setIsReading(false);
    }
  }, [synthesis]);

  const readPageContent = useCallback(() => {
    // Primeiro, fornecer contexto da página atual
    const contextualIntro = `${context.pageTitle}. ${context.pageDescription}`;
    
    const mainContent = document.querySelector('main');
    if (mainContent) {
      const textContent = mainContent.textContent || '';
      const fullContent = `${contextualIntro} ${textContent.slice(0, 800)}`;
      readContent(fullContent);
    } else {
      readContent(contextualIntro);
    }
  }, [readContent, context]);

  const readAvailableCommands = useCallback(() => {
    const contextualActions = context.availableActions.join(', ');
    const commandsText = `${context.contextualInfo} Ações disponíveis nesta página: ${contextualActions}. Comandos gerais: diga "onde estou" para saber sua localização, "o que posso fazer" para ações disponíveis, "explicar" para contexto, "ajuda" para comandos completos, ou "desativar" para desligar o assistente.`;
    readContent(commandsText);
  }, [readContent, context]);

  const handleVoiceCommand = useCallback((command: string) => {
    console.log('Comando recebido:', command);
    
    // Primeiro tentar comandos inteligentes baseados no contexto
    if (executeSmartCommand(command, context.currentPage)) {
      return;
    }
    
    // Comandos de navegação tradicionais
    if (command.includes('abrir') || command.includes('navegar')) {
      if (command.includes('gênesis') || command.includes('genesis')) {
        navigate('/biblia/genesis/1');
        readContent('Abrindo o livro de Gênesis, capítulo 1. Este é o primeiro livro da Bíblia que narra a criação do mundo por Deus.');
      } else if (command.includes('versões') || command.includes('versoes')) {
        navigate('/versoes');
        readContent('Abrindo página de versões da Bíblia. Aqui você pode escolher entre diferentes traduções como Nova Versão Internacional, Almeida Corrigida Fiel e outras.');
      } else if (command.includes('dicionário') || command.includes('dicionario')) {
        navigate('/dicionario');
        readContent('Abrindo dicionário e concordância bíblica. Ferramenta para pesquisar termos bíblicos e suas definições completas.');
      } else if (command.includes('harpa')) {
        navigate('/harpa');
        readContent('Abrindo Harpa Cristã. Coletânea tradicional de hinos evangélicos das Assembleias de Deus.');
      } else if (command.includes('cantor cristão') || command.includes('cantor cristao')) {
        navigate('/hinario');
        readContent('Abrindo Cantor Cristão. Hinário tradicional das igrejas batistas no Brasil.');
      }
    } else if (command.includes('ler') || command.includes('leia')) {
      readPageContent();
    } else if (command.includes('parar') || command.includes('pare')) {
      stopReading();
    } else if (command.includes('ajuda') || command.includes('comandos')) {
      readAvailableCommands();
    } else if (command.includes('desativar') || command.includes('sair')) {
      deactivateAssistant();
    } else {
      readContent('Comando não reconhecido. Tente comandos como "onde estou", "o que posso fazer", "ler página", ou "ajuda" para mais opções.');
    }
  }, [navigate, readContent, stopReading, readPageContent, readAvailableCommands, executeSmartCommand, context]);

  // Inicializar APIs de fala
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognitionClass = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognitionClass();
      
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = 'pt-BR';
      
      recognitionInstance.onresult = (event: SpeechRecognitionEvent) => {
        const command = event.results[0][0].transcript.toLowerCase();
        handleVoiceCommand(command);
      };
      
      recognitionInstance.onend = () => {
        setIsListening(false);
      };
      
      setRecognition(recognitionInstance);
    }

    if ('speechSynthesis' in window) {
      setSynthesis(window.speechSynthesis);
    }
  }, [handleVoiceCommand]);

  const availableCommands: VoiceCommand[] = [
    {
      command: 'onde estou',
      action: () => {},
      description: 'Informa sua localização atual no site'
    },
    {
      command: 'o que posso fazer',
      action: () => {},
      description: 'Lista ações disponíveis na página atual'
    },
    {
      command: 'explicar',
      action: () => {},
      description: 'Fornece contexto sobre o conteúdo atual'
    },
    {
      command: 'abrir gênesis',
      action: () => navigate('/biblia/genesis/1'),
      description: 'Abre o livro de Gênesis'
    },
    {
      command: 'abrir versões',
      action: () => navigate('/versoes'),
      description: 'Abre a página de versões da Bíblia'
    },
    {
      command: 'abrir dicionário',
      action: () => navigate('/dicionario'),
      description: 'Abre o dicionário bíblico'
    },
    {
      command: 'abrir harpa',
      action: () => navigate('/harpa'),
      description: 'Abre a Harpa Cristã'
    },
    {
      command: 'abrir cantor cristão',
      action: () => navigate('/hinario'),
      description: 'Abre o Cantor Cristão'
    },
    {
      command: 'ler página',
      action: readPageContent,
      description: 'Lê o conteúdo da página atual com contexto'
    },
    {
      command: 'parar leitura',
      action: stopReading,
      description: 'Para a leitura atual'
    },
    {
      command: 'ajuda',
      action: readAvailableCommands,
      description: 'Lista comandos disponíveis com contexto'
    }
  ];

  const activateAssistant = useCallback(() => {
    setIsActive(true);
    toast.success('Assistente de acessibilidade ativado');
    
    // Saudação contextual baseada na página atual
    const welcomeMessage = `Olá! Sou seu assistente virtual para navegação na Bíblia Sagrada. ${context.pageDescription} ${context.contextualInfo} Diga "ajuda" para comandos disponíveis, "onde estou" para saber sua localização, ou "desativar" para me desligar.`;
    readContent(welcomeMessage);
  }, [readContent, context]);

  const deactivateAssistant = useCallback(() => {
    setIsActive(false);
    setIsListening(false);
    stopReading();
    toast.info('Assistente de acessibilidade desativado. Até breve!');
  }, [stopReading]);

  const startListening = useCallback(() => {
    if (!recognition) return;
    
    setIsListening(true);
    recognition.start();
    toast.info('Ouvindo comando... Fale agora.');
  }, [recognition]);

  const stopListening = useCallback(() => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  }, [recognition]);

  return {
    isActive,
    isListening,
    isReading,
    currentContent,
    activateAssistant,
    deactivateAssistant,
    readContent,
    stopReading,
    startListening,
    stopListening,
    availableCommands
  };
};

export default useAccessibilityAssistant;
