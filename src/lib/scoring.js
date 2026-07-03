export function fmtBRL(value) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}

export function fmtDateBR(dateStr) {
  if (!dateStr) return '';
  const [year, month, day] = dateStr.split('-');
  return `${day}/${month}/${year}`;
}

export function fmtMonthBR(ym) {
  const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  const [year, month] = ym.split('-');
  return `${months[parseInt(month) - 1]} ${year}`;
}

export function fmtPts(value) {
  return Math.round(value).toString();
}

export function todayMondayISO() {
  const today = new Date();
  const day = today.getDay();
  const diff = today.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(today.setDate(diff));
  return monday.toISOString().split('T')[0];
}

export function calcPoints(entry) {
  const breakdown = [];
  let total = 0;

  // R1: +1 pt each, >15 multiplied by 1.8
  const r1Pts = (entry.r1 || 0) * 1 * (entry.r1 > 15 ? 1.8 : 1);
  breakdown.push({ label: 'R1', pts: r1Pts });
  total += r1Pts;

  // R2: +2 pts each
  const r2Pts = (entry.r2 || 0) * 2;
  breakdown.push({ label: 'R2', pts: r2Pts });
  total += r2Pts;

  // IP/AP: +3 pts each
  const ipapPts = ((entry.reuniao_ip || 0) + (entry.reuniao_ap || 0)) * 3;
  breakdown.push({ label: 'IP/AP', pts: ipapPts });
  total += ipapPts;

  // Captação: +10 pts per R$ 200k
  const captacaoPts = Math.floor((entry.captacao || 0) / 200000) * 10;
  breakdown.push({ label: 'Captação', pts: captacaoPts });
  total += captacaoPts;

  // Consórcio: +2 pts per R$ 100k
  const consorcioPts = Math.floor((entry.consorcio || 0) / 100000) * 2;
  breakdown.push({ label: 'Consórcio', pts: consorcioPts });
  total += consorcioPts;

  // PA: +2 pts per R$ 10k
  const paPts = Math.floor((entry.pa || 0) / 10000) * 2;
  breakdown.push({ label: 'PA', pts: paPts });
  total += paPts;

  // Recomendações: +5 pts each, >20 multiplied by 1.6, ≤5 is -10
  let recomPts = 0;
  if ((entry.recomendacoes || 0) <= 5) {
    recomPts = -10;
  } else {
    recomPts = (entry.recomendacoes || 0) * 5 * ((entry.recomendacoes || 0) > 20 ? 1.6 : 1);
  }
  breakdown.push({ label: 'Recomendações', pts: recomPts });
  total += recomPts;

  // Receita Escritório: +5 if filled, -5 if empty
  const receitaPts = (entry.receita_escritorio || 0) > 0 ? 5 : -5;
  breakdown.push({ label: 'Receita', pts: receitaPts });
  total += receitaPts;

  // Reuniões ≤ 5 is -10
  const totalReunions = (entry.r1 || 0) + (entry.r2 || 0) + (entry.reuniao_ip || 0) + (entry.reuniao_ap || 0);
  if (totalReunions <= 5) {
    breakdown.push({ label: 'Punição reuniões', pts: -10 });
    total -= 10;
  }

  return { total, breakdown };
}
