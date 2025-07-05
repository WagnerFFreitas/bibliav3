
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Share2, MessageCircle, Send, Mail } from 'lucide-react';
import { toast } from 'sonner';

interface ShareVerseProps {
  livro: string;
  capitulo: number;
  versiculo: number;
  texto: string;
  versao: string;
}

const ShareVerse: React.FC<ShareVerseProps> = ({ 
  livro, 
  capitulo, 
  versiculo, 
  texto, 
  versao 
}) => {
  const formatBookName = (book: string) => {
    return book.charAt(0).toUpperCase() + book.slice(1);
  };

  const createShareText = () => {
    const bookName = formatBookName(livro);
    return `"${texto}"\n\n${bookName} ${capitulo}:${versiculo} (${versao.toUpperCase()})\n\n🙏 Compartilhado via Bíblia Sagrada Online`;
  };

  const shareViaWhatsApp = () => {
    const text = encodeURIComponent(createShareText());
    const url = `https://wa.me/?text=${text}`;
    window.open(url, '_blank');
    toast.success('Compartilhando no WhatsApp');
  };

  const shareViaTelegram = () => {
    const text = encodeURIComponent(createShareText());
    const url = `https://t.me/share/url?text=${text}`;
    window.open(url, '_blank');
    toast.success('Compartilhando no Telegram');
  };

  const shareViaEmail = () => {
    const subject = encodeURIComponent(`Versículo Bíblico - ${formatBookName(livro)} ${capitulo}:${versiculo}`);
    const body = encodeURIComponent(createShareText());
    const url = `mailto:?subject=${subject}&body=${body}`;
    window.location.href = url;
    toast.success('Abrindo cliente de email');
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(createShareText());
      toast.success('Versículo copiado para a área de transferência');
    } catch (error) {
      console.error('Erro ao copiar:', error);
      toast.error('Erro ao copiar versículo');
    }
  };

  return (
    <Card className="w-full bg-blue-50 border-blue-200">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-blue-800 text-sm">
          <Share2 className="w-4 h-4" />
          Compartilhar Versículo
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <Button
            onClick={shareViaWhatsApp}
            className="bg-green-600 hover:bg-green-700 text-white text-xs"
            size="sm"
          >
            <MessageCircle className="w-3 h-3 mr-1" />
            WhatsApp
          </Button>
          
          <Button
            onClick={shareViaTelegram}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs"
            size="sm"
          >
            <Send className="w-3 h-3 mr-1" />
            Telegram
          </Button>
          
          <Button
            onClick={shareViaEmail}
            className="bg-gray-600 hover:bg-gray-700 text-white text-xs"
            size="sm"
          >
            <Mail className="w-3 h-3 mr-1" />
            Email
          </Button>
          
          <Button
            onClick={copyToClipboard}
            variant="outline"
            className="text-xs border-blue-300 text-blue-700 hover:bg-blue-100"
            size="sm"
          >
            <Share2 className="w-3 h-3 mr-1" />
            Copiar
          </Button>
        </div>
        
        <div className="text-xs text-gray-600 bg-white p-2 rounded border">
          <strong>Prévia:</strong> "{texto.slice(0, 50)}..." - {formatBookName(livro)} {capitulo}:{versiculo}
        </div>
      </CardContent>
    </Card>
  );
};

export default ShareVerse;
