// ===== ETAPA 2: PÁGINA DA AULA =====
import icons from '../icons.js';
import { navigate, getLeadData, setProgress, renderStepIndicator } from '../router.js';

const REQUIRED_WATCH_SECONDS = 10 * 60; // 10 minutos de reprodução real

export function render(app) {
  const lead = getLeadData();
  const firstName = lead?.nome?.split(' ')[0] || 'Gestor';

  app.innerHTML = `
    <nav class="navbar scrolled" id="navbar">
      <div class="container">
        <a href="#/" class="nav-logo"><img src="/logo.png" alt="jliga.club"></a>
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
          <h1>Olá, <span class="gradient-text">${firstName}</span></h1>
          <hr width="50px" style="margin: 20px auto;" class=" justify-content center ">
          <h2>Assista a aula completa<span class="gradient-text"> agora</span></h2>
          <p>Alguns minutos que podem mudar como você capta patrocinadores para sempre.</p>
        </div>

        <div class="lesson-player-wrapper reveal">
          <div class="lesson-player" id="videoPlayer">
            <div class="lesson-player-placeholder" id="playerPlaceholder">
              <div class="play-btn-wrapper">
                <div class="play-btn">${icons.play}</div>
              </div>
              <p>O que separa competições comuns de operações que crescem e atraem patrocinadores</p>
              <span class="lesson-duration">${icons.clock} 50 minutos</span>
            </div>
          </div>
        </div>

        <div class="lesson-info reveal">
          <div class="lesson-info-card">
            <h3>O que você vai aprender:</h3>
            <ul class="lesson-topics">
              <li>${icons.checkCircle} <span>A mentalidade certa — o que o patrocinador compra de verdade</span></li>
              <li>${icons.checkCircle} <span>Como mapear os patrocinadores certos para o seu publico</span></li>
              <li>${icons.checkCircle} <span>A abordagem inicial que abre portas sem parecer pedido</span></li>
              <li>${icons.checkCircle} <span>Os 6 elementos da proposta que converte</span></li>
            </ul>
          </div>
        </div>

        <div class="lesson-cta-area reveal" id="lessonCtaArea">
          <div class="timer-section" id="timerSection">
            <div class="timer-bar-wrapper">
              <div class="timer-bar" id="timerBar"></div>
            </div>
            <p class="timer-text">
              ${icons.lock} O botão será liberado após <span id="timerDisplay">10:00</span> de aula assistida
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
        <p>© 2026 <a href="#/">jliga.club</a> — Todos os direitos reservados.</p>
      </div>
    </footer>
  `;
}

export function init() {
  document.querySelectorAll('.reveal').forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), i * 150);
  });

  const timerDisplay = document.getElementById('timerDisplay');
  const timerBar = document.getElementById('timerBar');
  const timerSection = document.getElementById('timerSection');
  const btnComplete = document.getElementById('btnComplete');
  const placeholder = document.getElementById('playerPlaceholder');

  let watchedSeconds = 0;
  let watchInterval = null;
  let ytPlayer = null;
  let unlocked = false;
  let clickedPlay = false;

  function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  }

  function tick() {
    if (unlocked || !ytPlayer) return;
    // YT.PlayerState.PLAYING === 1
    if (ytPlayer.getPlayerState() === 1) {
      watchedSeconds++;
      const remaining = Math.max(0, REQUIRED_WATCH_SECONDS - watchedSeconds);
      timerDisplay.textContent = formatTime(remaining);
      const progress = (watchedSeconds / REQUIRED_WATCH_SECONDS) * 100;
      timerBar.style.width = `${Math.min(progress, 100)}%`;

      if (watchedSeconds >= REQUIRED_WATCH_SECONDS) {
        unlocked = true;
        clearInterval(watchInterval);
        unlockButton();
      }
    }
  }

  function unlockButton() {
    timerSection.innerHTML = `
      <p class="timer-done">${icons.checkCircle} Conclui a aula — quero meu kit.</p>
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

  function createPlayer() {
    const videoContainer = document.getElementById('videoPlayer');
    const playerDiv = document.createElement('div');
    playerDiv.id = 'yt-player';
    playerDiv.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;';
    videoContainer.innerHTML = '';
    videoContainer.appendChild(playerDiv);

    ytPlayer = new YT.Player('yt-player', {
      height: '100%',
      width: '100%',
      videoId: 'jsEubcSZ_UA',
      playerVars: { autoplay: 1, rel: 0 },
      events: {
        onReady: () => {
          watchInterval = setInterval(tick, 1000);
        },
      },
    });
  }

  // Carrega a YouTube IFrame API preservando callbacks anteriores (SPA-safe)
  function loadYouTubeAPI() {
    return new Promise((resolve) => {
      if (window.YT && window.YT.Player) {
        resolve();
        return;
      }
      const prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (typeof prev === 'function') prev();
        resolve();
      };
      if (!document.getElementById('yt-api-script')) {
        const tag = document.createElement('script');
        tag.id = 'yt-api-script';
        tag.src = 'https://www.youtube.com/iframe_api';
        document.head.appendChild(tag);
      }
    });
  }

  let apiReady = false;
  loadYouTubeAPI().then(() => {
    apiReady = true;
    if (clickedPlay) createPlayer();
  });

  placeholder.addEventListener('click', () => {
    clickedPlay = true;
    if (apiReady) createPlayer();
    // se a API ainda não carregou, createPlayer() será chamado no .then() acima
  }, { once: true });
}
