// ===== ETAPA 3: KIT DE MATERIAIS =====
import icons from '../icons.js';
import { navigate, getLeadData, setProgress, renderStepIndicator, showToast } from '../router.js';

export function render(app) {
  const lead = getLeadData();
  const firstName = lead?.nome?.split(' ')[0] || 'Presidente';

  setProgress('kitVisited');

  app.innerHTML = `
    <nav class="navbar scrolled">
      <div class="container">
        <a href="#/" class="nav-logo">J<span>Liga</span></a>
        <div class="nav-links">
          <a href="#/aula" style="color:#666">← Voltar à aula</a>
        </div>
      </div>
    </nav>

    <main class="kit-page">
      <div class="container">
        ${renderStepIndicator(3)}
        
        <div class="kit-header reveal">
          <span class="section-badge">Etapa 3 de 5</span>
          <h1>${firstName}, aqui está seu <span class="gradient-text">Kit Completo</span></h1>
          <p>3 materiais exclusivos para você aplicar imediatamente na sua operação. Baixe todos gratuitamente.</p>
        </div>

        <div class="kit-grid">
          <!-- Material 1 -->
          <div class="kit-card reveal">
            <div class="kit-card-icon kit-icon-1">
              ${icons.file}
            </div>
            <div class="kit-card-tag">PDF — 12 páginas</div>
            <h3>Modelo de Proposta Comercial de Patrocínio</h3>
            <p>Template pronto com seções de contrapartida, métricas e valores sugeridos. Proposta sustentada por evidência, não por promessa.</p>
            <div class="kit-card-cta-subtle">
              <span>${icons.zap}</span>
              <span>O JLiga gera este documento automaticamente com dados reais da sua competição</span>
            </div>
            <button class="btn-kit-download" data-material="modelo-proposta-patrocinio">
              ${icons.download} Baixar Material
            </button>
          </div>

          <!-- Material 2 -->
          <div class="kit-card reveal">
            <div class="kit-card-icon kit-icon-2">
              ${icons.chart}
            </div>
            <div class="kit-card-tag">PDF — 18 páginas</div>
            <h3>Guia: Como Acessar Verba Pública para sua Liga</h3>
            <p>Passo a passo completo com os principais editais, leis de incentivo ao esporte e modelos de submissão com conformidade documentada.</p>
            <div class="kit-card-cta-subtle">
              <span>${icons.zap}</span>
              <span>O JLiga gera relatórios auditáveis prontos para prestação de contas em editais</span>
            </div>
            <button class="btn-kit-download" data-material="guia-verba-publica">
              ${icons.download} Baixar Material
            </button>
          </div>

          <!-- Material 3 -->
          <div class="kit-card reveal">
            <div class="kit-card-icon kit-icon-3">
              ${icons.clipboard}
            </div>
            <div class="kit-card-tag">PDF — 8 páginas</div>
            <h3>Checklist de Governança para Liga Profissional</h3>
            <p>10 itens essenciais de rastreabilidade, conformidade e gestão. Avalie o nível de profissionalismo da sua organização.</p>
            <div class="kit-card-cta-subtle">
              <span>${icons.zap}</span>
              <span>O JLiga resolve 8 dos 10 itens deste checklist automaticamente</span>
            </div>
            <button class="btn-kit-download" data-material="checklist-governanca">
              ${icons.download} Baixar Material
            </button>
          </div>
        </div>

        <div class="kit-bottom-cta reveal">
          <div class="kit-bottom-card">
            <div class="kit-bottom-icon">${icons.zap}</div>
            <h2>E se existisse uma plataforma que <span class="gradient-text">estrutura tudo isso</span>?</h2>
            <p>Gestão de atletas, financeiro, ranking, eventos, conformidade LGPD e relatórios para patrocinadores — tudo em um único ambiente.</p>
            <button class="btn-primary" id="btnSolucao">
              Descobrir a solução ${icons.arrow}
            </button>
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
    setTimeout(() => el.classList.add('visible'), i * 150);
  });

  document.querySelectorAll('.btn-kit-download').forEach(btn => {
    btn.addEventListener('click', () => {
      const material = btn.dataset.material;
      btn.innerHTML = `<span class="spinner"></span> Preparando...`;
      btn.disabled = true;
      setTimeout(() => {
        btn.innerHTML = `${icons.checkCircle} Download concluído`;
        btn.classList.add('downloaded');
        showToast(`${icons.file} "${material}.pdf" baixado com sucesso`);
      }, 1500);
    });
  });

  document.getElementById('btnSolucao').addEventListener('click', () => {
    navigate('/solucao');
  });
}
