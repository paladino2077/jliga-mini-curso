// ===== ETAPA 3: KIT DE MATERIAIS =====
import icons from '../icons.js';
import { navigate, getLeadData, setProgress, renderStepIndicator } from '../router.js';

export function render(app) {
  const lead = getLeadData();
  const firstName = lead?.nome?.split(' ')[0] || 'Gestor';

  setProgress('kitVisited');

  app.innerHTML = `
    <nav class="navbar scrolled">
      <div class="container">
        <a href="#/" class="nav-logo"><img src="/logo.png" alt="jliga.club"></a>
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
            <div class="kit-card-tag">Bônus 1 — Google Slides</div>
            <h3>Proposta de Patrocínio</h3>
            <p>Template pronto com seções de contrapartida, métricas e valores sugeridos. Proposta sustentada por evidência, não por promessa.</p>
            <div class="kit-card-cta-subtle">
              <span>${icons.zap}</span>
              <span>A jliga.club gera este documento automaticamente com dados reais da sua competição</span>
            </div>
            <button class="btn-kit-download"
              data-url="https://docs.google.com/presentation/d/1z0_orBidVsJbqGYcXoWbFV7icceC6Xmy93DRYjMf0Os/edit?usp=sharing"
              data-download-url="https://docs.google.com/presentation/d/1z0_orBidVsJbqGYcXoWbFV7icceC6Xmy93DRYjMf0Os/export/pdf"
              data-filename="proposta-patrocinio.pdf">
              ${icons.download} Baixar Material
            </button>
          </div>

          <!-- Material 2 -->
          <div class="kit-card reveal">
            <div class="kit-card-icon kit-icon-2">
              ${icons.chart}
            </div>
            <div class="kit-card-tag">Bônus 2 — Google Sheets</div>
            <h3>Planilha de Captação</h3>
            <p>Planilha completa para organizar e acompanhar suas ações de captação de patrocinadores e verba pública para sua operação.</p>
            <div class="kit-card-cta-subtle">
              <span>${icons.zap}</span>
              <span>A jliga.club gera relatórios auditáveis prontos para prestação de contas em editais</span>
            </div>
            <button class="btn-kit-download"
              data-url="https://docs.google.com/spreadsheets/d/1WFRPbfHWSiUCarK8b0rlj8kSVxiEmAQYVz4oV6V478M/edit?usp=sharing"
              data-download-url="https://docs.google.com/spreadsheets/d/1WFRPbfHWSiUCarK8b0rlj8kSVxiEmAQYVz4oV6V478M/export?format=xlsx"
              data-filename="planilha-captacao.xlsx">
              ${icons.download} Baixar Material
            </button>
          </div>

          <!-- Material 3 -->
          <div class="kit-card reveal">
            <div class="kit-card-icon kit-icon-3">
              ${icons.clipboard}
            </div>
            <div class="kit-card-tag">Bônus 3 — Google Slides</div>
            <h3>Slides da Aula</h3>
            <p>Apresentação completa com todos os conceitos, frameworks e estratégias abordados durante o mini curso. Consulte sempre que precisar.</p>
            <div class="kit-card-cta-subtle">
              <span>${icons.zap}</span>
              <span>A jliga.club resolve 8 dos 10 itens deste checklist automaticamente</span>
            </div>
            <button class="btn-kit-download"
              data-url="https://docs.google.com/presentation/d/1KiRQWL_gx0HiLJeMCJUI_MHQj6MHQnDYu0NzKTnnUBI/edit?usp=sharing"
              data-download-url="https://docs.google.com/presentation/d/1KiRQWL_gx0HiLJeMCJUI_MHQj6MHQnDYu0NzKTnnUBI/export/pdf"
              data-filename="slides-aula.pdf">
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
        <p>© 2026 <a href="#/">jliga.club</a> — Todos os direitos reservados.</p>
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
      const downloadUrl = btn.dataset.downloadUrl;
      const filename = btn.dataset.filename;
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = filename;
      a.target = '_blank';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      btn.innerHTML = `${icons.checkCircle} Download iniciado`;
      btn.classList.add('downloaded');
    });
  });

  document.getElementById('btnSolucao').addEventListener('click', () => {
    navigate('/solucao');
  });
}
