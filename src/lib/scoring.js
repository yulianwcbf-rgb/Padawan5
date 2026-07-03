export function fmtBRL(val) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val || 0);
}

export function fmtDateBR(dateStr) {
  if (!dateStr) return '';
  const [y, m, d] = dateStr.split('-');
  return `${d}/${m}/${y}`;
}

export function fmtMonthBR(ym) {
  if (!ym || ym.length < 7) return ym;
  const [y, m] = ym.split('-');
  const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  return `${months[parseInt(m) - 1]} ${y}`;
}

export function fmtPts(pts) {
  return Math.round(pts || 0).toLocaleString('pt-BR');
}

export function todayMondayISO() {
  const today = new Date();
  const day = today.getDay();
  const diff = today.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(today.setDate(diff));
  const year = monday.getFullYear();
  const month = String(monday.getMonth() + 1).padStart(2, '0');
  const date = String(monday.getDate()).padStart(2, '0');
  return `${year}-${month}-${date}`;
}

export function calcPoints(entry) {
  const breakdown = [];
  let total = 0;

  // R1: +1 pt cada, acima de 15 ×1,8
  const r1Pts = (entry.r1 || 0) * 1;
  const r1Total = (entry.r1 || 0) > 15 ? r1Pts * 1.8 : r1Pts;
  if (entry.r1 > 0) {
    breakdown.push({ label: `R1 (${entry.r1}×)`, pts: r1Total });
    total += r1Total;
  }

  // R2: +2 pts cada
  const r2Pts = (entry.r2 || 0) * 2;
  if (entry.r2 > 0) {
    breakdown.push({ label: `R2 (${entry.r2}×)`, pts: r2Pts });
    total += r2Pts;
  }

  // IP/AP: +3 pts cada
  const ipPts = (entry.reuniao_ip || 0) * 3;
  const apPts = (entry.reuniao_ap || 0) * 3;
  const ipApTotal = ipPts + apPts;
  if (ipApTotal > 0) {
    breakdown.push({ label: `Reuniões IP/AP (${(entry.reuniao_ip || 0) + (entry.reuniao_ap || 0)}×)`, pts: ipApTotal });
    total += ipApTotal;
  }

  // Captação: +10 pts a cada R$ 200k
  const captacaoPts = Math.floor((entry.captacao || 0) / 200000) * 10;
  if (captacaoPts > 0) {
    breakdown.push({ label: `Captação (${fmtBRL(entry.captacao)})`, pts: captacaoPts });
    total += captacaoPts;
  }

  // Consórcio: +2 pts a cada R$ 100k
  const consorcioPts = Math.floor((entry.consorcio || 0) / 100000) * 2;
  if (consorcioPts > 0) {
    breakdown.push({ label: `Consórcio (${fmtBRL(entry.consorcio)})`, pts: consorcioPts });
    total += consorcioPts;
  }

  // PA: +2 pts a cada R$ 10k
  const paPts = Math.floor((entry.pa || 0) / 10000) * 2;
  if (paPts > 0) {
    breakdown.push({ label: `PA (${fmtBRL(entry.pa)})`, pts: paPts });
    total += paPts;
  }

  // Recomendações: +5 pts cada, >20 ×1,6, ≤5 → -10
  let recPts = 0;
  if ((entry.recomendacoes || 0) <= 5 && entry.recomendacoes > 0) {
    recPts = -10;
    breakdown.push({ label: `Recomendações ≤5`, pts: recPts });
  } else if (entry.recomendacoes > 0) {
    recPts = (entry.recomendacoes || 0) * 5;
    if (entry.recomendacoes > 20) recPts *= 1.6;
    breakdown.push({ label: `Recomendações (${entry.recomendacoes}×)`, pts: recPts });
  }
  total += recPts;

  // Reuniões: ≤5 na semana → -10
  const totalReunioesCount = (entry.r1 || 0) + (entry.r2 || 0) + (entry.reuniao_ip || 0) + (entry.reuniao_ap || 0);
  if (totalReunioesCount > 0 && totalReunioesCount <= 5) {
    breakdown.push({ label: 'Reuniões ≤5', pts: -10 });
    total -= 10;
  }

  // Receita Escritório: +5 pts preenchido, -5 pts vazio
  if (entry.receita_escritorio && entry.receita_escritorio > 0) {
    breakdown.push({ label: 'Receita Escritório preenchida', pts: 5 });
    total += 5;
  } else if (entry.receita_escritorio === 0 || !entry.receita_escritorio) {
    // Só marca -5 se explicitamente vazio e o formulário foi preenchido
    if (entry.r1 > 0 || entry.r2 > 0) {
      breakdown.push({ label: 'Receita Escritório vazia', pts: -5 });
      total -= 5;
    }
  }

  return { total: Math.round(total * 100) / 100, breakdown };
}