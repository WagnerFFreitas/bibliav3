
import React, { useState, memo, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface PropriedadesGradeVersiculosBiblia {
  totalVersiculos: number;
  linhas?: number;
  aoSelecionarVersiculo?: (versiculo: number) => void;
}

const GradeVersiculosBiblia = memo(({ totalVersiculos, linhas = 4, aoSelecionarVersiculo }: PropriedadesGradeVersiculosBiblia) => {
  const { livro = "genesis", capitulo = "1" } = useParams();
  const [versiculoSelecionado, setVersiculoSelecionado] = useState<number | null>(null);
  
  // Memoizar o cálculo da grade de versículos
  const gradeVersiculos = useMemo(() => {
    const versiculosPorLinha = Math.ceil(totalVersiculos / linhas);
    const grade = [];
    
    for (let linha = 0; linha < linhas; linha++) {
      const versiculosLinha = [];
      for (let coluna = 1; coluna <= versiculosPorLinha; coluna++) {
        const numeroVersiculo = linha * versiculosPorLinha + coluna;
        if (numeroVersiculo <= totalVersiculos) {
          versiculosLinha.push(numeroVersiculo);
        }
      }
      grade.push(versiculosLinha);
    }
    
    return grade;
  }, [totalVersiculos, linhas]);

  const manipularCliqueBotao = (versiculo: number) => {
    setVersiculoSelecionado(versiculo);
    if (aoSelecionarVersiculo) {
      aoSelecionarVersiculo(versiculo);
    }
  };
  
  return (
    <div className="space-y-2 px-2 sm:px-0">
      <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-center">Versículos</h2>
      {gradeVersiculos.map((linha, indiceLinha) => (
        <div key={indiceLinha} className="flex flex-wrap gap-1 sm:gap-2 mb-2 justify-center">
          {linha.map((versiculo) => (
            <Button
              key={versiculo}
              onClick={() => manipularCliqueBotao(versiculo)}
              variant={versiculo === versiculoSelecionado ? "default" : "outline"}
              className={`
                min-w-8 sm:min-w-12 h-8 sm:h-10 rounded-md
                ${versiculo === versiculoSelecionado 
                  ? "bg-green-600 hover:bg-green-700 text-white" 
                  : "bg-indigo-900/70 hover:bg-indigo-800 text-white border-indigo-700"}
                font-medium text-xs sm:text-sm transition-colors duration-200
                flex-shrink-0
              `}
            >
              {versiculo}
            </Button>
          ))}
        </div>
      ))}
    </div>
  );
});

GradeVersiculosBiblia.displayName = 'GradeVersiculosBiblia';

export default GradeVersiculosBiblia;
