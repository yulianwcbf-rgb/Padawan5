export function calcPoints(entry) {
  let total = 0;
  const breakdown = [];

  // R1 points
  let r1Points = (entry.r1 || 0) * 1;
  if ((entry.r1 || 0) > 15) r1Points *= 1.8;
  total += r1Points;
  if (r1Points > 0) breakdown.push({ label: 'R1', pts: r1Points });

  // R2 points
  const r2Points = (entry.r2 || 0) * 2;
  total += r2Points;
  if (r2Points > 0) breakdown.push({ label: 'R2', pts: r2Points });

  // IP/AP reuniões
  const ipapPoints = ((entry.reuniao_ip || 0) + (entry.reuniao_ap || 0)) * 3;
  total += ipapPoints;
  if (ipapPoints > 0) breakdown.push({ label: 'IP/AP', pts: ipapPoints });

  // Captação points
  const captacaoPoints = Math.floor((entry.captacao || 0) / 200000) * 10;
  total += captacaoPoints;
  if (captacaoPoints > 0) breakdown.push({ label: 'Captação', pts: captacaoPoints });

  // Consórcio points
  const consorcioPoints = Math.floor((entry.consorcio || 0) / 100000) * 2;
  total += consorcioPoints;
  if (consorcioPoints > 0) breakdown.push({ label: 'Consórcio', pts: consorcioPoints });

  // PA points
  const paPoints = Math.floor((entry.pa || 0) / 10000) * 2;
  total += paPoints;
  if (paPoints > 0) breakdown.push({ label: 'PA', pts: paPoints });

  // Recomendações
  let recomPoints = (entry.recomendacoes || 0) * 5;
  if ((entry.recomendacoes || 0) > 20) recomPoints *= 1.6;
  if ((entry.recomendacoes || 0) <= 5 && (entry.recomendacoes || 0) > 0) recomPoints = -10;
  total += recomPoints;
  if (recomPoints !== 0) breakdown.push({ label: 'Recomendações', pts: recomPoints });

  // Reuniões penalty
  const totalReuniao = (entry.r1 || 0) + (entry.r2 || 0) + (entry.reuniao_ip || 0) + (entry.reuniao_ap || 0);
  if (totalReuniao <= 5 && totalReuniao > 0) {
    total -= 10;
    breakdown.push({ label: 'Penalidade reunião', pts: -10 });
  }

  // Receita Escritório
  if ((entry.receita_escritorio || 0) > 0) {
    total += 5;
    breakdown.push({ label: 'Receita Escritório', pts: 5 });
  } else {
    total -= 5;
    breakdown.push({ label: 'Sem Receita Escritório', pts: -5 });
  }

  return { total, breakdown };
}

export function fmtBRL(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value || 0);
}

export function fmtPts(value) {
  return (value || 0).toFixed(1);
}

export function fmtDateBR(date) {
  if (!date) return '';
  return new Date(date).toLocaleDateString('pt-BR');
}

export function fmtMonthBR(ym) {
  if (!ym) return '';
  const [year, month] = ym.split('-');
  const date = new Date(year, parseInt(month) - 1);
  return date.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
}

export function todayMondayISO() {
  const today = new Date();
  const day = today.getDay();
  const diff = today.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(today.setDate(diff));
  return monday.toISOString().split('T')[0];
}