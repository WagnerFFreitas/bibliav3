
import { useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

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
      {versesGrid.map((row, rowIndex) => (
        <div key={rowIndex} className="grid grid-cols-13 gap-2 mb-2">
          {row.map((verse) => (
            <button
              key={verse}
              onClick={() => handleVerseClick(verse)}
              className={`
                flex items-center justify-center
                aspect-square rounded
                ${verse === selectedVerse 
                  ? "bg-green-600 hover:bg-green-700" 
                  : "bg-indigo-900 hover:bg-indigo-800"}
                text-white font-medium text-sm md:text-base
                transition-colors duration-200
              `}
            >
              {verse}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default BibleVerseGrid;
