import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';

const PASSWORD = 'lider2026'; // Change this in production

export default function PasswordGate({ children, title }) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [password, setPassword] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === PASSWORD) {
      setIsUnlocked(true);
      setPassword('');
    } else {
      toast({ title: 'Senha incorreta.', variant: 'destructive' });
      setPassword('');
    }
  };

  if (isUnlocked) {
    return children;
  }

  return (
    <div className="rounded-xl border border-[#224030] bg-[#102A1E] p-5 md:p-6">
      <h2 className="font-heading text-lg font-semibold text-[#F3F6F1] mb-4">{title}</h2>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Digite a senha"
          className="flex-1 bg-[#163524] border border-[#224030] text-[#F3F6F1] rounded-md px-3 py-2 font-mono text-sm outline-none focus:border-[#A8E063] transition-colors placeholder:text-[#5C7466]"
        />
        <button
          type="submit"
          className="font-mono text-sm font-semibold tracking-wide bg-[#A8E063] text-[#0A1F16] px-4 py-2 rounded-md hover:brightness-110 active:scale-[0.98] transition-all"
        >
          Acessar
        </button>
      </form>
    </div>
  );
}