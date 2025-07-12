
import React, { useState, memo, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface PropriedadesGradeVersiculosBiblia {
  totalVersiculos: number;
  linhas?: number;
  aoSelecionarVersiculo?: (versiculo: number) => void;
  versiculoSelecionado?: number | null;
}

const GradeVersiculosBiblia = memo(({ 
  totalVersiculos, 
  linhas = 4, 
  aoSelecionarVersiculo,
  versiculoSelecionado: versiculoSelecionadoProp 
}: PropriedadesGradeVersiculosBiblia) => {
  const { livro = "genesis", capitulo = "1" } = useParams();
  const [versiculoSelecionado, setVersiculoSelecionado] = useState<number | null>(versiculoSelecionadoProp || null);
  
  // Só mostra a grade se um versículo específico foi selecionado ou se há um versículo selecionado via props
  const mostrarGrade = versiculoSelecionado !== null || versiculoSelecionadoProp !== null;
  
  // Memoizar o cálculo da grade de versículos
  const gradeVersiculos = useMemo(() => {
    if (!mostrarGrade) return [];
    
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
  }, [totalVersiculos, linhas, mostrarGrade]);

  const manipularCliqueBotao = (versiculo: number) => {
    setVersiculoSelecionado(versiculo);
    if (aoSelecionarVersiculo) {
      aoSelecionarVersiculo(versiculo);
    }
  };

  // Se não deve mostrar a grade, retorna apenas um botão para mostrar os versículos
  if (!mostrarGrade) {
    return (
      <div className="text-center py-4">
        <Button
          onClick={() => setVersiculoSelecionado(1)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          Mostrar Versículos
        </Button>
      </div>
    );
  }
  
  return (
    <div className="space-y-2 px-2 sm:px-0">
      <div className="flex justify-between items-center mb-3 sm:mb-4">
        <h2 className="text-lg sm:text-xl font-bold text-center flex-1">Versículos</h2>
        <Button
          onClick={() => {
            setVersiculoSelecionado(null);
            if (aoSelecionarVersiculo) {
              aoSelecionarVersiculo(null);
            }
          }}
          variant="outline"
          size="sm"
          className="text-xs"
        >
          Ocultar
        </Button>
      </div>
      
      {gradeVersiculos.map((linha, indiceLinha) => (
        <div key={indiceLinha} className="flex flex-wrap gap-1 sm:gap-2 mb-2 justify-center">
          {linha.map((versiculo) => (
            <Button
              key={versiculo}
              onClick={() => manipularCliqueBotao(versiculo)}
              variant={versiculo === (versiculoSelecionado || versiculoSelecionadoProp) ? "default" : "outline"}
              className={`
                min-w-8 sm:min-w-12 h-8 sm:h-10 rounded-md
                ${versiculo === (versiculoSelecionado || versiculoSelecionadoProp)
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
