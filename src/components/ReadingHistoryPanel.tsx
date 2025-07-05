
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { History, BookOpen, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useReadingHistory from '@/hooks/useReadingHistory';

const ReadingHistoryPanel: React.FC = () => {
  const navigate = useNavigate();
  const { readingHistory, getRecentReading, clearHistory } = useReadingHistory();
  
  const recentReading = getRecentReading();

  const formatBookName = (book: string) => {
    return book.charAt(0).toUpperCase() + book.slice(1);
  };

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      return 'Agora há pouco';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h atrás`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d atrás`;
    }
  };

  const navigateToVerse = (item: any) => {
    if (item.versiculo) {
      navigate(`/biblia/${item.livro}/${item.capitulo}?versao=${item.versao}#v${item.versiculo}`);
    } else {
      navigate(`/biblia/${item.livro}/${item.capitulo}?versao=${item.versao}`);
    }
  };

  if (recentReading.length === 0) {
    return (
      <Card className="w-full bg-gray-50 border-gray-200">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-gray-700 text-sm">
            <History className="w-4 h-4" />
            Histórico de Leitura
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-gray-500 py-4">
            <BookOpen className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Nenhuma leitura registrada ainda</p>
            <p className="text-xs mt-1">Seu histórico aparecerá aqui</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full bg-white border-gray-200">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-gray-700 text-sm">
          <div className="flex items-center gap-2">
            <History className="w-4 h-4" />
            Histórico de Leitura
          </div>
          <Button
            onClick={clearHistory}
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
          >
            <Trash2 className="w-3 h-3" />
          </Button>
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <ScrollArea className="h-48">
          <div className="space-y-2">
            {recentReading.map((item) => (
              <div
                key={item.id}
                onClick={() => navigateToVerse(item)}
                className="p-2 bg-gray-50 rounded cursor-pointer hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-sm text-gray-800">
                      {formatBookName(item.livro)} {item.capitulo}
                      {item.versiculo ? `:${item.versiculo}` : ''}
                    </p>
                    <p className="text-xs text-gray-600">
                      {item.versao.toUpperCase()}
                    </p>
                  </div>
                  <div className="text-xs text-gray-500">
                    {formatTimestamp(item.timestamp)}
                  </div>
                </div>
                {item.texto && (
                  <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                    "{item.texto.slice(0, 80)}..."
                  </p>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ReadingHistoryPanel;
