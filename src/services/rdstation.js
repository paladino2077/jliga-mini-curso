// ===== RD Station CRM Integration =====
// Pipeline: Funil de Indicações/Formulário - jliga

const TOKEN = '6863e5587bc2d9001d3e53cf';
// Path relativo proxied pelo Vite no dev (vite.config.js) e pelo hosting em prod.
// Evita CORS — a API do CRM da RD Station não aceita chamadas direto do browser.
const BASE = '/rd-api';

export const PIPELINE_ID = '697b544bfbf60b001ca19702';

export const STAGES = {
  CADASTRO_RECEBIDO: '697b544bfbf60b001ca19704',
  CONTATO_10MIN:     '697b544bfbf60b001ca19705',
  QUALIFICADO:       '697b544bfbf60b001ca19706',
  CONDUCAO:          '697b544bfbf60b001ca19707',
  PROPOSTA:          '697b544bfbf60b001ca19708',
  DECISAO:           '6982077f32df2f0013336f9c',
  LIGACAO:           '69e0e7f8e5f9ff0013a37f5a',
  PERDIDO:           '6991b2ecddcdc4001c111af4',
};

export const USERS = {
  KATIA: '6989fcbfefae53001e87c939',
  JOICY: '698a007290293f001684cb0b',
};

async function rd(path, options = {}) {
  const sep = path.includes('?') ? '&' : '?';
  const res = await fetch(`${BASE}${path}${sep}token=${TOKEN}`, {
    method: 'GET',
    ...options,
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
  });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`RD Station ${res.status} on ${path}: ${body}`);
  }
  return res.json();
}

// Alternância real Joicy↔Kátia: consulta os deals recentes, identifica o
// último que está em algum estágio do nosso pipeline (a listagem não traz o
// pipeline_id direto, mas traz o deal_stage), e devolve o usuário oposto.
// Se a query falhar ou o último deal não estiver atribuído a um dos dois,
// cai num random como fallback (não trava o cadastro do lead).
const OUR_STAGE_IDS = new Set(Object.values(STAGES));

export async function assignNextUser() {
  try {
    const data = await rd('/deals?limit=30');
    const lastInPipeline = data.deals?.find(d => OUR_STAGE_IDS.has(d.deal_stage?.id));
    const lastUserId = lastInPipeline?.user?.id;
    if (lastUserId === USERS.KATIA) return USERS.JOICY;
    if (lastUserId === USERS.JOICY) return USERS.KATIA;
  } catch (err) {
    console.error('RD Station assignNextUser:', err);
  }
  // Fallback: random entre os dois
  const ids = Object.values(USERS);
  return ids[Math.floor(Math.random() * ids.length)];
}

export function createDeal({ name, organization, email, phone, role, volume, userId }) {
  return rd('/deals', {
    method: 'POST',
    body: JSON.stringify({
      deal: {
        name: `Lead: ${name} - ${organization} (${role} · ${volume})`,
        user_id: userId,
        deal_stage_id: STAGES.CADASTRO_RECEBIDO,
      },
      contacts: [{
        name,
        emails: [{ email }],
        phones: [{ phone }],
      }],
    }),
  });
}

export function updateDealStage(dealId, stageId) {
  return rd(`/deals/${dealId}`, {
    method: 'PUT',
    body: JSON.stringify({ deal: { deal_stage_id: stageId } }),
  });
}

export function createTask({ dealId, userId, subject, date, hour, type = 'task' }) {
  return rd('/tasks', {
    method: 'POST',
    body: JSON.stringify({
      task: {
        subject,
        date,
        hour,
        type,
        deal_id: dealId,
        user_ids: [userId],
      },
    }),
  });
}

// Workaround: o endpoint /activities da RD Station tem um bug de encoding —
// ele re-encoda os bytes UTF-8 do texto como se fossem Latin-1 (double-encoding),
// resultando em mojibake ("ação" vira "aÃ§Ã£o" no histórico). Deal.name e
// task.subject não têm esse problema, só activity.text. Removemos acentos só
// nas notas até a RD corrigir.
function asciiSafe(str) {
  if (!str) return '';
  return str
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // combining diacritical marks
    .replace(/ç/g, 'c').replace(/Ç/g, 'C')
    .replace(/[·•]/g, '-')
    .replace(/[—–]/g, '-')
    .replace(/…/g, '...')
    .replace(/[^\x09\x0A\x0D\x20-\x7E]/g, ''); // strip any remaining non-ASCII
}

export function createNote({ dealId, userId, text }) {
  return rd('/activities', {
    method: 'POST',
    body: JSON.stringify({
      activity: {
        text: asciiSafe(text),
        deal_id: dealId,
        user_id: userId,
        date: new Date().toISOString(),
      },
    }),
  });
}
