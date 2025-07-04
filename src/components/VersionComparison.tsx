
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, Plus } from 'lucide-react';
import useBibleData from '@/hooks/useBibleData';

interface VersionComparisonProps {
  livro: string;
  capitulo: number;
  versiculo?: number;
}

const VersionComparison: React.FC<VersionComparisonProps> = ({ livro, capitulo, versiculo }) => {
  const [selectedVersions, setSelectedVersions] = useState<string[]>(['nvi']);
  const [versionData, setVersionData] = useState<Record<string, any>>({});
  const { loadChapter } = useBibleData();

  const availableVersions = [
    { value: 'nvi', label: 'NVI - Nova Versão Internacional' },
    { value: 'ara', label: 'ARA - Almeida Revista e Atualizada' },
    { value: 'arc', label: 'ARC - Almeida Revista e Corrigida' },
    { value: 'acf', label: 'ACF - Almeida Corrigida Fiel' },
    { value: 'naa', label: 'NAA - Nova Almeida Atualizada' },
    { value: 'ntlh', label: 'NTLH - Nova Tradução na Linguagem de Hoje' }
  ];

  const addVersion = async (version: string) => {
    if (!selectedVersions.includes(version)) {
      setSelectedVersions([...selectedVersions, version]);
      try {
        const data = await loadChapter(livro, capitulo, version);
        setVersionData(prev => ({ ...prev, [version]: data }));
      } catch (error) {
        console.error(`Erro ao carregar versão ${version}:`, error);
      }
    }
  };

  const removeVersion = (version: string) => {
    if (selectedVersions.length > 1) {
      setSelectedVersions(selectedVersions.filter(v => v !== version));
      setVersionData(prev => {
        const newData = { ...prev };
        delete newData[version];
        return newData;
      });
    }
  };

  const getVersionLabel = (version: string) => {
    return availableVersions.find(v => v.value === version)?.label || version.toUpperCase();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Select onValueChange={addVersion}>
          <SelectTrigger className="w-64">
            <SelectValue placeholder="Adicionar versão para comparar" />
          </SelectTrigger>
          <SelectContent>
            {availableVersions
              .filter(v => !selectedVersions.includes(v.value))
              .map(version => (
                <SelectItem key={version.value} value={version.value}>
                  {version.label}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {selectedVersions.map(version => (
          <Card key={version} className="relative">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center justify-between">
                <span>{getVersionLabel(version)}</span>
                {selectedVersions.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeVersion(version)}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              {versionData[version] ? (
                <div className="space-y-2">
                  {versiculo ? (
                    <p className="text-sm">
                      <span className="font-bold text-blue-600">{versiculo}</span>{' '}
                      {versionData[version].versiculos[versiculo]}
                    </p>
                  ) : (
                    Object.entries(versionData[version].versiculos || {}).map(([num, texto]) => (
                      <p key={num} className="text-sm mb-2">
                        <span className="font-bold text-blue-600">{num}</span> {String(texto)}
                      </p>
                    ))
                  )}
                </div>
              ) : (
                <div className="text-sm text-gray-500">Carregando...</div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default VersionComparison;
