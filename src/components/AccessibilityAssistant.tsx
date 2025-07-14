
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mic, MicOff, Volume2, VolumeX, Headphones, HelpCircle, X } from 'lucide-react';
import useAccessibilityAssistant from '@/hooks/useAccessibilityAssistant';

const AccessibilityAssistant: React.FC = () => {
  const [showWelcome, setShowWelcome] = useState(false);
  const [hasShownWelcome, setHasShownWelcome] = useState(false);
  
  const {
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
  } = useAccessibilityAssistant();

  // Mostrar dialog de boas-vindas na primeira visita
  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem('accessibility-welcome-shown');
    if (!hasSeenWelcome && !hasShownWelcome) {
      setTimeout(() => {
        setShowWelcome(true);
        setHasShownWelcome(true);
      }, 2000);
    }
  }, [hasShownWelcome]);

  const handleActivateAssistant = () => {
    activateAssistant();
    setShowWelcome(false);
    localStorage.setItem('accessibility-welcome-shown', 'true');
  };

  const handleDeclineAssistant = () => {
    setShowWelcome(false);
    localStorage.setItem('accessibility-welcome-shown', 'true');
  };

  if (!isActive && !showWelcome) {
    return (
      <Button
        onClick={() => setShowWelcome(true)}
        className="fixed bottom-4 right-4 z-50 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3"
        title="Ativar assistente de acessibilidade"
      >
        <Headphones className="w-5 h-5" />
      </Button>
    );
  }

  return (
    <>
      {/* Dialog de Boas-vindas */}
      <Dialog open={showWelcome} onOpenChange={setShowWelcome}>
        <DialogContent className="max-w-md bg-blue-50 border-blue-200">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-blue-800">
              <Headphones className="w-5 h-5" />
              Assistente de Acessibilidade
            </DialogTitle>
            <DialogDescription className="text-blue-700">
              Olá! Precisa de auxílio para navegar no site da Bíblia Sagrada? 
              Nossa assistente virtual pode orientar você por todo o site:
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-3">
            <ul className="space-y-2 text-sm text-blue-700">
              <li>• Explicar todos os recursos disponíveis verbalmente</li>
              <li>• Ler versículos e capítulos da Bíblia</li>
              <li>• Navegar por comando de voz para qualquer seção</li>
              <li>• Orientar sobre dicionário, concordância e hinários</li>
              <li>• Descrever elementos da tela em detalhes</li>
              <li>• Fornecer instruções passo a passo de navegação</li>
            </ul>
            
            <div className="flex gap-2 pt-4">
              <Button 
                onClick={handleActivateAssistant}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              >
                Sim, ativar assistente
              </Button>
              <Button 
                onClick={handleDeclineAssistant}
                variant="outline"
                className="flex-1 border-blue-300 text-blue-700 hover:bg-blue-100"
              >
                Não, obrigado
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Painel do Assistente Ativo */}
      {isActive && (
        <div className="fixed bottom-4 right-4 z-50 w-80 bg-white shadow-lg rounded-lg border border-gray-200">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Headphones className="w-4 h-4 text-blue-600" />
                  Assistente Ativo
                </div>
                <Button
                  onClick={deactivateAssistant}
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 hover:bg-red-100"
                >
                  <X className="w-3 h-3" />
                </Button>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-3">
              {/* Status atual */}
              <div className="flex gap-2">
                {isListening && (
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    <Mic className="w-3 h-3 mr-1" />
                    Ouvindo
                  </Badge>
                )}
                {isReading && (
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    <Volume2 className="w-3 h-3 mr-1" />
                    Lendo
                  </Badge>
                )}
              </div>

              {/* Controles principais */}
              <div className="flex gap-2">
                <Button
                  onClick={isListening ? stopListening : startListening}
                  size="sm"
                  variant={isListening ? "destructive" : "default"}
                  className="flex-1"
                >
                  {isListening ? <MicOff className="w-4 h-4 mr-1" /> : <Mic className="w-4 h-4 mr-1" />}
                  {isListening ? 'Parar' : 'Ouvir'}
                </Button>
                
                <Button
                  onClick={isReading ? stopReading : () => readContent('Como posso ajudar você hoje?')}
                  size="sm"
                  variant={isReading ? "destructive" : "secondary"}
                  className="flex-1"
                >
                  {isReading ? <VolumeX className="w-4 h-4 mr-1" /> : <Volume2 className="w-4 h-4 mr-1" />}
                  {isReading ? 'Parar' : 'Falar'}
                </Button>
              </div>

              {/* Comandos rápidos */}
              <div className="space-y-2">
                <p className="text-xs font-medium text-gray-600">Comandos rápidos:</p>
                <div className="grid grid-cols-2 gap-1 text-xs">
                  <Button
                    onClick={() => readContent('Abrindo ajuda com comandos disponíveis')}
                    variant="outline"
                    size="sm"
                    className="text-xs h-6"
                  >
                    <HelpCircle className="w-3 h-3 mr-1" />
                    Ajuda
                  </Button>
                  <Button
                    onClick={() => {
                      const mainContent = document.querySelector('main')?.textContent || '';
                      readContent(mainContent.slice(0, 300) + '...');
                    }}
                    variant="outline"
                    size="sm"
                    className="text-xs h-6"
                  >
                    <Volume2 className="w-3 h-3 mr-1" />
                    Ler página
                  </Button>
                </div>
              </div>

              {/* Conteúdo sendo lido */}
              {currentContent && (
                <div className="text-xs text-gray-600 p-2 bg-gray-50 rounded">
                  <strong>Lendo:</strong> {currentContent.slice(0, 100)}...
                </div>
              )}

              {/* Dicas */}
              <div className="text-xs text-gray-500 bg-blue-50 p-2 rounded">
                💡 Diga "explicar recursos" para conhecer todas as funcionalidades ou "sim/não" para responder perguntas
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default AccessibilityAssistant;
