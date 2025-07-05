import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { BibleProvider } from "@/contexts/BibleContext";
import { AuthProvider } from "@/contexts/AuthContext";
import ErrorBoundary from "@/components/ErrorBoundary";
import AccessibilityAssistant from "@/components/AccessibilityAssistant";

import VersoesBiblia from "./pages/VersoesBiblia";
import PesquisaBiblia from "./pages/PesquisaBiblia";
import LeitorBiblia from "./pages/LeitorBiblia";
import BibleSlide from "./pages/BibleSlide";
import BibleReading from "./pages/BibleReading";
import Dictionary from "./pages/Dictionary";
import NotFound from "./pages/NotFound";
import Utilities from "./pages/Utilities";
import MusicPage from "./pages/MusicPage";
import HinarioPage from "./pages/HinarioPage";
import HymnsPage from "./pages/HymnsPage";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Downloads from "./pages/Downloads";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <BibleProvider>
          <ErrorBoundary>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Navigate to="/versoes" replace />} />
                <Route path="/versoes" element={<VersoesBiblia />} />
                <Route path="/pesquisar" element={<PesquisaBiblia />} />
                <Route path="/biblia/:livro/:capitulo" element={<LeitorBiblia />} />
                <Route path="/slide/:livro/:capitulo" element={<BibleSlide />} />
                <Route path="/leitura/:livro/:capitulo" element={<BibleReading />} />
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
              <AccessibilityAssistant />
            </BrowserRouter>
          </ErrorBoundary>
        </BibleProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
