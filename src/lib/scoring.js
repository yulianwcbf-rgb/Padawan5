export function calcPoints(entry) {
  let total = 0;
  const breakdown = [];

  // Captação: +10 pts a cada R$ 200k
  if (entry.captacao > 0) {
    const captacaoPts = Math.floor(entry.captacao / 200000) * 10;
    total += captacaoPts;
    breakdown.push({ label: 'Captação', pts: captacaoPts });
  }

  // R1: +1 pt cada, acima de 15 ×1,8
  let r1Pts = (entry.r1 || 0);
  if (r1Pts > 15) r1Pts = Math.floor(r1Pts * 1.8);
  total += r1Pts;
  if (r1Pts > 0) breakdown.push({ label: 'R1', pts: r1Pts });

  // R2: +2 pts cada
  const r2Pts = (entry.r2 || 0) * 2;
  total += r2Pts;
  if (r2Pts > 0) breakdown.push({ label: 'R2', pts: r2Pts });

  // IP/AP: +3 pts cada
  const ipapPts = ((entry.reuniao_ip || 0) + (entry.reuniao_ap || 0)) * 3;
  total += ipapPts;
  if (ipapPts > 0) breakdown.push({ label: 'IP/AP', pts: ipapPts });

  // Consórcio: +2 pts a cada R$ 100k
  if (entry.consorcio > 0) {
    const consorcioPts = Math.floor(entry.consorcio / 100000) * 2;
    total += consorcioPts;
    breakdown.push({ label: 'Consórcio', pts: consorcioPts });
  }

  // PA: +2 pts a cada R$ 10k
  if (entry.pa > 0) {
    const paPts = Math.floor(entry.pa / 10000) * 2;
    total += paPts;
    breakdown.push({ label: 'PA', pts: paPts });
  }

  // Recomendações: +5 pts cada, >20 ×1,6, ≤5 → -10
  let recPts = (entry.recomendacoes || 0) * 5;
  if (entry.recomendacoes > 20) {
    recPts = Math.floor(recPts * 1.6);
  } else if (entry.recomendacoes <= 5 && entry.recomendacoes > 0) {
    recPts = -10;
  }
  total += recPts;
  if (recPts !== 0) breakdown.push({ label: 'Recomendações', pts: recPts });

  // Reuniões agendadas/realizadas: -10 se ≤5
  const totalReunioes = (entry.r1 || 0) + (entry.r2 || 0) + (entry.reuniao_ip || 0) + (entry.reuniao_ap || 0);
  if (totalReunioes <= 5 && totalReunioes > 0) {
    total -= 10;
    breakdown.push({ label: 'Penalidade Reuniões', pts: -10 });
  }

  // Receita Escritório: +5 se preenchido, -5 se vazio
  if (entry.receita_escritorio && entry.receita_escritorio > 0) {
    total += 5;
    breakdown.push({ label: 'Receita Escritório', pts: 5 });
  } else if (entry.receita_escritorio === 0 || !entry.receita_escritorio) {
    total -= 5;
    breakdown.push({ label: 'Penalidade Receita', pts: -5 });
  }

  return { total, breakdown };
}

export function fmtBRL(val) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
  }).format(val || 0);
}

export function fmtPts(val) {
  return `${Math.floor(val || 0)} pts`;
}

export function fmtDateBR(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('pt-BR');
}

export function fmtMonthBR(ym) {
  if (!ym) return '';
  const [year, month] = ym.split('-');
  const date = new Date(parseInt(year), parseInt(month) - 1, 1);
  return date.toLocaleDateString('pt-BR', { year: 'numeric', month: 'long' });
}

export function todayMondayISO() {
  const today = new Date();
  const day = today.getDay();
  const diff = today.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(today.setDate(diff));
  return monday.toISOString().split('T')[0];
}