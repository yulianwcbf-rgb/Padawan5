import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import AnimatedBackground from '@/components/padawan/AnimatedBackground';
import LancamentoTab from '@/components/padawan/LancamentoTab';
import AnaliseTab from '@/components/padawan/AnaliseTab';
import EquipeTab from '@/components/padawan/EquipeTab';
import HistoricoTab from '@/components/padawan/HistoricoTab';
import RankingTab from '@/components/padawan/RankingTab';
import RegrasTab from '@/components/padawan/RegrasTab';

export default function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSaved = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="relative min-h-screen bg-[#0A1F16] text-[#F3F6F1]">
      <AnimatedBackground />
      <div className="relative z-10">
        <div className="mx-auto max-w-7xl px-4 py-6 md:py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-[#F3F6F1] mb-1">Mesa Padawan</h1>
            <p className="text-sm text-[#8FA897]">Sistema de pontuação e análise de desempenho</p>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="lancamento" className="w-full">
            <TabsList className="grid w-full grid-cols-6 bg-[#102A1E] border border-[#224030] p-1">
              <TabsTrigger value="lancamento" className="data-[state=active]:bg-[#163524] data-[state=active]:text-[#A8E063]">Lançamento</TabsTrigger>
              <TabsTrigger value="analise" className="data-[state=active]:bg-[#163524] data-[state=active]:text-[#A8E063]">Análise</TabsTrigger>
              <TabsTrigger value="equipe" className="data-[state=active]:bg-[#163524] data-[state=active]:text-[#A8E063]">Equipe</TabsTrigger>
              <TabsTrigger value="ranking" className="data-[state=active]:bg-[#163524] data-[state=active]:text-[#A8E063]">Ranking</TabsTrigger>
              <TabsTrigger value="historico" className="data-[state=active]:bg-[#163524] data-[state=active]:text-[#A8E063]">Histórico</TabsTrigger>
              <TabsTrigger value="regras" className="data-[state=active]:bg-[#163524] data-[state=active]:text-[#A8E063]">Regras</TabsTrigger>
            </TabsList>

            <div className="mt-6">
              <TabsContent value="lancamento">
                <LancamentoTab onSaved={handleSaved} />
              </TabsContent>
              <TabsContent value="analise">
                <AnaliseTab refreshKey={refreshKey} />
              </TabsContent>
              <TabsContent value="equipe">
                <EquipeTab />
              </TabsContent>
              <TabsContent value="ranking">
                <RankingTab />
              </TabsContent>
              <TabsContent value="historico">
                <HistoricoTab refreshKey={refreshKey} />
              </TabsContent>
              <TabsContent value="regras">
                <RegrasTab />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes floatOrb {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(30px, -30px); }
        }
        @keyframes floatOrb2 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-40px, 40px); }
        }
        @keyframes floatOrb3 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(20px, 20px); }
        }
      `}</style>
    </div>
  );
}
