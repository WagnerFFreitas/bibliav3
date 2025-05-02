
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Book, Search } from "lucide-react";
import ScrollToTop from "@/components/ScrollToTop";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Dictionary = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("both");
  
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Cabeçalho */}
      <header className="w-full p-4 bg-black border-b border-gray-800">
        <div className="container mx-auto flex flex-col md:flex-row gap-4 justify-between items-center">
          <Link to="/" className="text-3xl font-bold italic text-gray-300 hover:text-white transition">
            Bíblia Sagrada
          </Link>
          
          <div className="flex w-full md:w-auto items-center gap-2">
            <Button variant="outline" className="rounded-md text-sm bg-zinc-900 border-zinc-700 text-gray-300">
              Todos
            </Button>
            <Input
              type="text"
              placeholder="Digite o termo de busca"
              className="w-full md:w-80 bg-zinc-900 border-zinc-700 text-gray-300 placeholder:text-gray-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button className="rounded-md bg-green-600 hover:bg-green-700 text-white">
              Buscar
            </Button>
          </div>
        </div>
        
        {/* Menu de navegação */}
        <nav className="container mx-auto mt-4">
          <div className="flex overflow-x-auto py-2 gap-6 text-gray-400">
            <Link to="/" className="whitespace-nowrap hover:text-white transition">Slide</Link>
            <Link to="/versoes" className="whitespace-nowrap hover:text-white transition">Versões</Link>
            <Link to="/dicionario" className="whitespace-nowrap hover:text-white transition">Dicionário e Concordância</Link>
            <Link to="/harpa" className="whitespace-nowrap hover:text-white transition">Harpa e Hinário</Link>
            <Link to="/baixar" className="whitespace-nowrap hover:text-white transition">Baixar</Link>
            <Link to="/utilitarios" className="whitespace-nowrap hover:text-white transition">Utilidades</Link>
            <Link to="/contato" className="whitespace-nowrap hover:text-white transition">Contato</Link>
            <Link to="/sobre" className="whitespace-nowrap hover:text-white transition">Sobre</Link>
          </div>
        </nav>
      </header>
      
      <main className="flex-1 p-6 bg-[url('/lovable-uploads/a3e3f70f-582b-454b-9228-04d688e5e083.png')] bg-cover bg-center bg-fixed">
        <div className="container mx-auto max-w-5xl bg-black/70 p-6 rounded-lg">
          <h1 className="text-3xl font-bold mb-6">Dicionário e Concordância Bíblica</h1>
          
          <Tabs defaultValue="dictionary" className="mb-8">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="dictionary">Dicionário Bíblico</TabsTrigger>
              <TabsTrigger value="concordance">Concordância Bíblica</TabsTrigger>
            </TabsList>
            
            <div className="mb-6 flex flex-col md:flex-row gap-4 items-center">
              <div className="w-full md:flex-1">
                <Input
                  type="text"
                  placeholder="Buscar termo..."
                  className="w-full bg-zinc-900 border-zinc-700"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="w-full md:w-64">
                <Select
                  value={searchType}
                  onValueChange={setSearchType}
                >
                  <SelectTrigger className="bg-zinc-900 border-zinc-700">
                    <SelectValue placeholder="Buscar em..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dictionary">Somente no Dicionário</SelectItem>
                    <SelectItem value="concordance">Somente na Concordância</SelectItem>
                    <SelectItem value="both">Em Ambos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button className="w-full md:w-auto bg-indigo-700 hover:bg-indigo-600">
                <Search className="mr-2 h-4 w-4" />
                Buscar
              </Button>
            </div>
            
            <TabsContent value="dictionary">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {Array.from({ length: 26 }, (_, i) => (
                  <Button
                    key={i}
                    variant="outline"
                    className="bg-indigo-900/80 hover:bg-indigo-800 border-indigo-700 text-white"
                  >
                    {String.fromCharCode(65 + i)}
                  </Button>
                ))}
              </div>
              
              <div className="space-y-6">
                <div className="p-4 border border-gray-800 rounded-lg bg-black/50">
                  <h2 className="text-xl font-bold mb-2 text-indigo-300">Aarão</h2>
                  <p className="text-gray-300">
                    Irmão mais velho de Moisés, primeiro sumo sacerdote de Israel. Sua linha familiar continuou no sacerdócio até o fim do período do Antigo Testamento.
                  </p>
                  <div className="mt-2 text-sm">
                    <span className="text-indigo-300 font-semibold">Referências:</span> Êxodo 4:14, Levítico 8:1-36
                  </div>
                </div>
                
                <div className="p-4 border border-gray-800 rounded-lg bg-black/50">
                  <h2 className="text-xl font-bold mb-2 text-indigo-300">Abel</h2>
                  <p className="text-gray-300">
                    Segundo filho de Adão e Eva. Foi morto por seu irmão Caim por inveja depois que Deus aceitou sua oferta e rejeitou a de Caim.
                  </p>
                  <div className="mt-2 text-sm">
                    <span className="text-indigo-300 font-semibold">Referências:</span> Gênesis 4:1-16, Hebreus 11:4
                  </div>
                </div>
                
                <div className="p-4 border border-gray-800 rounded-lg bg-black/50">
                  <h2 className="text-xl font-bold mb-2 text-indigo-300">Abimelec</h2>
                  <p className="text-gray-300">
                    Título comum dado aos reis filisteus. Aparece em conexão com Abraão e Isaque.
                  </p>
                  <div className="mt-2 text-sm">
                    <span className="text-indigo-300 font-semibold">Referências:</span> Gênesis 20:1-18, 26:1-33
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="concordance">
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-indigo-300">Concordância Bíblica</h2>
                <p className="text-gray-300 mb-4">
                  A concordância permite que você encontre todas as ocorrências de um termo específico na Bíblia.
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="p-4 border border-gray-800 rounded-lg bg-black/50">
                  <h2 className="text-xl font-bold mb-2 text-indigo-300">Amor</h2>
                  <p className="text-gray-300 mb-2">
                    Encontrado em 308 versículos na Bíblia.
                  </p>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-300">
                      <span className="text-indigo-300 font-semibold">João 3:16</span> - "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito..."
                    </p>
                    <p className="text-sm text-gray-300">
                      <span className="text-indigo-300 font-semibold">1 Coríntios 13:13</span> - "Agora, pois, permanecem a fé, a esperança e o amor, estes três; porém o maior destes é o amor."
                    </p>
                    <p className="text-sm text-gray-300">
                      <span className="text-indigo-300 font-semibold">1 João 4:8</span> - "Aquele que não ama não conhece a Deus, porque Deus é amor."
                    </p>
                    <Button className="mt-2 text-xs bg-indigo-700 hover:bg-indigo-600">
                      Ver mais ocorrências
                    </Button>
                  </div>
                </div>
                
                <div className="p-4 border border-gray-800 rounded-lg bg-black/50">
                  <h2 className="text-xl font-bold mb-2 text-indigo-300">Fé</h2>
                  <p className="text-gray-300 mb-2">
                    Encontrado em 247 versículos na Bíblia.
                  </p>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-300">
                      <span className="text-indigo-300 font-semibold">Hebreus 11:1</span> - "Ora, a fé é a certeza daquilo que esperamos e a prova das coisas que não vemos."
                    </p>
                    <p className="text-sm text-gray-300">
                      <span className="text-indigo-300 font-semibold">Romanos 10:17</span> - "A fé vem pelo ouvir, e o ouvir pela palavra de Cristo."
                    </p>
                    <Button className="mt-2 text-xs bg-indigo-700 hover:bg-indigo-600">
                      Ver mais ocorrências
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <footer className="bg-black p-4 border-t border-gray-800">
        <div className="container mx-auto text-center text-sm text-gray-400">
          © Bíblia Sagrada 2024
        </div>
      </footer>
      
      <ScrollToTop />
    </div>
  );
};

export default Dictionary;
