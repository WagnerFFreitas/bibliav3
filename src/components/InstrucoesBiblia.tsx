
const InstrucoesBiblia = () => {
  return (
    <div className="bg-black/70 p-3 sm:p-4 rounded-lg mb-4 sm:mb-6 text-gray-300 text-xs sm:text-sm">
      <p className="mb-2">
        <strong>Como navegar na Bíblia:</strong>
      </p>
      <ul className="list-disc list-inside space-y-1">
        <li>Use o menu lateral para selecionar diferentes livros da Bíblia</li>
        <li>Clique em um número abaixo para selecionar um versículo específico</li>
        <li>Use os botões de navegação para avançar ou retroceder entre os capítulos</li>
        <li>Selecione diferentes versões da Bíblia no menu suspenso acima</li>
      </ul>
      <p className="mt-2 text-gray-400 italic">
        Nota: Quando um versículo não está disponível em uma versão específica, o sistema exibirá 
        um texto simulado ou mostrará o versículo de outra versão como alternativa.
      </p>
    </div>
  );
};

export default InstrucoesBiblia;
