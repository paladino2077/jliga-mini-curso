// ===== ETAPA 5: AGENDAR APRESENTAÇÃO =====
import icons from '../icons.js';
import { getLeadData, getDealRef, setProgress, renderStepIndicator, showToast } from '../router.js';
import { updateDealStage, createTask, createNote, STAGES, assignNextUser } from '../services/rdstation.js';

const WHATSAPP_NUMBER = '5511999999999'; // PLACEHOLDER — substituir pelo número real

const PERIODS = [
  { label: 'Manhã', sublabel: '9h às 12h' },
  { label: 'Tarde', sublabel: '13h às 17h' },
];

function generateDays() {
  const today = new Date();
  const days = [];
  const weekdays = ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'];
  const months = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];

  let added = 0;
  let offset = 1;
  while (added < 5) {
    const d = new Date(today);
    d.setDate(today.getDate() + offset);
    offset++;
    if (d.getDay() === 0 || d.getDay() === 6) continue;
    days.push({
      dayName: weekdays[d.getDay()],
      dayNum: d.getDate(),
      month: months[d.getMonth()],
      iso: d.toISOString().slice(0, 10),
    });
    added++;
  }
  return days;
}

export function render(app) {
  const lead = getLeadData();
  const days = generateDays();

  app.innerHTML = `
    <nav class="navbar scrolled">
      <div class="container">
        <a href="#/" class="nav-logo"><img src="/logo.png" alt="jliga.club"></a>
        <div class="nav-links">
          <a href="#/solucao" style="color:#666">← Voltar</a>
        </div>
      </div>
    </nav>

    <main class="schedule-page">
      <div class="container">
        ${renderStepIndicator(5)}

        <div class="schedule-header reveal">
          <span class="section-badge">Etapa 5 de 5</span>
          <h1>Não é Ligação Fria.<br><span class="gradient-text">Você levantou a mão.</span> Vamos te ouvir.</h1>
        </div>

        <div class="trust-bar reveal">
          <div class="trust-item">${icons.checkCircle} <span>Sem pressão de vendas</span></div>
          <div class="trust-item">${icons.checkCircle} <span>20 minutos no máximo</span></div>
          <div class="trust-item">${icons.checkCircle} <span>Demo ao vivo da plataforma</span></div>
          <div class="trust-item">${icons.checkCircle} <span>Resposta na hora</span></div>
        </div>

        <div class="schedule-box reveal">
          <h2>Escolha uma disponibilidade ideal</h2>
          <p class="schedule-box-sub">Selecione o dia e período que funciona melhor para você. Um dos nossos especialistas vai confirmar pelo WhatsApp.</p>

          <div class="schedule-days">
            <p class="schedule-section-label">${icons.calendar} Qual dia funciona melhor?</p>
            <div class="days-grid" id="daysGrid">
              ${days.map((d, i) => `
                <button class="day-btn ${i === 0 ? 'selected' : ''}" data-date="${d.iso}" data-label="${d.dayName}, ${d.dayNum} de ${d.month}">
                  <span class="day-name">${d.dayName.slice(0, 3)}</span>
                  <span class="day-num">${d.dayNum}</span>
                  <span class="day-month">${d.month}</span>
                </button>
              `).join('')}
            </div>
          </div>

          <div class="schedule-period">
            <p class="schedule-section-label">${icons.clock} Qual período?</p>
            <div class="period-grid" id="periodGrid">
              ${PERIODS.map(p => `
                <button class="period-btn" data-period="${p.label}" data-sublabel="${p.sublabel}">
                  <span class="period-name">${p.label}</span>
                  <span class="period-sub">${p.sublabel}</span>
                </button>
              `).join('')}
            </div>
          </div>

          <button class="btn-primary btn-whatsapp btn-xl" id="btnWhatsapp" disabled>
            ${icons.whatsapp} Confirmar pelo WhatsApp
          </button>
          <p class="schedule-disclaimer">
            Ao clicar, você será direcionado ao WhatsApp da nossa equipe. Informe seu nome, organização e o horário escolhido acima.
          </p>
        </div>

        <div class="next-steps reveal">
          <h2>O que acontece depois</h2>
          <div class="next-steps-list">
            <div class="next-step">
              <div class="next-step-num">1</div>
              <div class="next-step-text">Você confirma pelo WhatsApp com nome e horário</div>
            </div>
            <div class="next-step">
              <div class="next-step-num">2</div>
              <div class="next-step-text">Nossa equipe confirma e envia o link da reunião</div>
            </div>
            <div class="next-step">
              <div class="next-step-num">3</div>
              <div class="next-step-text">Demo ao vivo — você vê o jliga funcionando em 20 minutos e tira dúvidas particulares da sua gestão</div>
            </div>
            <div class="next-step">
              <div class="next-step-num">4</div>
              <div class="next-step-text">Se fizer sentido, a decisão é sua</div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <footer class="footer">
      <div class="container">
        <p>© 2026 <a href="#/">jliga.club</a> — Todos os direitos reservados.</p>
      </div>
    </footer>
  `;
}

export function init() {
  document.querySelectorAll('.reveal').forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), i * 120);
  });

  const lead = getLeadData();
  const daysGrid = document.getElementById('daysGrid');
  const periodGrid = document.getElementById('periodGrid');
  const btnWhatsapp = document.getElementById('btnWhatsapp');

  const firstDay = daysGrid.querySelector('.day-btn');
  let selectedDate = firstDay?.dataset.date || null;
  let selectedDateLabel = firstDay?.dataset.label || null;
  let selectedPeriod = null;
  let selectedPeriodSublabel = null;

  daysGrid.addEventListener('click', (e) => {
    const btn = e.target.closest('.day-btn');
    if (!btn) return;
    daysGrid.querySelectorAll('.day-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    selectedDate = btn.dataset.date;
    selectedDateLabel = btn.dataset.label;
    updateCTA();
  });

  periodGrid.addEventListener('click', (e) => {
    const btn = e.target.closest('.period-btn');
    if (!btn) return;
    periodGrid.querySelectorAll('.period-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    selectedPeriod = btn.dataset.period;
    selectedPeriodSublabel = btn.dataset.sublabel;
    updateCTA();
  });

  function updateCTA() {
    btnWhatsapp.disabled = !(selectedDate && selectedPeriod);
  }

  btnWhatsapp.addEventListener('click', () => {
    if (!selectedDate || !selectedPeriod) {
      showToast('Selecione um dia e período primeiro.');
      return;
    }

    setProgress('scheduled');

    syncScheduleToRD({
      lead,
      selectedDate,
      selectedDateLabel,
      selectedPeriod,
      selectedPeriodSublabel,
    });

    const message = encodeURIComponent(
      `Olá! Sou ${lead?.nome || 'gestor esportivo'}` +
      `${lead?.cargo ? ` (${lead.cargo})` : ''}, ` +
      `da ${lead?.organizacao || 'minha organização'}.\n\n` +
      `Vim pelo mini-curso da jliga.club e quero agendar uma apresentação personalizada.\n\n` +
      `📅 Data: ${selectedDateLabel}\n` +
      `🕐 Período: ${selectedPeriod} (${selectedPeriodSublabel})\n\n` +
      `Aguardo a confirmação!`
    );

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
    showToast('Redirecionando para o WhatsApp...');
    setTimeout(() => window.open(url, '_blank'), 800);
  });
}

function buildTaskDateTime(isoDate, period) {
  const hour = period === 'Manhã' ? '10:00' : '14:00';
  // Brazil local (UTC-3) → convert to UTC ISO for the API
  const localDate = new Date(`${isoDate}T${hour}:00-03:00`);
  return { date: localDate.toISOString(), hour };
}

async function syncScheduleToRD({ lead, selectedDate, selectedDateLabel, selectedPeriod, selectedPeriodSublabel }) {
  const ref = getDealRef();
  if (!ref?.id) {
    console.warn('RD Station: nenhum deal_id no localStorage — sync de agendamento ignorado.');
    return;
  }

  const dealId = ref.id;
  const userId = ref.userId || await assignNextUser();

  const { date, hour } = buildTaskDateTime(selectedDate, selectedPeriod);
  const taskSubject = `Reunião agendada: ${lead?.nome || 'lead'} · ${selectedPeriod}`;

  const noteText =
    `Lead agendou apresentação via mini-curso jliga.club\n\n` +
    `Data: ${selectedDateLabel}\n` +
    `Período: ${selectedPeriod} (${selectedPeriodSublabel})\n\n` +
    `(dados completos do lead na nota de captura)`;

  Promise.allSettled([
    updateDealStage(dealId, STAGES.CONDUCAO),
    createTask({ dealId, userId, subject: taskSubject, date, hour }),
    createNote({ dealId, userId, text: noteText }),
  ]).then((results) => {
    results.forEach((r, i) => {
      const label = ['updateDealStage', 'createTask', 'createNote'][i];
      if (r.status === 'rejected') console.error(`RD Station ${label}:`, r.reason);
    });
  });
}
