
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error Boundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  handleGoHome = () => {
    window.location.href = '/versoes';
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
          <div className="max-w-md w-full">
            <Alert variant="destructive" className="bg-red-900/60 border-red-800">
              <AlertTitle className="text-red-200">Oops! Algo deu errado</AlertTitle>
              <AlertDescription className="text-red-300 mt-2">
                {this.state.error?.message || 'Ocorreu um erro inesperado. Por favor, tente novamente.'}
              </AlertDescription>
            </Alert>
            
            <div className="flex gap-3 mt-4">
              <Button 
                onClick={this.handleReset}
                variant="outline"
                className="flex-1 bg-gray-800 border-gray-600 hover:bg-gray-700"
              >
                <RefreshCw size={16} className="mr-2" />
                Tentar Novamente
              </Button>
              
              <Button 
                onClick={this.handleGoHome}
                variant="outline"
                className="flex-1 bg-indigo-900 border-indigo-700 hover:bg-indigo-800"
              >
                <Home size={16} className="mr-2" />
                Início
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
