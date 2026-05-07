// ===== ETAPA 4: APRESENTAÇÃO DA SOLUÇÃO =====
import icons from '../icons.js';
import { navigate, getLeadData, setProgress, renderStepIndicator } from '../router.js';

export function render(app) {
  const lead = getLeadData();
  const firstName = lead?.nome?.split(' ')[0] || 'Presidente';

  setProgress('solutionViewed');

  app.innerHTML = `
    <nav class="navbar scrolled">
      <div class="container">
        <a href="#/" class="nav-logo">J<span>Liga</span></a>
        <div class="nav-links">
          <a href="#/kit" style="color:#666">← Voltar ao Kit</a>
        </div>
      </div>
    </nav>

    <main class="solution-page">
      <div class="container">
        ${renderStepIndicator(4)}

        <!-- HERO -->
        <div class="solution-hero reveal">
          <span class="section-badge">Etapa 4 de 5</span>
          <h1>O JLiga é a plataforma que faz sua liga funcionar no <span class="gradient-text">piloto automático</span></h1>
          <p>Tudo que você viu na aula e no kit — automatizado, integrado e profissional. Usado por mais de 850 ligas em 27 estados.</p>
        </div>

        <!-- FEATURES GRID -->
        <div class="solution-features reveal">
          <div class="solution-feature">
            <div class="solution-feature-icon">${icons.users}</div>
            <h3>Gestão de Atletas</h3>
            <p>Cadastro, filiação, documentos e histórico competitivo em um só lugar.</p>
          </div>
          <div class="solution-feature">
            <div class="solution-feature-icon">${icons.dollarSign}</div>
            <h3>Financeiro Integrado</h3>
            <p>Inscrições, mensalidades, repasses e relatórios financeiros automáticos.</p>
          </div>
          <div class="solution-feature">
            <div class="solution-feature-icon">${icons.ranking}</div>
            <h3>Ranking Automático</h3>
            <p>Sistema de pontuação que atualiza sozinho após cada competição.</p>
          </div>
          <div class="solution-feature">
            <div class="solution-feature-icon">${icons.trophy}</div>
            <h3>Gestão de Eventos</h3>
            <p>Crie campeonatos, gerencie chaves, inscrições e resultados em minutos.</p>
          </div>
          <div class="solution-feature">
            <div class="solution-feature-icon">${icons.video}</div>
            <h3>Transmissão ao Vivo</h3>
            <p>Streaming integrado com narração e replay. Profissionalize seus eventos.</p>
          </div>
          <div class="solution-feature">
            <div class="solution-feature-icon">${icons.barChart}</div>
            <h3>Relatórios Profissionais</h3>
            <p>Prestação de contas para patrocinadores e editais gerada automaticamente.</p>
          </div>
        </div>

        <!-- COMPARISON TABLE -->
        <div class="solution-comparison reveal">
          <h2>Antes <span style="color:#666">vs</span> <span class="gradient-text">Com o JLiga</span></h2>
          <div class="comparison-table-wrapper">
            <table class="comparison-table">
              <thead>
                <tr>
                  <th>Atividade</th>
                  <th class="col-before">Antes</th>
                  <th class="col-after">Com JLiga</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Cadastro de atletas</td>
                  <td class="col-before">${icons.x} Planilha Excel</td>
                  <td class="col-after">${icons.checkCircle} Automático online</td>
                </tr>
                <tr>
                  <td>Controle financeiro</td>
                  <td class="col-before">${icons.x} Caderno / WhatsApp</td>
                  <td class="col-after">${icons.checkCircle} Dashboard completo</td>
                </tr>
                <tr>
                  <td>Ranking</td>
                  <td class="col-before">${icons.x} Atualização manual</td>
                  <td class="col-after">${icons.checkCircle} Atualização automática</td>
                </tr>
                <tr>
                  <td>Inscrição em eventos</td>
                  <td class="col-before">${icons.x} Formulário Google</td>
                  <td class="col-after">${icons.checkCircle} Portal do atleta</td>
                </tr>
                <tr>
                  <td>Prestação de contas</td>
                  <td class="col-before">${icons.x} Dias de trabalho</td>
                  <td class="col-after">${icons.checkCircle} 1 clique</td>
                </tr>
                <tr>
                  <td>Proposta de patrocínio</td>
                  <td class="col-before">${icons.x} Word genérico</td>
                  <td class="col-after">${icons.checkCircle} Template profissional</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- SOCIAL PROOF NUMBERS -->
        <div class="solution-numbers reveal">
          <div class="solution-number">
            <div class="solution-number-value">850+</div>
            <div class="solution-number-label">Ligas ativas</div>
          </div>
          <div class="solution-number">
            <div class="solution-number-value">27</div>
            <div class="solution-number-label">Estados</div>
          </div>
          <div class="solution-number">
            <div class="solution-number-value">R$15M+</div>
            <div class="solution-number-label">Captados pelas ligas</div>
          </div>
          <div class="solution-number">
            <div class="solution-number-value">98%</div>
            <div class="solution-number-label">Satisfação</div>
          </div>
        </div>

        <!-- CTA -->
        <div class="solution-cta reveal">
          <div class="solution-cta-card">
            <h2>${firstName}, quer ver tudo isso <span class="gradient-text">funcionando na prática</span>?</h2>
            <p>Agende uma apresentação executiva gratuita de 15 minutos. Sem compromisso, sem pressão.</p>
            <button class="btn-primary btn-xl" id="btnAgendar">
              Quero uma demonstração ao vivo ${icons.arrow}
            </button>
            <div class="solution-cta-trust">
              <span>✅ 100% gratuito</span>
              <span>✅ Sem compromisso</span>
              <span>✅ Personalizado para sua liga</span>
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

  document.getElementById('btnAgendar').addEventListener('click', () => {
    navigate('/agendar');
  });
}
