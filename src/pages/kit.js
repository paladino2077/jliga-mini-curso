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
          <h1>${firstName}, <span class="gradient-text">Seus 3 bônus</span> estão prontos.</h1>
          <p>Materiais prontos para você aplicar hoje mesmo no seu campeonato.</p>
        </div>

        <div class="kit-grid">
          <!-- Material 1 -->
          <div class="kit-card reveal">
            <div class="kit-card-icon kit-icon-1">
              ${icons.file}
            </div>
            <h3>Modelo de Proposta de Patrocínio</h3>
            <p>Proposta completa com os 6 elementos que fazem o patrocinador dizer sim. Edite e envie ainda hoje.</p>
            
            <button class="btn-kit-download"
              data-url="https://docs.google.com/presentation/d/1z0_orBidVsJbqGYcXoWbFV7icceC6Xmy93DRYjMf0Os/edit?usp=sharing"
              data-download-url="https://docs.google.com/presentation/d/1z0_orBidVsJbqGYcXoWbFV7icceC6Xmy93DRYjMf0Os/edit?usp=sharing"
              data-filename="proposta-patrocinio.pdf">
              ${icons.download} Baixar Material
            </button>
          </div>

          <!-- Material 2 -->
          <div class="kit-card reveal">
            <div class="kit-card-icon kit-icon-2">
              ${icons.chart}
            </div>
            <h3>Planilha de Prospecção de Patrocinadores</h3>
            <p>Organize seus contatos, acompanhe cada negociação e nunca mais perca um follow-up.</p>
            
            <button class="btn-kit-download"
              data-url="https://docs.google.com/spreadsheets/d/1WFRPbfHWSiUCarK8b0rlj8kSVxiEmAQYVz4oV6V478M/edit?usp=sharing"
              data-download-url="https://docs.google.com/spreadsheets/d/1WFRPbfHWSiUCarK8b0rlj8kSVxiEmAQYVz4oV6V478M/edit?usp=sharing"
              data-filename="planilha-captacao.xlsx">
              ${icons.download} Baixar Material
            </button>
          </div>

          <!-- Material 3 -->
          <div class="kit-card reveal">
            <div class="kit-card-icon kit-icon-3">
              ${icons.clipboard}
            </div>
            <h3>Slides do Treinamento</h3>
            <p>Material completo da aula para revisar, compartilhar com o time ou apresentar para outros gestores.</p>
            
            <button class="btn-kit-download"
              data-url="https://docs.google.com/presentation/d/1KiRQWL_gx0HiLJeMCJUI_MHQj6MHQnDYu0NzKTnnUBI/edit?usp=sharing"
              data-download-url="https://docs.google.com/presentation/d/1KiRQWL_gx0HiLJeMCJUI_MHQj6MHQnDYu0NzKTnnUBI/edit?usp=sharing"
              data-filename="slides-aula.pdf">
              ${icons.download} Baixar Material
            </button>
          </div>
        </div>

        <div class="kit-bottom-cta reveal">
          <div class="kit-bottom-card">
            <div class="kit-bottom-icon">${icons.zap}</div>
            <h2>Um passo <span class="gradient-text">além</span>!</h2>
            <p>
            Os <span class="gradient-text"> melhores gestores que captam patrocinadores </span> têm uma coisa em comum: um campeonato com estrutura digital profissional. App próprio, site oficial, tabela automática. Isso comunica antes de qualquer conversa. 
            <span class="gradient-text">Na próxima etapa você vai entender como isso funciona</span>.
            </p>
            <button class="btn-primary" id="btnSolucao">
              Ver como estruturar meu campeonato ${icons.arrow}
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
