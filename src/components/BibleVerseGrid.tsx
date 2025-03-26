
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface BibleVerseGridProps {
  totalVerses: number;
  rows?: number;
  onVerseSelect?: (verse: number) => void;
}

const BibleVerseGrid = ({ totalVerses, rows = 4, onVerseSelect }: BibleVerseGridProps) => {
  const { livro = "genesis", capitulo = "1" } = useParams();
  const [selectedVerse, setSelectedVerse] = useState<number | null>(null);
  
  // Calcular quantos versículos mostrar por linha
  const versesPerRow = Math.ceil(totalVerses / rows);
  const versesGrid = [];
  
  // Criar grid de versículos
  for (let row = 0; row < rows; row++) {
    const rowVerses = [];
    for (let col = 1; col <= versesPerRow; col++) {
      const verseNumber = row * versesPerRow + col;
      if (verseNumber <= totalVerses) {
        rowVerses.push(verseNumber);
      }
    }
    versesGrid.push(rowVerses);
  }

  const handleVerseClick = (verse: number) => {
    setSelectedVerse(verse);
    if (onVerseSelect) {
      onVerseSelect(verse);
    }
  };
  
  return (
    <div className="space-y-2">
      <h2 className="text-xl font-bold mb-4 text-center">Versículos</h2>
      {versesGrid.map((row, rowIndex) => (
        <div key={rowIndex} className="flex flex-wrap gap-2 mb-2 justify-center">
          {row.map((verse) => (
            <Button
              key={verse}
              onClick={() => handleVerseClick(verse)}
              variant={verse === selectedVerse ? "default" : "outline"}
              className={`
                min-w-12 h-10 rounded-md
                ${verse === selectedVerse 
                  ? "bg-green-600 hover:bg-green-700 text-white" 
                  : "bg-indigo-900/70 hover:bg-indigo-800 text-white border-indigo-700"}
                font-medium text-sm transition-colors duration-200
              `}
            >
              {verse}
            </Button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default BibleVerseGrid;
