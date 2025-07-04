
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

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
    const mainContent = document.querySelector('main');
    if (mainContent) {
      const textContent = mainContent.textContent || '';
      readContent(textContent.slice(0, 500) + '...');
    } else {
      readContent('Não foi possível encontrar o conteúdo da página');
    }
  }, [readContent]);

  const readAvailableCommands = useCallback(() => {
    const commandsText = 'Comandos disponíveis: abrir gênesis para navegar para Gênesis. abrir versões para ver versões da Bíblia. abrir dicionário para acessar o dicionário bíblico. abrir harpa para ver a Harpa Cristã. abrir cantor cristão para ver o hinário. ler página para ouvir o conteúdo atual. parar leitura para interromper. ajuda para repetir esta lista. desativar para desligar o assistente.';
    readContent(commandsText);
  }, [readContent]);

  const handleVoiceCommand = useCallback((command: string) => {
    console.log('Comando recebido:', command);
    
    if (command.includes('abrir') || command.includes('navegar')) {
      if (command.includes('gênesis') || command.includes('genesis')) {
        navigate('/biblia/genesis/1');
        readContent('Abrindo o livro de Gênesis, capítulo 1');
      } else if (command.includes('versões') || command.includes('versoes')) {
        navigate('/versoes');
        readContent('Abrindo página de versões da Bíblia');
      } else if (command.includes('dicionário') || command.includes('dicionario')) {
        navigate('/dicionario');
        readContent('Abrindo dicionário bíblico');
      } else if (command.includes('harpa')) {
        navigate('/harpa');
        readContent('Abrindo Harpa Cristã');
      } else if (command.includes('cantor cristão') || command.includes('cantor cristao')) {
        navigate('/hinario');
        readContent('Abrindo Cantor Cristão');
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
      readContent('Comando não reconhecido. Diga "ajuda" para ouvir os comandos disponíveis.');
    }
  }, [navigate, readContent, stopReading, readPageContent, readAvailableCommands]);

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
      description: 'Lê o conteúdo da página atual'
    },
    {
      command: 'parar leitura',
      action: stopReading,
      description: 'Para a leitura atual'
    },
    {
      command: 'ajuda',
      action: readAvailableCommands,
      description: 'Lista comandos disponíveis'
    }
  ];

  const activateAssistant = useCallback(() => {
    setIsActive(true);
    toast.success('Assistente de acessibilidade ativado');
    readContent('Olá! Sou seu assistente virtual para navegação na Bíblia Sagrada. Posso ajudar você a navegar pelo site, ler conteúdos e acessar diferentes seções. Diga "ajuda" para ouvir os comandos disponíveis ou "desativar" para me desligar.');
  }, [readContent]);

  const deactivateAssistant = useCallback(() => {
    setIsActive(false);
    setIsListening(false);
    stopReading();
    toast.info('Assistente de acessibilidade desativado');
  }, [stopReading]);

  const startListening = useCallback(() => {
    if (!recognition) return;
    
    setIsListening(true);
    recognition.start();
    toast.info('Ouvindo comando...');
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
