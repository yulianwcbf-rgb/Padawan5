import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';

const MASTER_PASSWORD = 'padawan2024';

export default function PasswordGate({ children, title = 'Acesso Restrito' }) {
  const [password, setPassword] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const { toast } = useToast();

  const handleUnlock = () => {
    if (password === MASTER_PASSWORD) {
      setUnlocked(true);
      setPassword('');
    } else {
      toast({ title: 'Senha incorreta.', variant: 'destructive' });
      setPassword('');
    }
  };

  if (unlocked) {
    return <>{children}</>;
  }

  return (
    <div className="rounded-xl border border-[#224030] bg-[#102A1E] p-8 text-center">
      <h2 className="font-heading text-lg font-semibold text-[#F3F6F1] mb-4">{title}</h2>
      <p className="text-sm text-[#8FA897] mb-6">Esta seção requer autenticação.</p>
      <div className="flex gap-2 max-w-xs mx-auto">
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleUnlock()}
          placeholder="Digite a senha"
          className="flex-1 bg-[#163524] border border-[#224030] text-[#F3F6F1] rounded-md px-3 py-2 font-mono text-sm outline-none focus:border-[#A8E063] transition-colors placeholder:text-[#5C7466]"
        />
        <button
          onClick={handleUnlock}
          className="font-mono text-sm font-semibold tracking-wide bg-[#A8E063] text-[#0A1F16] px-4 py-2 rounded-md hover:brightness-110 active:scale-[0.98] transition-all"
        >
          Entrar
        </button>
      </div>
    </div>
  );
}
