import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';

const PASSWORD = 'padawan2026';

export default function PasswordGate({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState('');
  const { toast } = useToast();

  const handleSubmit = () => {
    if (password === PASSWORD) {
      setIsOpen(true);
      setPassword('');
    } else {
      toast({ title: 'Senha incorreta.', variant: 'destructive' });
      setPassword('');
    }
  };

  if (isOpen) {
    return (
      <div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-xs text-[#8FA897] hover:text-[#F3F6F1] mb-2"
        >
          ← Voltar
        </button>
        {children}
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-[#224030] bg-[#102A1E] p-5 md:p-6">
      <h2 className="font-heading text-lg font-semibold text-[#F3F6F1] mb-4">{title}</h2>
      <div className="flex gap-2">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          placeholder="Digite a senha"
          className="flex-1 bg-[#163524] border border-[#224030] text-[#F3F6F1] rounded-md px-3 py-2 font-mono text-sm outline-none focus:border-[#A8E063] transition-colors placeholder:text-[#5C7466]"
        />
        <button
          onClick={handleSubmit}
          className="font-mono text-sm font-semibold tracking-wide bg-[#A8E063] text-[#0A1F16] px-4 py-2 rounded-md hover:brightness-110 active:scale-[0.98] transition-all"
        >
          Acessar
        </button>
      </div>
    </div>
  );
}
