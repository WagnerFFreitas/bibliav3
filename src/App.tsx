
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import Index from "./pages/Index";
import BibleReader from "./pages/BibleReader";
import BibleSearch from "./pages/BibleSearch";
import BibleVersions from "./pages/BibleVersions";
import Dictionary from "./pages/Dictionary";
import HinarioPage from "./pages/HinarioPage";
import HymnsPage from "./pages/HymnsPage";
import MusicPage from "./pages/MusicPage";
import Downloads from "./pages/Downloads";
import Utilities from "./pages/Utilities";
import Contact from "./pages/Contact";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import BibleSlide from "./pages/BibleSlide";

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/biblia/:livro/:capitulo" element={<BibleReader />} />
        <Route path="/pesquisar" element={<BibleSearch />} />
        <Route path="/versoes" element={<BibleVersions />} />
        <Route path="/dicionario" element={<Dictionary />} />
        <Route path="/harpa" element={<HinarioPage />} />
        <Route path="/hinario" element={<HymnsPage />} />
        <Route path="/musica" element={<MusicPage />} />
        <Route path="/baixar" element={<Downloads />} />
        <Route path="/utilitarios" element={<Utilities />} />
        <Route path="/contato" element={<Contact />} />
        <Route path="/sobre" element={<About />} />
        
        {/* Nova rota para o modo de apresentação de slides */}
        <Route path="/slide/:livro/:capitulo" element={<BibleSlide />} />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
