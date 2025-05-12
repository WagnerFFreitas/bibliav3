
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

interface BibleVerseGridProps {
  totalVerses: number;
  rows?: number;
  onVerseSelect?: (verse: number) => void;
}

const BibleVerseGrid = ({ totalVerses, rows = 4, onVerseSelect }: BibleVerseGridProps) => {
  const { livro = "genesis", capitulo = "1" } = useParams();
  const [selectedVerse, setSelectedVerse] = useState<number | null>(null);
  const isMobile = useIsMobile();
  
  // Adjust number of rows based on screen size
  const adaptiveRows = isMobile ? 10 : rows;
  
  // Calculate verses per row dynamically
  const versesPerRow = Math.ceil(totalVerses / adaptiveRows);
  const versesGrid = [];
  
  // Create grid of verses
  for (let row = 0; row < adaptiveRows; row++) {
    const rowVerses = [];
    for (let col = 1; col <= versesPerRow; col++) {
      const verseNumber = row * versesPerRow + col;
      if (verseNumber <= totalVerses) {
        rowVerses.push(verseNumber);
      }
    }
    if (rowVerses.length > 0) {
      versesGrid.push(rowVerses);
    }
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
      <div className="grid gap-2 grid-cols-1">
        {versesGrid.map((row, rowIndex) => (
          <div key={rowIndex} className="flex flex-wrap gap-2 justify-center">
            {row.map((verse) => (
              <Button
                key={verse}
                onClick={() => handleVerseClick(verse)}
                variant={verse === selectedVerse ? "default" : "outline"}
                className={`
                  min-w-9 h-9 sm:min-w-12 sm:h-10 rounded-md p-0 sm:p-2
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
    </div>
  );
};

export default BibleVerseGrid;
