// ===== ETAPA 5: AGENDAR APRESENTAÇÃO =====
import icons from '../icons.js';
import { getLeadData, setProgress, renderStepIndicator, showToast } from '../router.js';

const WHATSAPP_NUMBER = '5511999999999'; // PLACEHOLDER — substituir pelo número real

function generateTimeSlots() {
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
      date: d,
      dayName: weekdays[d.getDay()],
      dayNum: d.getDate(),
      month: months[d.getMonth()],
      iso: d.toISOString().slice(0,10),
    });
    added++;
  }
  return days;
}

const TIME_SLOTS = [
  { label: '09:00', period: 'Manhã' },
  { label: '10:00', period: 'Manhã' },
  { label: '11:00', period: 'Manhã' },
  { label: '14:00', period: 'Tarde' },
  { label: '15:00', period: 'Tarde' },
  { label: '16:00', period: 'Tarde' },
];

export function render(app) {
  const lead = getLeadData();
  const firstName = lead?.nome?.split(' ')[0] || 'Presidente';
  const days = generateTimeSlots();

  app.innerHTML = `
    <nav class="navbar scrolled">
      <div class="container">
        <a href="#/" class="nav-logo"><img src="/logo.png" alt="JLiga"></a>
        <div class="nav-links">
          <a href="#/solucao" style="color:#666">← Voltar</a>
        </div>
      </div>
    </nav>

    <main class="schedule-page">
      <div class="container">
        ${renderStepIndicator(5)}

        <div class="schedule-header reveal">
          <span class="section-badge">Última Etapa</span>
          <h1>${firstName}, estamos quase lá. <span class="gradient-text">Escolha seu horário</span></h1>
          <p>Selecione o melhor dia e horário para sua apresentação personalizada. Um especialista em gestão esportiva entrará em contato pelo WhatsApp.</p>
        </div>

        <div class="schedule-content">
          <div class="schedule-days reveal">
            <h3>${icons.calendar} Selecione o dia</h3>
            <div class="days-grid" id="daysGrid">
              ${days.map((d, i) => `
                <button class="day-btn ${i === 0 ? 'selected' : ''}" data-date="${d.iso}" data-label="${d.dayName}, ${d.dayNum} ${d.month}">
                  <span class="day-name">${d.dayName.slice(0,3)}</span>
                  <span class="day-num">${d.dayNum}</span>
                  <span class="day-month">${d.month}</span>
                </button>
              `).join('')}
            </div>
          </div>

          <div class="schedule-times reveal">
            <h3>${icons.clock} Selecione o horário</h3>
            <div class="times-grid" id="timesGrid">
              ${TIME_SLOTS.map(t => `
                <button class="time-btn" data-time="${t.label}">
                  <span class="time-label">${t.label}</span>
                  <span class="time-period">${t.period}</span>
                </button>
              `).join('')}
            </div>
          </div>

          <div class="schedule-summary reveal" id="scheduleSummary" style="display:none">
            <div class="summary-card">
              <h3>${icons.clipboard} Resumo do Agendamento</h3>
              <div class="summary-details">
                <div class="summary-row">
                  <span class="summary-label">Nome:</span>
                  <span class="summary-value">${lead?.nome || '—'}</span>
                </div>
                <div class="summary-row">
                  <span class="summary-label">Liga:</span>
                  <span class="summary-value">${lead?.liga || '—'}</span>
                </div>
                <div class="summary-row">
                  <span class="summary-label">Estado:</span>
                  <span class="summary-value">${lead?.estado || '—'}</span>
                </div>
                <div class="summary-row">
                  <span class="summary-label">Data:</span>
                  <span class="summary-value" id="summaryDate">—</span>
                </div>
                <div class="summary-row">
                  <span class="summary-label">Horário:</span>
                  <span class="summary-value" id="summaryTime">—</span>
                </div>
              </div>

              <button class="btn-primary btn-whatsapp btn-xl" id="btnWhatsapp" disabled>
                ${icons.whatsapp} Confirmar e falar pelo WhatsApp
              </button>

              <p class="schedule-disclaimer">
                Ao clicar, você será redirecionado para o WhatsApp onde nossa equipe confirmará seu horário.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>

    <footer class="footer">
      <div class="container">
        <p>© 2026 <a href="#/">JLiga</a> — Todos os direitos reservados.</p>
      </div>
    </footer>
  `;
}

export function init() {
  document.querySelectorAll('.reveal').forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), i * 120);
  });

  const lead = getLeadData();
  let selectedDate = null;
  let selectedDateLabel = null;
  let selectedTime = null;

  const daysGrid = document.getElementById('daysGrid');
  const timesGrid = document.getElementById('timesGrid');
  const summary = document.getElementById('scheduleSummary');
  const summaryDate = document.getElementById('summaryDate');
  const summaryTime = document.getElementById('summaryTime');
  const btnWhatsapp = document.getElementById('btnWhatsapp');

  const firstDay = daysGrid.querySelector('.day-btn');
  if (firstDay) {
    selectedDate = firstDay.dataset.date;
    selectedDateLabel = firstDay.dataset.label;
  }

  daysGrid.addEventListener('click', (e) => {
    const btn = e.target.closest('.day-btn');
    if (!btn) return;
    daysGrid.querySelectorAll('.day-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    selectedDate = btn.dataset.date;
    selectedDateLabel = btn.dataset.label;
    updateSummary();
  });

  timesGrid.addEventListener('click', (e) => {
    const btn = e.target.closest('.time-btn');
    if (!btn) return;
    timesGrid.querySelectorAll('.time-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    selectedTime = btn.dataset.time;
    updateSummary();
  });

  function updateSummary() {
    if (selectedDate && selectedTime) {
      summary.style.display = 'block';
      summaryDate.textContent = selectedDateLabel;
      summaryTime.textContent = selectedTime;
      btnWhatsapp.disabled = false;
      setTimeout(() => {
        summary.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 200);
    }
  }

  btnWhatsapp.addEventListener('click', () => {
    if (!selectedDate || !selectedTime) {
      showToast('Selecione um dia e horário primeiro.');
      return;
    }

    setProgress('scheduled');

    const message = encodeURIComponent(
      `Olá! Sou ${lead?.nome || 'presidente de liga'}, ` +
      `da ${lead?.liga || 'minha liga'} (${lead?.estado || ''}).\n\n` +
      `Acabei de assistir o mini-curso da JLiga e gostaria de agendar ` +
      `minha apresentação personalizada.\n\n` +
      `Data: ${selectedDateLabel}\n` +
      `Horário: ${selectedTime}\n\n` +
      `Aguardo a confirmação.`
    );

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
    
    showToast('Redirecionando para o WhatsApp...');
    
    setTimeout(() => {
      window.open(url, '_blank');
    }, 800);
  });
}
