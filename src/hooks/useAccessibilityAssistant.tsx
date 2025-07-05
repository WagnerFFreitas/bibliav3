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
  const [preferredVoice, setPreferredVoice] = useState<SpeechSynthesisVoice | null>(null);
  const navigate = useNavigate();
  
  const { context } = useContentContext();
  const { executeSmartCommand } = useSmartCommands(readContentWithContext);

  function readContentWithContext(content: string) {
    readContent(content);
  }

  // Configurar voz humanizada
  const setupHumanizedVoice = useCallback(() => {
    if (!synthesis) return;

    const voices = synthesis.getVoices();
    
    // Priorizar vozes femininas em português brasileiro (mais humanizadas)
    const preferredVoices = [
      // Vozes específicas do Brasil/Portugal
      voices.find(voice => voice.lang === 'pt-BR' && voice.name.toLowerCase().includes('luciana')),
      voices.find(voice => voice.lang === 'pt-BR' && voice.name.toLowerCase().includes('maria')),
      voices.find(voice => voice.lang === 'pt-BR' && voice.name.toLowerCase().includes('fernanda')),
      voices.find(voice => voice.lang === 'pt-BR' && voice.name.toLowerCase().includes('female')),
      // Fallback para qualquer voz feminina em português
      voices.find(voice => voice.lang === 'pt-BR' && voice.name.toLowerCase().includes('f')),
      voices.find(voice => voice.lang.startsWith('pt') && voice.name.toLowerCase().includes('female')),
      // Fallback geral para português
      voices.find(voice => voice.lang === 'pt-BR'),
      voices.find(voice => voice.lang.startsWith('pt')),
      // Último recurso - voz padrão do sistema
      voices.find(voice => voice.default)
    ].filter(Boolean);

    if (preferredVoices.length > 0) {
      setPreferredVoice(preferredVoices[0] as SpeechSynthesisVoice);
    }
  }, [synthesis]);

  const readContent = useCallback((content: string) => {
    if (!synthesis) return;
    
    stopReading();
    setCurrentContent(content);
    setIsReading(true);
    
    const utterance = new SpeechSynthesisUtterance(content);
    
    // Configurações para voz mais humanizada e natural
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }
    
    utterance.lang = 'pt-BR';
    utterance.rate = 0.85; // Velocidade ligeiramente mais lenta para clareza
    utterance.pitch = 1.1; // Tom ligeiramente mais alto para soar mais natural
    utterance.volume = 0.9; // Volume quase máximo para clareza
    
    // Adicionar pausas naturais em pontuação para soar menos robótico
    const naturalContent = content
      .replace(/\./g, '.')
      .replace(/,/g, ', ')
      .replace(/:/g, ': ')
      .replace(/;/g, '; ')
      .replace(/\?/g, '? ')
      .replace(/!/g, '! ');
    
    utterance.text = naturalContent;
    
    utterance.onend = () => {
      setIsReading(false);
    };
    
    utterance.onerror = (event) => {
      console.error('Erro na síntese de voz:', event);
      setIsReading(false);
    };
    
    synthesis.speak(utterance);
  }, [synthesis, preferredVoice]);

  const stopReading = useCallback(() => {
    if (synthesis) {
      synthesis.cancel();
      setIsReading(false);
    }
  }, [synthesis]);

  const readPageContent = useCallback(() => {
    // Fornecer descrição completa da página atual
    const contextualIntro = `${context.pageTitle}. ${context.pageDescription}`;
    
    // Descrever elementos da tela
    const screenElementsDescription = context.screenElements.length > 0 
      ? `Elementos na tela: ${context.screenElements.join(', ')}.` 
      : '';
    
    // Descrever opções de navegação
    const navigationDescription = context.navigationOptions.length > 0 
      ? `Opções de navegação: ${context.navigationOptions.join(', ')}.` 
      : '';
    
    const fullContent = `${contextualIntro} ${screenElementsDescription} ${navigationDescription} ${context.contextualInfo}`;
    readContent(fullContent);
  }, [readContent, context]);

  const readAvailableCommands = useCallback(() => {
    const contextualActions = context.availableActions.join(', ');
    const commandsText = `${context.contextualInfo} Ações disponíveis nesta página: ${contextualActions}. Comandos gerais: diga "descrever tela" para conhecer todos elementos visíveis, "onde estou" para saber sua localização, "o que posso fazer" para ações disponíveis, "como navegar" para instruções de navegação, "explicar" para contexto, "ajuda" para comandos completos, ou "desativar" para me desligar.`;
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
        readContent('Abrindo o livro de Gênesis, capítulo 1. Este é o primeiro livro da Bíblia que narra a criação do mundo por Deus. Na tela você verá o texto completo do capítulo com versículos numerados, controles de navegação e uma grade para pular entre versículos.');
      } else if (command.includes('versões') || command.includes('versoes')) {
        navigate('/versoes');
        readContent('Abrindo página de versões da Bíblia. Aqui você pode escolher entre diferentes traduções como Nova Versão Internacional, Almeida Corrigida Fiel e outras. Na tela há uma lista de todas as versões disponíveis com descrições.');
      } else if (command.includes('dicionário') || command.includes('dicionario')) {
        navigate('/dicionario');
        readContent('Abrindo dicionário e concordância bíblica. Na tela há um campo de busca no topo, duas abas - Dicionário para definições de termos bíblicos, e Concordância para encontrar versículos que contêm palavras específicas. Digite qualquer termo bíblico para começar.');
      } else if (command.includes('harpa')) {
        navigate('/harpa');
        readContent('Abrindo Harpa Cristã. Na tela há uma lista numerada de hinos evangélicos tradicionais das Assembleias de Deus, com campo de busca para encontrar hinos específicos por número ou título.');
      } else if (command.includes('cantor cristão') || command.includes('cantor cristao')) {
        navigate('/hinario');
        readContent('Abrindo Cantor Cristão. Na tela há uma coleção organizada de hinos tradicionais das igrejas batistas no Brasil, com sistema de busca e navegação por categorias.');
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
      readContent('Comando não reconhecido. Tente comandos como "descrever tela" para conhecer elementos visíveis, "onde estou" para localização, "o que posso fazer" para ações disponíveis, "ler página" para ouvir conteúdo, ou "ajuda" para lista completa de comandos.');
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

  // Configurar voz quando as vozes estiverem disponíveis
  useEffect(() => {
    if (synthesis) {
      const setupVoice = () => {
        setupHumanizedVoice();
      };

      // Algumas vezes as vozes não estão imediatamente disponíveis
      if (synthesis.getVoices().length > 0) {
        setupVoice();
      } else {
        synthesis.addEventListener('voiceschanged', setupVoice);
        return () => synthesis.removeEventListener('voiceschanged', setupVoice);
      }
    }
  }, [synthesis, setupHumanizedVoice]);

  const availableCommands: VoiceCommand[] = [
    {
      command: 'descrever tela',
      action: () => {},
      description: 'Descreve todos os elementos visíveis na tela atual'
    },
    {
      command: 'onde estou',
      action: () => {},
      description: 'Informa sua localização atual no site'
    },
    {
      command: 'o que posso fazer',
      action: () => {},
      description: 'Lista todas as ações disponíveis na página atual'
    },
    {
      command: 'como navegar',
      action: () => {},
      description: 'Explica como navegar na página atual'
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
      description: 'Abre o dicionário e concordância bíblica'
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
      description: 'Lê todo o conteúdo da página atual com descrição completa'
    },
    {
      command: 'parar leitura',
      action: stopReading,
      description: 'Para a leitura atual'
    },
    {
      command: 'ajuda',
      action: readAvailableCommands,
      description: 'Lista comandos disponíveis com contexto detalhado'
    }
  ];

  const activateAssistant = useCallback(() => {
    setIsActive(true);
    toast.success('Assistente de acessibilidade ativado');
    
    // Saudação mais natural e acolhedora
    const welcomeMessage = `Olá! Sou sua assistente virtual para navegação na Bíblia Sagrada. ${context.pageDescription} ${context.contextualInfo} Para conhecer todos elementos da tela, diga "descrever tela". Para saber o que pode fazer aqui, diga "o que posso fazer". Para ajuda completa, diga "ajuda", ou "desativar" para me desligar. Estou aqui para ajudar você!`;
    
    // Pequeno delay para uma experiência mais natural
    setTimeout(() => {
      readContent(welcomeMessage);
    }, 500);
  }, [readContent, context]);

  const deactivateAssistant = useCallback(() => {
    setIsActive(false);
    setIsListening(false);
    stopReading();
    
    // Despedida mais calorosa
    const goodbyeMessage = 'Assistente desativado. Foi um prazer ajudar você! Até breve!';
    readContent(goodbyeMessage);
    
    setTimeout(() => {
      toast.info('Assistente de acessibilidade desativado');
    }, 2000);
  }, [stopReading, readContent]);

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
