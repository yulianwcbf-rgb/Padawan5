export function fmtBRL(val) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val || 0);
}

export function fmtPts(val) {
  return Math.round(val || 0);
}

export function fmtDateBR(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('pt-BR');
}

export function fmtMonthBR(ym) {
  if (!ym) return '';
  const [year, month] = ym.split('-');
  const date = new Date(year, parseInt(month) - 1, 1);
  return date.toLocaleDateString('pt-BR', { year: 'numeric', month: 'long' }).replace(/\b\w/g, l => l.toUpperCase());
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

  // Captação: +10 pts per R$ 200k
  if (entry.captacao) {
    const pts = Math.floor((entry.captacao || 0) / 200000) * 10;
    if (pts > 0) { breakdown.push({ label: 'Captação', pts }); total += pts; }
  }

  // R1: +1 pt each, ×1.8 if > 15
  if (entry.r1 > 0) {
    let pts = entry.r1 * 1;
    if (entry.r1 > 15) pts = Math.floor(pts * 1.8);
    breakdown.push({ label: `R1 (${entry.r1})`, pts });
    total += pts;
  }

  // R2: +2 pts each
  if (entry.r2 > 0) {
    const pts = entry.r2 * 2;
    breakdown.push({ label: `R2 (${entry.r2})`, pts });
    total += pts;
  }

  // IP/AP: +3 pts each
  const ipap = (entry.reuniao_ip || 0) + (entry.reuniao_ap || 0);
  if (ipap > 0) {
    const pts = ipap * 3;
    breakdown.push({ label: `IP/AP (${ipap})`, pts });
    total += pts;
  }

  // Consórcio: +2 pts per R$ 100k
  if (entry.consorcio) {
    const pts = Math.floor((entry.consorcio || 0) / 100000) * 2;
    if (pts > 0) { breakdown.push({ label: 'Consórcio', pts }); total += pts; }
  }

  // PA: +2 pts per R$ 10k
  if (entry.pa) {
    const pts = Math.floor((entry.pa || 0) / 10000) * 2;
    if (pts > 0) { breakdown.push({ label: 'PA', pts }); total += pts; }
  }

  // Recomendações: +5 pts each, ×1.6 if > 20, -10 if ≤ 5
  if ((entry.recomendacoes || 0) > 0) {
    let pts = entry.recomendacoes * 5;
    if (entry.recomendacoes > 20) pts = Math.floor(pts * 1.6);
    breakdown.push({ label: `Recomendações (${entry.recomendacoes})`, pts });
    total += pts;
  } else if ((entry.recomendacoes || 0) === 0 && entry.recomendacoes !== undefined) {
    const pts = -10;
    breakdown.push({ label: 'Recomendações (0)', pts });
    total += pts;
  }

  // Reuniões: -10 if total ≤ 5
  const totalReunoes = (entry.r1 || 0) + (entry.r2 || 0) + (entry.reuniao_ip || 0) + (entry.reuniao_ap || 0);
  if (totalReunoes > 0 && totalReunoes <= 5) {
    const pts = -10;
    breakdown.push({ label: 'Reuniões (≤5)', pts });
    total += pts;
  }

  // Receita Escritório: +5 if filled, -5 if empty
  if ((entry.receita_escritorio || 0) > 0) {
    const pts = 5;
    breakdown.push({ label: 'Receita Escritório', pts });
    total += pts;
  } else if (entry.receita_escritorio === 0 && entry.receita_escritorio !== undefined) {
    const pts = -5;
    breakdown.push({ label: 'Receita Escritório (vazio)', pts });
    total += pts;
  }

  return { total, breakdown };
}
