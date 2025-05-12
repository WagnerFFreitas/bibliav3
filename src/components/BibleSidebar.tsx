
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Book } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const bibleBooks = [
  { id: "genesis", name: "Gênesis", chapters: 50 },
  { id: "exodo", name: "Êxodo", chapters: 40 },
  { id: "levitico", name: "Levítico", chapters: 27 },
  { id: "numeros", name: "Números", chapters: 36 },
  { id: "deuteronomio", name: "Deuteronômio", chapters: 34 },
  { id: "josue", name: "Josué", chapters: 24 },
  { id: "juizes", name: "Juízes", chapters: 21 },
  { id: "rute", name: "Rute", chapters: 4 },
  { id: "1samuel", name: "1º Samuel", chapters: 31 },
  { id: "2samuel", name: "2º Samuel", chapters: 24 },
  { id: "1reis", name: "1º Reis", chapters: 22 },
  { id: "2reis", name: "2º Reis", chapters: 25 },
  { id: "1cronicas", name: "1º Crônicas", chapters: 29 },
  { id: "2cronicas", name: "2º Crônicas", chapters: 36 },
  { id: "esdras", name: "Esdras", chapters: 10 },
  { id: "neemias", name: "Neemias", chapters: 13 },
  { id: "ester", name: "Ester", chapters: 10 },
  { id: "jo", name: "Jó", chapters: 42 },
  { id: "salmos", name: "Salmos", chapters: 150 },
  { id: "proverbios", name: "Provérbios", chapters: 31 },
  { id: "eclesiastes", name: "Eclesiastes", chapters: 12 },
  { id: "cantares", name: "Cantares", chapters: 8 },
  { id: "isaias", name: "Isaías", chapters: 66 },
  { id: "jeremias", name: "Jeremias", chapters: 52 },
  { id: "lamentacoes", name: "Lamentações", chapters: 5 },
  { id: "ezequiel", name: "Ezequiel", chapters: 48 },
  { id: "daniel", name: "Daniel", chapters: 12 },
  { id: "oseias", name: "Oséias", chapters: 14 },
  { id: "joel", name: "Joel", chapters: 3 },
  { id: "amos", name: "Amós", chapters: 9 },
  { id: "obadias", name: "Obadias", chapters: 1 },
  { id: "jonas", name: "Jonas", chapters: 4 },
  { id: "miqueias", name: "Miquéias", chapters: 7 },
  { id: "naum", name: "Naum", chapters: 3 },
  { id: "habacuque", name: "Habacuque", chapters: 3 },
  { id: "sofonias", name: "Sofonias", chapters: 3 },
  { id: "ageu", name: "Ageu", chapters: 2 },
  { id: "zacarias", name: "Zacarias", chapters: 14 },
  { id: "malaquias", name: "Malaquias", chapters: 4 },
  { id: "mateus", name: "Mateus", chapters: 28 },
  { id: "marcos", name: "Marcos", chapters: 16 },
  { id: "lucas", name: "Lucas", chapters: 24 },
  { id: "joao", name: "João", chapters: 21 },
  { id: "atos", name: "Atos", chapters: 28 },
  { id: "romanos", name: "Romanos", chapters: 16 },
  { id: "1corintios", name: "1ª Coríntios", chapters: 16 },
  { id: "2corintios", name: "2ª Coríntios", chapters: 13 },
  { id: "galatas", name: "Gálatas", chapters: 6 },
  { id: "efesios", name: "Efésios", chapters: 6 },
  { id: "filipenses", name: "Filipenses", chapters: 4 },
  { id: "colossenses", name: "Colossenses", chapters: 4 },
  { id: "1tessalonicenses", name: "1ª Tessalonicenses", chapters: 5 },
  { id: "2tessalonicenses", name: "2ª Tessalonicenses", chapters: 3 },
  { id: "1timoteo", name: "1ª Timóteo", chapters: 6 },
  { id: "2timoteo", name: "2ª Timóteo", chapters: 4 },
  { id: "tito", name: "Tito", chapters: 3 },
  { id: "filemom", name: "Filemom", chapters: 1 },
  { id: "hebreus", name: "Hebreus", chapters: 13 },
  { id: "tiago", name: "Tiago", chapters: 5 },
  { id: "1pedro", name: "1ª Pedro", chapters: 5 },
  { id: "2pedro", name: "2ª Pedro", chapters: 3 },
  { id: "1joao", name: "1ª João", chapters: 5 },
  { id: "2joao", name: "2ª João", chapters: 1 },
  { id: "3joao", name: "3ª João", chapters: 1 },
  { id: "judas", name: "Judas", chapters: 1 },
  { id: "apocalipse", name: "Apocalipse", chapters: 22 },
];

const BibleSidebarContent = ({ onChapterSelect }) => {
  const [selectedBook, setSelectedBook] = useState<string | null>(null);
  const [expandedBook, setExpandedBook] = useState<string | null>(null);

  const handleBookClick = (bookId: string) => {
    if (expandedBook === bookId) {
      setExpandedBook(null);
    } else {
      setExpandedBook(bookId);
      setSelectedBook(bookId);
    }
  };

  // Função para gerar array de capítulos com base no número total
  const generateChapters = (totalChapters: number) => {
    return Array.from({ length: totalChapters }, (_, i) => i + 1);
  };

  return (
    <div className="h-full overflow-y-auto">
      <h2 className="text-2xl font-bold text-gray-300 mb-4">LIVROS</h2>
      <ul className="space-y-1">
        {bibleBooks.map((book) => (
          <li key={book.id}>
            <div className="flex flex-col">
              <button
                className={`flex justify-between items-center py-1.5 px-2 rounded transition w-full text-left ${
                  selectedBook === book.id 
                    ? "text-white font-semibold" 
                    : "text-gray-400 hover:text-white"
                }`}
                onClick={() => handleBookClick(book.id)}
              >
                <span>{book.name}</span>
                <ChevronRight 
                  size={16} 
                  className={`transition-transform duration-200 ${
                    expandedBook === book.id ? "rotate-90" : ""
                  }`} 
                />
              </button>
              
              {expandedBook === book.id && (
                <div className="ml-4 mt-1 grid grid-cols-4 sm:grid-cols-5 gap-1">
                  {generateChapters(book.chapters).map((chapter) => (
                    <Link
                      key={chapter}
                      to={`/biblia/${book.id}/${chapter}`}
                      onClick={() => onChapterSelect?.()}
                      className="flex items-center justify-center aspect-square rounded
                                bg-indigo-900 hover:bg-indigo-800 text-white font-medium text-sm
                                transition-colors duration-200"
                    >
                      {chapter}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const BibleSidebar = () => {
  const isMobile = useIsMobile();
  
  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm" className="md:hidden fixed bottom-4 left-4 z-10 bg-indigo-900 border-indigo-700 text-white shadow-lg">
            <Book className="mr-2 h-4 w-4" />
            Livros
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[280px] sm:w-[350px] bg-black border-r border-gray-800 p-4">
          <BibleSidebarContent onChapterSelect={() => document.body.click()} />
        </SheetContent>
      </Sheet>
    );
  }
  
  return (
    <div className="hidden md:block w-64 md:w-72 h-full overflow-y-auto bg-black border-r border-gray-800 p-4">
      <BibleSidebarContent onChapterSelect={() => {}} />
    </div>
  );
};

export default BibleSidebar;
