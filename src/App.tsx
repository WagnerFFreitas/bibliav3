
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import BibleVersions from "./pages/BibleVersions";
import BibleSearch from "./pages/BibleSearch";
import BibleReader from "./pages/BibleReader";
import Dictionary from "./pages/Dictionary";
import NotFound from "./pages/NotFound";
import Utilities from "./pages/Utilities";
import MusicPage from "./pages/MusicPage";
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
          <Route path="/" element={<Index />} />
          <Route path="/versoes" element={<BibleVersions />} />
          <Route path="/pesquisar" element={<BibleSearch />} />
          <Route path="/biblia/:livro/:capitulo" element={<BibleReader />} />
          <Route path="/dicionario" element={<Dictionary />} />
          <Route path="/utilitarios" element={<Utilities />} />
          <Route path="/harpa" element={<MusicPage />} />
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
