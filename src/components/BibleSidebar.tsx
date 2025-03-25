
import { useState } from "react";
import { Link } from "react-router-dom";

const bibleBooks = [
  { id: "genesis", name: "Gênesis" },
  { id: "exodo", name: "Êxodo" },
  { id: "levitico", name: "Levítico" },
  { id: "numeros", name: "Números" },
  { id: "deuteronomio", name: "Deuteronômio" },
  { id: "josue", name: "Josué" },
  { id: "juizes", name: "Juízes" },
  { id: "rute", name: "Rute" },
  { id: "1samuel", name: "1º Samuel" },
  { id: "2samuel", name: "2º Samuel" },
  { id: "1reis", name: "1º Reis" },
  { id: "2reis", name: "2º Reis" },
  { id: "1cronicas", name: "1º Crônicas" },
  { id: "2cronicas", name: "2º Crônicas" },
  { id: "esdras", name: "Esdras" },
  { id: "neemias", name: "Neemias" },
  { id: "ester", name: "Ester" },
  { id: "jo", name: "Jó" },
  { id: "salmos", name: "Salmos" },
  { id: "proverbios", name: "Provérbios" },
  { id: "eclesiastes", name: "Eclesiastes" },
  { id: "cantares", name: "Cantares" },
  { id: "isaias", name: "Isaías" },
  { id: "jeremias", name: "Jeremias" },
  { id: "lamentacoes", name: "Lamentações" },
  { id: "ezequiel", name: "Ezequiel" },
  { id: "daniel", name: "Daniel" },
  { id: "oseias", name: "Oséias" },
  { id: "joel", name: "Joel" },
  { id: "amos", name: "Amós" },
  { id: "obadias", name: "Obadias" },
  { id: "jonas", name: "Jonas" },
  { id: "miqueias", name: "Miquéias" },
  { id: "naum", name: "Naum" },
  { id: "habacuque", name: "Habacuque" },
  { id: "sofonias", name: "Sofonias" },
  { id: "ageu", name: "Ageu" },
  { id: "zacarias", name: "Zacarias" },
  { id: "malaquias", name: "Malaquias" },
  { id: "mateus", name: "Mateus" },
  { id: "marcos", name: "Marcos" },
  { id: "lucas", name: "Lucas" },
  { id: "joao", name: "João" },
  { id: "atos", name: "Atos" },
  { id: "romanos", name: "Romanos" },
  { id: "1corintios", name: "1ª Coríntios" },
  { id: "2corintios", name: "2ª Coríntios" },
  { id: "galatas", name: "Gálatas" },
  { id: "efesios", name: "Efésios" },
  { id: "filipenses", name: "Filipenses" },
  { id: "colossenses", name: "Colossenses" },
  { id: "1tessalonicenses", name: "1ª Tessalonicenses" },
  { id: "2tessalonicenses", name: "2ª Tessalonicenses" },
  { id: "1timoteo", name: "1ª Timóteo" },
  { id: "2timoteo", name: "2ª Timóteo" },
  { id: "tito", name: "Tito" },
  { id: "filemom", name: "Filemom" },
  { id: "hebreus", name: "Hebreus" },
  { id: "tiago", name: "Tiago" },
  { id: "1pedro", name: "1ª Pedro" },
  { id: "2pedro", name: "2ª Pedro" },
  { id: "1joao", name: "1ª João" },
  { id: "2joao", name: "2ª João" },
  { id: "3joao", name: "3ª João" },
  { id: "judas", name: "Judas" },
  { id: "apocalipse", name: "Apocalipse" },
];

const BibleSidebar = () => {
  const [selectedBook, setSelectedBook] = useState("genesis");

  return (
    <div className="w-64 md:w-72 h-full overflow-y-auto bg-black border-r border-gray-800 p-4">
      <h2 className="text-2xl font-bold text-gray-300 mb-4">LIVROS</h2>
      <ul className="space-y-2">
        {bibleBooks.map((book) => (
          <li key={book.id}>
            <Link
              to={`/biblia/${book.id}/1`}
              className={`block py-1.5 px-2 rounded transition ${
                selectedBook === book.id 
                  ? "text-white font-semibold" 
                  : "text-gray-400 hover:text-white"
              }`}
              onClick={() => setSelectedBook(book.id)}
            >
              {book.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BibleSidebar;
