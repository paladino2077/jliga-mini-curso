// ===== ETAPA 2: PÁGINA DA AULA =====
import icons from '../icons.js';
import { navigate, getLeadData, setProgress, renderStepIndicator } from '../router.js';

const TIMER_DURATION = 15 * 60; // 15 minutes in seconds

export function render(app) {
  const lead = getLeadData();
  const firstName = lead?.nome?.split(' ')[0] || 'Presidente';

  app.innerHTML = `
    <nav class="navbar scrolled" id="navbar">
      <div class="container">
        <a href="#/" class="nav-logo">J<span>Liga</span></a>
        <div class="nav-links">
          <a href="#/" style="color:#666">← Voltar ao início</a>
        </div>
      </div>
    </nav>

    <main class="lesson-page">
      <div class="container">
        ${renderStepIndicator(2)}
        
        <div class="lesson-greeting reveal">
          <span class="section-badge">Etapa 2 de 5</span>
          <h1>Olá, <span class="gradient-text">${firstName}</span>! 👋</h1>
          <p>Sua aula exclusiva está pronta. Assista com atenção — esse conteúdo vale ouro para sua liga.</p>
        </div>

        <div class="lesson-player-wrapper reveal">
          <div class="lesson-player" id="videoPlayer">
            <div class="lesson-player-placeholder">
              <div class="play-btn-wrapper">
                <div class="play-btn">${icons.play}</div>
              </div>
              <p>Como captar patrocínio e verba pública para sua liga esportiva</p>
              <span class="lesson-duration">${icons.clock} 25 minutos</span>
            </div>
          </div>
        </div>

        <div class="lesson-info reveal">
          <div class="lesson-info-card">
            <h3>📚 Nesta aula você vai aprender:</h3>
            <ul class="lesson-topics">
              <li>${icons.checkCircle} <span>Como montar uma proposta de patrocínio que convence</span></li>
              <li>${icons.checkCircle} <span>Os 5 editais de verba pública mais acessíveis para ligas</span></li>
              <li>${icons.checkCircle} <span>O erro #1 que presidentes cometem na prestação de contas</span></li>
              <li>${icons.checkCircle} <span>Como usar tecnologia para profissionalizar a gestão</span></li>
              <li>${icons.checkCircle} <span>Case real: Liga que saiu de R$0 para R$120 mil/ano em patrocínio</span></li>
            </ul>
          </div>
        </div>

        <div class="lesson-cta-area reveal" id="lessonCtaArea">
          <div class="timer-section" id="timerSection">
            <div class="timer-bar-wrapper">
              <div class="timer-bar" id="timerBar"></div>
            </div>
            <p class="timer-text">
              ${icons.lock} O botão será liberado em <span id="timerDisplay">15:00</span>
            </p>
          </div>

          <button class="btn-primary btn-lesson-complete" id="btnComplete" disabled>
            ${icons.lock} Aguarde o final da aula...
          </button>
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
  // Scroll reveal
  document.querySelectorAll('.reveal').forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), i * 150);
  });

  // Timer countdown
  const timerDisplay = document.getElementById('timerDisplay');
  const timerBar = document.getElementById('timerBar');
  const timerSection = document.getElementById('timerSection');
  const btnComplete = document.getElementById('btnComplete');
  let remaining = TIMER_DURATION;

  const timerInterval = setInterval(() => {
    remaining--;
    const min = Math.floor(remaining / 60);
    const sec = remaining % 60;
    timerDisplay.textContent = `${String(min).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;
    
    const progress = ((TIMER_DURATION - remaining) / TIMER_DURATION) * 100;
    timerBar.style.width = `${progress}%`;

    if (remaining <= 0) {
      clearInterval(timerInterval);
      unlockButton();
    }
  }, 1000);

  function unlockButton() {
    timerSection.innerHTML = `
      <p class="timer-done">✅ Aula concluída! Agora baixe seu Kit de Materiais gratuito.</p>
    `;
    btnComplete.disabled = false;
    btnComplete.innerHTML = `Concluí a aula — Quero meu Kit ${icons.arrow}`;
    btnComplete.classList.add('btn-unlocked');
  }

  btnComplete.addEventListener('click', () => {
    if (btnComplete.disabled) return;
    setProgress('lessonCompleted');
    navigate('/kit');
  });

  // Video player placeholder click
  const videoPlayer = document.getElementById('videoPlayer');
  videoPlayer.addEventListener('click', () => {
    videoPlayer.innerHTML = `
      <iframe 
        width="100%" 
        height="100%" 
        src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0" 
        title="Aula: Captação de Patrocínio" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen
        style="position:absolute;top:0;left:0;width:100%;height:100%;border-radius:16px;">
      </iframe>
    `;
  });
}
