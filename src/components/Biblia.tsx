import React, { useEffect, useState } from 'react';

interface Versiculo {
  livro: string;
  capitulo: number;
  versiculo: number;
  texto: string;
}

interface BibliaProps {
  versao: string;
  livro: string;
  capitulo: number;
}

const Biblia: React.FC<BibliaProps> = ({ versao, livro, capitulo }) => {
  const [versiculos, setVersiculos] = useState<Versiculo[]>([]);

  useEffect(() => {
    const carregarVersao = async () => {
      try {
        const response = await fetch(`/data/${versao}.json`);
        const data = await response.json();
        const resultado = data[livro]?.[capitulo];
        if (resultado) {
          setVersiculos(resultado);
        } else {
          setVersiculos([]);
        }
      } catch (error) {
        console.error('Erro ao carregar a versão:', error);
        setVersiculos([]);
      }
    };

    carregarVersao();
  }, [versao, livro, capitulo]);

  return (
    <div>
      <h2>{livro} {capitulo} - {versao.toUpperCase()}</h2>
      <ul>
        {versiculos.map((v, index) => (
          <li key={index}><strong>{v.versiculo}</strong> {v.texto}</li>
        ))}
      </ul>
    </div>
  );
};

export default Biblia;
