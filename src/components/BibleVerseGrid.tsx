
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

interface BibleVerseGridProps {
  totalVerses: number;
  rows?: number;
}

const BibleVerseGrid = ({ totalVerses, rows = 4 }: BibleVerseGridProps) => {
  const { livro = "genesis", capitulo = "1" } = useParams();
  
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
  
  return (
    <div className="space-y-2">
      {versesGrid.map((row, rowIndex) => (
        <div key={rowIndex} className="grid grid-cols-13 gap-2 mb-2">
          {row.map((verse) => (
            <Link
              key={verse}
              to={`/biblia/${livro}/${capitulo}#v${verse}`}
              className={`
                flex items-center justify-center
                aspect-square rounded
                bg-indigo-900 hover:bg-indigo-800
                text-white font-medium text-sm md:text-base
                transition-colors duration-200
                ${verse === 1 ? "bg-indigo-800" : ""}
              `}
            >
              {verse}
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
};

export default BibleVerseGrid;
