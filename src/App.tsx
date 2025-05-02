
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import BibleVersions from "./pages/BibleVersions";
import BibleSearch from "./pages/BibleSearch";
import BibleReader from "./pages/BibleReader";
import BibleSlide from "./pages/BibleSlide";
import Dictionary from "./pages/Dictionary";
import NotFound from "./pages/NotFound";
import Utilities from "./pages/Utilities";
import MusicPage from "./pages/MusicPage";
import HinarioPage from "./pages/HinarioPage";
import HymnsPage from "./pages/HymnsPage";
import HymnSlide from "./pages/HymnSlide";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Downloads from "./pages/Downloads";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/versoes" replace />} />
          <Route path="/versoes" element={<BibleVersions />} />
          <Route path="/pesquisar" element={<BibleSearch />} />
          <Route path="/biblia/:livro/:capitulo" element={<BibleReader />} />
          <Route path="/slide/:livro/:capitulo" element={<BibleSlide />} />
          <Route path="/slide-hino/:tipo/:numero" element={<HymnSlide />} />
          <Route path="/dicionario" element={<Dictionary />} />
          <Route path="/utilitarios" element={<Utilities />} />
          <Route path="/harpa-hinario" element={<HymnsPage />} />
          <Route path="/harpa" element={<MusicPage />} />
          <Route path="/hinario" element={<HinarioPage />} />
          <Route path="/contato" element={<Contact />} />
          <Route path="/sobre" element={<About />} />
          <Route path="/baixar" element={<Downloads />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
